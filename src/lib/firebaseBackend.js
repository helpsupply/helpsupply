import BackendInterface from "./backendInterface";
import Firebase from "firebase";
import config from "../components/Firebase/config";

class FirebaseBackend {
  constructor() {
    Firebase.initializeApp(config);
    this.firebase = Firebase.firestore();
  }

  listDropSites(zipcode, radius) {
    this.firebase
      .collection("dropSite")
      .get()
      .then(snapshot => {
        let data = snapshot.docs.map(d => {
          var dict = d.data();
          dict["id"] = d.id;
          return dict;
        });
        console.log(data);
      })
      .catch(console.log);
    // To do
  }

  getDropSites(dropSiteId) {
    // To do
  }

  addDropSite(dropSiteName, location_id, dropAddress, arbitraryComments) {
    // To do
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
