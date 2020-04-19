const functions = require('firebase-functions');
const express = require('express');

// This is our local code
import FirebaseBackend from 'firebase-backend';
import { ConversationList } from 'twilio/lib/rest/conversations/v1/conversation';

var admin = require('firebase-admin');
var app = admin.initializeApp();
let backend = new FirebaseBackend(app);

const postWebhook = async (url, data) => {
  if (url === 'http://test') {
    await backend.firestore.collection('testwebhookpayload').add(data);
  } else {
    console.log('posting', url, data);
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.status !== 200) {
      throw new Error('Unexpected response: ' + response.status);
    }
  }
};
const getWebhookForOrg = async (org) => {
  return (await backend.firestore.collection('webhook').doc(org).get()).data()
    .url;
};

// We should probably subclass Firebase Backend and add this, but this'll work for now
backend.postWebhook = postWebhook;
backend.getWebhookForOrg = getWebhookForOrg;

const processServiceRequestRaw = async (id, before, after) => {
  console.log(id, before, after);
  if (after && after.status === 'open') {
    console.log('trying to send', id);
    let metadata = backend.getMetadataForProvider(after.organization);
    if (!metadata) {
      await backend.updateServiceRequest(
        id,
        {
          status: 'error',
          status_updated: Math.floor(new Date().getTime() / 1000),
          error: 'unknown provider: ' + after.organization,
        },
        true,
      );
      console.error('Unknown provider: ' + after.organization);
      return;
    }
    try {
      console.log('collecting data', id);

      // Fetch the user specific data
      // admin.auth() explodes with emulators :/
      let userRecord = process.env.DEV
        ? { email: 'bob@bob.com' }
        : await admin.auth().getUser(after.user);
      let userInfo = (
        await backend.firestore.collection('serviceuser').doc(after.user).get()
      ).data();
      userInfo.email = userRecord.email;

      // Drop in the actual ID
      after.id = id;

      console.log('calling org', id);
      await metadata.DeliverRequest(backend, after, userInfo);
      console.log('called org', id);
      await backend.updateServiceRequest(
        id,
        {
          status: 'distributed',
          status_updated: Math.floor(new Date().getTime() / 1000),
        },
        true,
      );
    } catch (e) {
      console.log('hmmm error', e);
      await backend.updateServiceRequest(
        id,
        {
          status: 'error',
          status_updated: Math.floor(new Date().getTime() / 1000),
          error: '' + e,
        },
        true,
      );
      console.error(e);
    }
  }
};

exports.processServiceRequest = functions.firestore
  .document('servicerequest/{requestId}')
  .onWrite(async (snapshot) => {
    processServiceRequestRaw(
      snapshot.before.id,
      snapshot.before.data(),
      snapshot.after.data(),
    );
  });

exports.testHook = functions.https.onRequest(async (request, response) => {
  if (request.get('content-type') !== 'application/json') {
    response.status(400).send("{'error': 'content_type_header_not_json'}");
    return;
  }

  // Get the hook name from the URL
  let hookName = request.path.slice(1);

  if (hookName === undefined || hookName === '') {
    response.status(404).send('not found');
  }

  // Janky equality
  if (JSON.stringify(request.body) === '{}') {
    response.status(400).send('no body');
  }

  request.body.receiveTimestamp = Date.now();

  response.send(
    JSON.stringify({
      created: (
        await backend.firestore
          .collection('testhook')
          .doc(hookName)
          .collection('payloads')
          .add(request.body)
      ).id,
    }),
  );
});
