import FirebaseBackend from './lib/firebaseBackend';

const fs = require('fs');

const firebase = require('@firebase/testing');
const projectId = 'test-project';
const rules = fs.readFileSync('firestore.rules', 'utf8');

/*
test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
*/

// Note:
// You need to have `firebase emulators:start --only firestore` running for these to pass

test('hello world', async () => {
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

test('Test Domain Verification', async () => {
  await firebase.clearFirestoreData({ projectId });

  await firebase.loadFirestoreRules({ projectId, rules });

  let adminApp = firebase.initializeAdminApp({ projectId });
  let adminfs = adminApp.firestore();
  await adminfs.collection('domain').doc('kp.org').set({ valid: 'pending' });
  await adminfs.collection('domain').doc('gmail.com').set({ valid: 'false' });

  let auth = { uid: '1', email_verified: true };
  let testApp = firebase.initializeTestApp({ projectId, auth });
  testApp.auth = function () {
    return {
      onAuthStateChanged: function (callback) {
        callback(auth);
      },
    };
  };

  let backend = new FirebaseBackend(testApp);
  expect((await backend.getDomains()).sort()).toStrictEqual(
    ['kp.org', 'gmail.com'].sort(),
  );
  expect((await backend.getDomains(true)).sort()).toStrictEqual(
    ['kp.org'].sort(),
  );

  // We shouldn't be able to do this yet
  await expect(backend.setDomainIsValid('kp.org', true)).rejects.toBe(
    'Validating domains is not allowed',
  );

  // This should be the same as before
  expect((await backend.getDomains(true)).sort()).toStrictEqual(
    ['kp.org'].sort(),
  );

  // Now make our user an admin
  await adminfs.collection('admin').doc(auth.uid).set({ valid: 'true' });

  // Now try again
  await backend.setDomainIsValid('kp.org', true);

  // This should now be empty
  expect((await backend.getDomains(true)).sort()).toStrictEqual([].sort());
});
