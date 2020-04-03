class BackendInterface {
  // DROP SITES

  listDropSites(zipcode, radius) {
    // Abstract
    throw new Error('Abstract Interface');
  }

  getDropSites(dropSiteId) {
    // Abstract
    throw new Error('Abstract Interface');
  }

  addDropSite(
    location_id,
    dropSiteName,
    dropSiteDescription,
    dropSiteAddress,
    dropSiteZip,
  ) {
    // Abstract
    throw new Error('Abstract Interface');
  }

  editDropSite(
    dropSiteName,
    dropSiteDescription,
    dropSiteAddress,
    dropSiteZip,
  ) {
    // Abstract
    throw new Error('Abstract Interface');
  }

  // REQUESTS

  getRequests(dropSiteId, requestType, status) {
    // Abstract
    throw new Error('Abstract Interface');
  }

  addRequest({
    dropSiteId,
    requestType,
    requestTitle,
    requestDescription,
    requestQuantity,
    status,
    requestWillingToPay,
  }) {
    // Abstract
    throw new Error('Abstract Interface');
  }

  editRequest({
    requestId,
    requestType,
    requestTitle,
    requestDescription,
    requestQuantity,
    status,
    requestWillingToPay,
  }) {
    // Abstract
    throw new Error('Abstract Interface');
  }

  isLoggedIn() {
    throw new Error('Abstract Interface');
  }

  async isValidHealthcareWorker() {
    throw new Error('Abstract Interface');
  }

  // VALIDATED DOMAINS

  getPendingDomains() {
    throw new Error('Abstract Interface');
  }

  setDomainIsValid(domain, isValid) {
    // Abstract
    throw new Error('Abstract Interface');
  }

  // HEALTH CARE PROFESSIONALS AND ADMINS

  signupWithEmail(email) {
    throw new Error('Abstract Interface');
  }

  addHealthcareProfessional(userId) {
    // Abstract
    throw new Error('Abstract Interface');
  }

  editHealthcareProfessional(hcpId, valid) {
    // Abstract
    throw new Error('Abstract Interface');
  }

  addDropSiteAdmin(userId, dropSiteId) {
    // Abstract
    throw new Error('Abstract Interface');
  }

  removeDropSiteAdmin(userId, dropSiteId) {
    // Abstract
    throw new Error('Abstract Interface');
  }
}

export default BackendInterface;
