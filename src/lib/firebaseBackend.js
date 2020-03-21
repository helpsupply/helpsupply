import BackendInterface from "./backendInterface";
import Firebase from "firebase";
import config from "../components/Firebase/config";

class FirebaseBackend {
  constructor() {
    Firebase.initializeApp(config);
    this.firebase = Firebase.firestore();
  }

  listDropSites(zipcode, radius) {
    return this.firebase
      .collection("dropSite")
      .get()
      .then(snapshot => {
        let data = snapshot.docs.map(d => {
          var dict = d.data();
          dict["id"] = d.id;
          return dict;
        });
        return data;
      })
      .catch(console.log);
    // To do
    // create zipcode and radius filters
  }

  getDropSites(dropSiteId) {
    return this.firebase
      .collection("dropSite")
      .doc(dropSiteId)
      .get()
      .then(doc => {
        return doc.data();
      })
      .catch(console.log);
  }

  addDropSite(dropSiteName, location_id, dropAddress, arbitraryComments) {
    return this.firebase
      .collection("dropSite")
      .add({
        dropSiteName: dropSiteName,
        location_id: location_id,
        dropAddress: dropAddress,
        arbitraryComments: arbitraryComments
      })
      .then(function(docRef) {
        return docRef.id;
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
    // To do
    // add validation for the required variables
  }

  // REQUESTS

  getRequests(dropSiteId, requestType, openEnded, status) {
    // To do
  }

  addRequest(
    dropSiteId,
    requestType,
    requestDescription,
    requestQuantity,
    status
  ) {
    // To do
  }

  editRequest(
    requestId,
    requestType,
    requestDescription,
    requestQuantity,
    status
  ) {
    // To do
  }

  // VALIDATED DOMAINS

  addValidatedDomain(domain) {
    // To do
  }

  removeValidatedDomain(domain) {
    // To do
  }

  // HEALTH CARE PROFESSIONALS AND ADMINS

  addHealthcareProfessional(userId) {
    // To do
  }

  editHealthcareProfessional(hcpId, valid) {
    // To do
  }

  addDropSiteAdmin(userId, dropSiteId) {
    // To do
  }

  removeDropSiteAdmin(userId, dropSiteId) {
    // To do
  }
}

export default FirebaseBackend;
