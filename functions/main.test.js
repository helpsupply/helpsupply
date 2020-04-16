//const firebaseTest = require('firebase-functions-test')();
const main = require('./main');

var admin = require('firebase-admin');
import FirebaseBackend from 'firebase-backend';

const projectId = process.env.GCLOUD_PROJECT;

const firebase = require('@firebase/testing');
const fs = require('fs');
const rules = fs.readFileSync('../firestore.rules', 'utf8');

function setupTestApp(auth) {
  let testApp = firebase.initializeTestApp({ projectId, auth });
  // The built-in test app doesn't implement much in the way of auth
  // beyond checking security rules so we mock out the parts we need
  testApp.auth = function () {
    return {
      onAuthStateChanged: function (callback) {
        callback(auth);
      },
      currentUser: {
        email: auth ? auth.email : null,
        uid: auth ? auth.uid : null,
      },
    };
  };
  return testApp;
}

describe('Service Request Routing', () => {
  test('Dummy Organization', async () => {
    // Clear out the database
    await firebase.clearFirestoreData({ projectId });
    await firebase.loadFirestoreRules({ projectId, rules });

    // Set up a dummy webhook
    await admin
      .firestore()
      .collection('webhook')
      .doc('testOrg')
      .set({ url: 'http://test' });

    // Login with a dummy user
    let auth = {
      uid: 'user1',
      email: 'bob@stanford.edu',
      email_verified: true,
    };
    let testApp = setupTestApp(auth);

    // Create a basic request
    let backend = new FirebaseBackend(testApp);
    let id = await backend.saveServiceRequest({
      kind: 'grocery',
      organization: 'testOrg',
      list: 'bananas, fruit',
    });

    // Verify it was written
    expect((await backend.getAllServiceRequests())[0].id).toBe(id);

    // Now wait until the request is updated as acked
    await new Promise((resolve) => {
      let unsubscribe = backend.firestore
        .collection('servicerequest')
        .doc(id)
        .onSnapshot(function (doc) {
          if (doc.data() && doc.data().status == 'distributed') {
            unsubscribe();
            resolve();
          }
        });
    });

    // Verify our simple payload was delivered
    let payloads = (
      await backend.firestore.collection('testwebhookpayload').get()
    ).docs;
    expect(payloads[0].data()).toStrictEqual({ list: 'bananas, fruit' });

    // If we don't cleanup, Jest will yell
    Promise.all(firebase.apps().map((a) => a.delete()));
  });

  test('Dummy Organization with Broken Webhook', async () => {
    // Clear out the database
    await firebase.clearFirestoreData({ projectId });
    await firebase.loadFirestoreRules({ projectId, rules });

    // Set up a dummy webhook
    await admin
      .firestore()
      .collection('webhook')
      .doc('testOrg')
      .set({ url: 'http://nogood' });

    // Login with a dummy user
    let auth = {
      uid: 'user1',
      email: 'bob@stanford.edu',
      email_verified: true,
    };
    let testApp = setupTestApp(auth);

    // Create a basic request
    let backend = new FirebaseBackend(testApp);
    let id = await backend.saveServiceRequest({
      kind: 'grocery',
      organization: 'testOrg',
      list: 'bananas, fruit',
    });

    // Verify it was written
    expect((await backend.getAllServiceRequests())[0].id).toBe(id);

    // Now wait until the request is reported as having failed to submit
    await new Promise((resolve) => {
      let unsubscribe = backend.firestore
        .collection('servicerequest')
        .doc(id)
        .onSnapshot(function (doc) {
          if (doc.data() && doc.data().status == 'error') {
            unsubscribe();
            resolve();
          }
        });
    });

    // If we don't cleanup, Jest will yell
    Promise.all(firebase.apps().map((a) => a.delete()));
  });
});
