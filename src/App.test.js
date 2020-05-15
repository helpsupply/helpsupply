import { groceryRequest } from 'data/serviceRequest';

import FirebaseBackend from './lib/firebaseBackend';
const fs = require('fs');
const firebase = require('@firebase/testing');

jest.setTimeout(10000);

const projectId = 'test-project';
const rules = fs.readFileSync('firestore.rules', 'utf8');

// Note:
// You need to have `firebase emulators:start --only firestore` running for these to pass

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

test('Firebase Initialization Smoke Test', async () => {
  await firebase.clearFirestoreData({ projectId });

  let auth = null;
  let testApp = firebase.initializeTestApp({ projectId, auth });
  testApp.auth = function () {
    return {
      onAuthStateChanged: function (callback) {
        callback(auth);
      },
    };
  };

  let backend = new FirebaseBackend(testApp);

  expect(await backend.isLoggedIn()).toBe(false);
});

test('Test Saving Service Request', async () => {
  await firebase.clearFirestoreData({ projectId });
  await firebase.loadFirestoreRules({ projectId, rules });

  let auth = {
    uid: '1',
    email: 'user@gmail.com',
  };
  let testApp = setupTestApp(auth);

  let backend = new FirebaseBackend(testApp);

  // Remove reserved properties from mock object
  const { domain, sent, status, user, ...newGroceryRequest } = groceryRequest;

  // Add a request with a logged in (unverified) user
  let request = await backend.saveServiceRequest(newGroceryRequest);

  // The request should be inprogress
  expect((await backend.getServiceRequest(request)).status).toStrictEqual(
    'inprogress',
  );

  // Edit this request
  const { additionalInfo, ...updateGroceryRequest } = newGroceryRequest;
  await backend.updateServiceRequest(
    request,
    { ...updateGroceryRequest, additionalInfo: '1234' },
    true,
  );

  // Make sure it updated
  expect(
    (await backend.getServiceRequest(request)).additionalInfo,
  ).toStrictEqual('1234');
});
