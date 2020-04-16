const functions = require('firebase-functions');
const express = require('express');

// This is our local code
import FirebaseBackend from 'firebase-backend';

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
  if (after && (after.status === undefined || after.status === 'open')) {
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
      await metadata.DeliverRequest(backend, after);
      await backend.updateServiceRequest(
        id,
        {
          status: 'distributed',
          status_updated: Math.floor(new Date().getTime() / 1000),
        },
        true,
      );
    } catch (e) {
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
