import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
const fs = require('fs')

import FirebaseBackend from "./lib";
import expectExport from 'expect';

const firebase = require("@firebase/testing");
const projectId = 'test-project';
const rules = fs.readFileSync("firestore.rules", "utf8");

/*
test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
*/

test('hello world', async () => {
  await firebase.clearFirestoreData({ projectId });

  let adminApp = firebase.initializeAdminApp({projectId});

  let auth = null;
  let testApp = firebase.initializeTestApp({projectId, auth});
  testApp.auth = function() {
    return {
      onAuthStateChanged: function(callback) {
        callback(auth)
      }
    }
  }

  let backend = new FirebaseBackend(testApp);
  
  expect(await backend.isLoggedIn()).toBe(false)

})

test('Test Domain Verification', async () => {
  await firebase.clearFirestoreData({ projectId });

	await firebase.loadFirestoreRules({ projectId, rules });

  let adminApp = firebase.initializeAdminApp({projectId});
  let adminfs = adminApp.firestore();
  await adminfs.collection('domain').doc('kp.org').set({'valid': 'pending'});
  await adminfs.collection('domain').doc('gmail.com').set({'valid': 'false'});

  let auth = null;
  let testApp = firebase.initializeTestApp({projectId, auth});
  testApp.auth = function() {
    return {
      onAuthStateChanged: function(callback) {
        callback(auth)
      }
    }
  }

  let backend = new FirebaseBackend(testApp);
  expect((await backend.getDomains()).sort()).toStrictEqual(['kp.org','gmail.com'].sort())
  expect((await backend.getDomains(true)).sort()).toStrictEqual(['kp.org'].sort())

  backend.setDomainIsValid('kp.org', true)
  expect((await backend.getDomains(true)).sort()).toStrictEqual([].sort())
})
