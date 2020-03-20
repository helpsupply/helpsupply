const firebase = require("@firebase/testing");

const projectId = 'test-project';

describe("hospital.community", () => {
	it("Run an empty test", async () => {});

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
		firebase.loadFirestoreRules({projectId, rules});
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
		firebase.loadFirestoreRules({projectId, rules});
		const db = firebase.initializeTestApp({projectId, auth: null}).firestore();
		await firebase.assertSucceeds(db.collection("foo").doc("bar").set({ baz: 'bat' }));
	});
});
