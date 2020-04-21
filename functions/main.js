const functions = require('firebase-functions');
const express = require('express');
const sendEmail = require('./sendmail').sendEmail;
const fs = require('fs');

Promise.allSettled = require('promise.allsettled'); // Firebase runs an ancient Node with no Promise.allSettled

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
  if (after && after.status === 'open') {
    console.log('trying to send', id, new Date().getTime() / 1000);
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
      console.log('collecting data', id, new Date().getTime() / 1000);

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

      console.log('calling org', id, new Date().getTime() / 1000);
      await metadata.DeliverRequest(backend, after, userInfo);
      console.log('called org', id, new Date().getTime() / 1000);
      await backend.updateServiceRequest(
        id,
        {
          status: 'distributed',
          status_updated: Math.floor(new Date().getTime() / 1000),
        },
        true,
      );
    } catch (e) {
      console.log('hmmm error', e, new Date().getTime() / 1000);
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
  } else {
    console.log('not ready to send', id);
  }
};

exports.processServiceRequest = functions.firestore
  .document('servicerequest/{requestId}')
  .onWrite(async (snapshot) => {
    await processServiceRequestRaw(
      snapshot.before.id,
      snapshot.before.data(),
      snapshot.after.data(),
    );
  });

exports.sendSigninEmail = functions.https.onRequest(
  async (request, response) => {
    if (request.query.heater) {
      response.send('warm');
      return;
    }

    // TODO: lock this down
    response.set('Access-Control-Allow-Origin', '*');

    let userEmail = request.query.email;
    const actionCodeSettings = {
      // Equal to EMAIL_SIGNUP_COMPLETE
      url: request.query.url,
      handleCodeInApp: true,
    };
    console.log(actionCodeSettings);

    let link = await admin
      .auth()
      .generateSignInWithEmailLink(userEmail, actionCodeSettings);

    // Get the template
    function getData(fileName, type) {
      return new Promise(function (resolve, reject) {
        fs.readFile(fileName, type, (err, data) => {
          err ? reject(err) : resolve(data);
        });
      });
    }

    // Get the relevant email
    let user = null;
    try {
      user = await admin.auth().getUserByEmail(userEmail);
    } catch (e) {
      console.log('new user');
    }
    let returning = user && user.emailVerified;

    if (request.query.login && !returning) {
      console.log('not sending login link to', userEmail, user);
      response.send('ok');
      return;
    }

    let template = await getData(
      returning ? 'assets/emails/sign-in.html' : 'assets/emails/welcome.html',
      'utf8',
    );
    template = template.replace('{{link}}', link);

    await sendEmail(
      userEmail,
      'Welcome to Help Supply',
      'Please click here to verify your account',
      template,
    );
    response.send('ok');
  },
);

exports.sendRequestConfirmation = functions.https.onRequest(
  async (request, response) => {
    if (request.query.heater) {
      response.send('warm');
      return;
    }

    // TODO: lock this down
    response.set('Access-Control-Allow-Origin', '*');

    // Get a request ID
    let requestId = request.query.request;

    console.log(
      'starting confirmation',
      requestId,
      new Date().getTime() / 1000,
    );

    // Get the relevant user
    let uid = (
      await backend.firestore.collection('servicerequest').doc(requestId).get()
    ).data().user;

    // Get the relevant email
    let email = (process.env.DEV
      ? { email: 'bob@bob.com' }
      : await admin.auth().getUser(uid)
    ).email;

    // Get the template
    function getData(fileName, type) {
      return new Promise(function (resolve, reject) {
        fs.readFile(fileName, type, (err, data) => {
          err ? reject(err) : resolve(data);
        });
      });
    }
    let template = await getData('assets/emails/confirmation.html', 'utf8');

    function escapeHTML(unsafe) {
      return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    let formattedDetails = '';
    let rawDetails = JSON.parse(request.query.details);
    for (var key in rawDetails) {
      formattedDetails +=
        '<b>' +
        escapeHTML(key) +
        ':</b> ' +
        escapeHTML(rawDetails[key]) +
        '<br />';
    }

    let mapping = {
      '{{organization}}': escapeHTML(request.query.organization),
      '{{id}}': escapeHTML(request.query.request),
      '{{type}}': escapeHTML(request.query.type),
      '{{details}}': formattedDetails,
      '{{date}}': escapeHTML(request.query.date),
    };

    for (var key in mapping) {
      template = template.replace(key, mapping[key]);
    }

    console.log('sending email', requestId, new Date().getTime() / 1000);

    // Send away!
    await sendEmail(email, 'Request Confirmation', requestId, template);

    console.log('sent email', requestId, new Date().getTime() / 1000);
    response.send('ok');
  },
);

exports.testHook = functions.https.onRequest(async (request, response) => {
  if (request.query.heater) {
    response.send('warm');
    return;
  }

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

exports.hook = functions.https.onRequest(async (request, response) => {
  if (request.query.heater) {
    response.send('warm');
    return;
  }

  // Get the hook name from the URL
  let hookName = request.path.slice(1);

  if (hookName === undefined || hookName === '') {
    response.status(404).send('not found');
    return;
  }

  // Janky equality
  if (JSON.stringify(request.body) === '{}') {
    response.status(400).send('no body');
    return;
  }

  request.body.receiveTimestamp = Date.now();

  response.send(
    JSON.stringify({
      created: (
        await backend.firestore
          .collection('hook')
          .doc(hookName)
          .collection('payloads')
          .add(request.body)
      ).id,
    }),
  );
});

exports.heater = functions.pubsub
  .schedule('every 1 minutes')
  .onRun(async (context) => {
    const host = functions.config().heater.host;
    const paths = [
      'hook',
      'sendRequestConfirmation',
      'sendSigninEmail',
      'testHook',
    ];
    await Promise.allSettled(
      paths.map(async (path) => {
        await fetch(host + path + '?heater=true');
      }),
    );
  });
