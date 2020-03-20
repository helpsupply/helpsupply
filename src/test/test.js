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
				match /{document=**} {
					allow write: if request.resource.data.valid == 'false';
					allow read: if true;
				}
			}
		}
		`
		await firebase.loadFirestoreRules({projectId, rules});
		const db = firebase.initializeTestApp({projectId, auth: null}).firestore();

		const request = db.collection("request").doc("1");
		await firebase.assertSucceeds(request.set({ request_description: 'Masks', request_quantity: 0, valid: 'false' }))
		const result = await request.get();
		await firebase.assertFails(request.set({ valid: 'true' }))
	});
	

});
