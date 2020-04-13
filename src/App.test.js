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

test('Test Dropsite Creation While Unverified', async () => {
  await firebase.clearFirestoreData({ projectId });
  await firebase.loadFirestoreRules({ projectId, rules });

  let adminApp = firebase.initializeAdminApp({ projectId });
  let adminfs = adminApp.firestore();
  await adminfs
    .collection('domain')
    .doc('stanford.edu')
    .set({ valid: 'pending' });

  let auth = { uid: 'user1', email: 'bob@stanford.edu', email_verified: true };
  let testApp = setupTestApp(auth);

  let backend = new FirebaseBackend(testApp);

  // Have a non-verified user create a dropsite
  await backend.addDropSite({
    location_id: '1',
    dropSiteDescription: 'Stanford',
    dropSiteAddress: '1 El Camino Real',
    dropSiteRequirements: 'None',
    dropSitePhone: '5555555555',
    dropSiteNotes: 'Bring dogs',
    requestWillingToPay: true,
  });

  // Verify that it isn't returned from the backend
  expect((await backend.getDropSites('1')).valid).toStrictEqual(false);
  expect((await backend.listDropSites())[0].valid).toStrictEqual(false);

  // Verify the user
  await adminfs.collection('domain').doc('stanford.edu').set({ valid: 'true' });

  // Verify that it is returned from the backend now
  expect((await backend.getDropSites('1')).valid).toStrictEqual(true);
  expect((await backend.listDropSites())[0].valid).toStrictEqual(true);

  return;
});

test('Test Creation of new Dropsite (while not logged in)', async () => {
  await firebase.clearFirestoreData({ projectId });
  await firebase.loadFirestoreRules({ projectId, rules });

  let testApp = setupTestApp(null);
  let backend = new FirebaseBackend(testApp);

  let dropsite = await backend.addNewDropSite({
    dropSiteFacilityName: 'Stanford Hospital',
    dropSiteZip: '94701',
    dropSiteAddress: '1 El Camino Real',
    dropSiteCity: 'Stanford',
    dropSiteState: 'CA',
    dropSiteUrl: 'https://stanford.edu',
  });

  expect((await backend.getDropSites(dropsite)).valid).toStrictEqual(false);
});

test('Test Request Creation', async () => {
  await firebase.clearFirestoreData({ projectId });
  await firebase.loadFirestoreRules({ projectId, rules });

  let auth = { uid: 'user1', email: 'bob@stanford.edu', email_verified: true };
  let testApp = setupTestApp(auth);

  let backend = new FirebaseBackend(testApp);

  // Add a request with a logged in (unverified) user
  let request = await backend.addRequest({
    dropSiteId: '1',
    requestType: 'Masks',
    requestTitle: 'N95 Masks',
    requestDescription: 'blabla',
    requestQuantity: '1000',
    status: 'open',
    requestWillingToPay: true,
  });

  // The request shouldn't be valid
  expect((await backend.getRequests('1'))[0].valid).toStrictEqual(false);

  // Now grant stanford.edu the status of valid
  let adminApp = firebase.initializeAdminApp({ projectId });
  let adminfs = adminApp.firestore();
  await adminfs.collection('domain').doc('stanford.edu').set({ valid: 'true' });

  // Verify that the request is now valid
  expect((await backend.getRequests('1'))[0].valid).toStrictEqual(true);

  // Edit this request
  await backend.editRequest(request, 'Masks', 'N95 Masks', 'foobar');

  // Make sure it remains valid
  expect((await backend.getRequests('1'))[0].valid).toStrictEqual(true);
});

test('Test Domain Verification', async () => {
  await firebase.clearFirestoreData({ projectId });

  await firebase.loadFirestoreRules({ projectId, rules });

  let adminApp = firebase.initializeAdminApp({ projectId });
  let adminfs = adminApp.firestore();
  await adminfs.collection('domain').doc('kp.org').set({ valid: 'pending' });
  await adminfs.collection('domain').doc('gmail.com').set({ valid: 'false' });

  let auth = { uid: '1', email_verified: true };
  let testApp = setupTestApp(auth);

  let backend = new FirebaseBackend(testApp);

  let domains = new Promise((resolve, reject) => {
    backend.getDomains(false, resolve);
  });
  expect((await domains).sort()).toStrictEqual(['kp.org', 'gmail.com'].sort());

  domains = new Promise((resolve, reject) => {
    backend.getDomains(true, resolve);
  });
  expect((await domains).sort()).toStrictEqual(['kp.org'].sort());

  // We shouldn't be able to do this yet
  await expect(backend.setDomainIsValid('kp.org', true)).rejects.toBe(
    'Validating domains is not allowed',
  );

  // This should be the same as before
  domains = new Promise((resolve, reject) => {
    backend.getDomains(true, resolve);
  });
  expect((await domains).sort()).toStrictEqual(['kp.org'].sort());

  // Now make our user an admin
  await adminfs.collection('admin').doc(auth.uid).set({ valid: 'true' });

  // Now try again
  await backend.setDomainIsValid('kp.org', true);

  // This should now be empty
  // service/supply TODO: Figure out how to test that this doesn't resolve in N amount of time
  //domains = new Promise((resolve, reject) => { backend.getDomains(true, resolve) })
  //expect((await domains).sort()).toStrictEqual([].sort())
  return;
});
