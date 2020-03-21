const firebase = require("@firebase/testing");
const projectId = 'test-project';

beforeEach(async () => {
  await firebase.clearFirestoreData({ projectId });
});

after(async () => {
  await Promise.all(firebase.apps().map(app => app.delete()));
});

describe("hospital.community", () => {
	it("Run an empty test", () => {});

	it("Test initialize firebase with restrictive rules", async () => {
		const rules = `
		service cloud.firestore {
			match /databases/{database}/documents {
				match /{document=**} {
					allow read, write: if false;
				}
			}
		}
		`
		await firebase.loadFirestoreRules({projectId, rules});
		const db = firebase.initializeTestApp({projectId, auth: null}).firestore();
		await firebase.assertFails(db.collection("foo").doc("bar").set({ baz: 'bat' }));
	});

	it("Test initialize firebase with lax rules", async () => {
		const rules = `
		service cloud.firestore {
			match /databases/{database}/documents {
				match /{document=**} {
					allow read, write: if true;
				}
			}
		}
		`
		await firebase.loadFirestoreRules({projectId, rules});
		const db = firebase.initializeTestApp({projectId, auth: null}).firestore();
		await firebase.assertSucceeds(db.collection("foo").doc("bar").set({ baz: 'bat' }));
	});

	it("Test adding a request and requiring that it can't be validated", async () => {
		const rules = `
		service cloud.firestore {
			match /databases/{database}/documents {
				match /hcp/{userid} {
					allow read, write: if true;
				}
				match /request/{req} {
					function isVerified() {
						return request.auth != null && get(/databases/$(database)/documents/hcp/$(request.auth.uid)).data.valid == 'true';
					}
					allow read: if true;
					allow write: if (request.resource.data.valid == 'false' || isVerified());
				}
			}
		}
		`
		await firebase.loadFirestoreRules({projectId, rules});
		const db = firebase.initializeTestApp({projectId, auth: null}).firestore();

		// First verify we can add a new request, also long as we specify that valid is false
		let request = db.collection("request").doc("1");
		await firebase.assertSucceeds(request.set({ request_description: 'Masks', request_quantity: 0, valid: 'false' }))

		// Next verify we can't make it valid ourselves
		await firebase.assertFails(request.set({ valid: 'true' }))

		// Create an authorized healthcareprovider and make them valid 
		// (note there's no permissions on HCP, that will be tested elsewhere)
		request = db.collection("hcp").doc("1");
		await firebase.assertSucceeds(request.set({ valid: 'true' }))

		// Log in as that user
		const test_auth = {'uid': '1' }
		const db2 = firebase.initializeTestApp({projectId, auth: test_auth}).firestore();

		// Assert that we can successfully set the request as valid
		request = db2.collection("request").doc("1");
		await firebase.assertSucceeds(request.set({ valid: 'true' }))
	});

	it("Test that a user can index their (potentially verified) domain", async () => {
		const rules = `
		service cloud.firestore {
			match /databases/{database}/documents {
				match /domain/{url} {
					allow read: if true;
					allow write: if true; // We'll constrain this to site admins in real life
				}
				match /dropsite/{site} {
					function isVerified() {
						return request.auth != null && get(/databases/$(database)/documents/domain/$(request.auth.token.email.split('@')[1])).data.valid == 'true';
					}
					allow write: if isVerified();
					allow read: if true;
				}
			}
		}
		`
		await firebase.loadFirestoreRules({projectId, rules});

		const auth = {'uid': '1', 'email': 'bob@kp.org'}
		const db = firebase.initializeTestApp({projectId, auth}).firestore();

		// Next verify that unless the domain is approved they can't do anything
		await firebase.assertFails(db.collection('dropsite').doc('1').set({ address: '1 Market St' }))
		
		// Validate the domain
		let request = db.collection("domain").doc("kp.org");
		await firebase.assertSucceeds(request.set({ 'status': 'valid' }))

		// Next verify they can edit
		await firebase.assertFails(db.collection('dropsite').doc('1').set({ address: '1 Market St' }))
	});
});
