import BackendInterface from "./backend_interface";
import Firebase from "firebase";

class FirebaseBackend extends BackendInterface {
  constructor(firebase) {
    this.firebase = Firebase.firestore();
  }

  listDropSites(zipcode, radius) {
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
