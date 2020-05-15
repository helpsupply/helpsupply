const FirebaseBackend = require('./firebaseBackend').default;
const firebase = require('@firebase/testing');
const fs = require('fs');

const projectId = 'test-project';

jest.setTimeout(10000);

beforeEach(async () => {
  await firebase.clearFirestoreData({ projectId });
});

afterAll(async () => {
  await Promise.all(firebase.apps().map((app) => app.delete()));
});

const rules = fs.readFileSync('firestore.rules', 'utf8');

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

test('Test Service Requests', async () => {
  await firebase.loadFirestoreRules({ projectId, rules });

  let auth = { uid: 'user1', email: 'user@users.com' };
  let testApp = setupTestApp(auth);

  let backend = new FirebaseBackend(testApp);

  // Create a request
  let id = await backend.saveServiceRequest({
    kind: 'grocery',
    organization: 'maync',
  });

  // Update it
  await backend.updateServiceRequest(id, { foo: 'bar' });

  // Pull it back out
  expect((await backend.getServiceRequest(id)).id).toBe(id);
  expect((await backend.getAllServiceRequests())[0].foo).toBe('bar');

  // Delete the request
  await backend.deleteServiceRequest(id);

  // Verify nothing is left
  expect((await backend.getAllServiceRequests()).length).toBe(0);
});
