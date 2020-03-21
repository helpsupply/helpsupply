class BackendInterface {
  // DROP SITES

  listDropSites(zipcode, radius) {
    // Abstract
    throw "Abstract Interface";
  }

  getDropSites(dropSiteId) {
    // Abstract
    throw "Abstract Interface";
  }

  addDropSite(
    location_id,
    dropSiteName,
    dropSiteDescription,
    dropSiteAddress,
    dropSiteZip
  ) {
    // Abstract
    throw "Abstract Interface";
  }

  editDropSite(
    dropSiteName,
    dropSiteDescription,
    dropSiteAddress,
    dropSiteZip
  ) {
    // Abstract
    throw "Abstract Interface";
  }

  // REQUESTS

  getRequests(dropSiteId, requestType, status) {
    // Abstract
    throw "Abstract Interface";
  }

  addRequest(
    dropSiteId,
    requestType,
    requestTitle,
    requestDescription,
    requestQuantity,
    status
  ) {
    // Abstract
    throw "Abstract Interface";
  }

  editRequest(
    requestId,
    requestType,
    requestTitle,
    requestDescription,
    requestQuantity,
    status
  ) {
    // Abstract
    throw "Abstract Interface";
  }

  // VALIDATED DOMAINS

  addValidatedDomain(domain) {
    // Abstract
    throw "Abstract Interface";
  }

  removeValidatedDomain(domain) {
    // Abstract
    throw "Abstract Interface";
  }

  // HEALTH CARE PROFESSIONALS AND ADMINS

  addHealthcareProfessional(userId) {
    // Abstract
    throw "Abstract Interface";
  }

  editHealthcareProfessional(hcpId, valid) {
    // Abstract
    throw "Abstract Interface";
  }

  addDropSiteAdmin(userId, dropSiteId) {
    // Abstract
    throw "Abstract Interface";
  }

  removeDropSiteAdmin(userId, dropSiteId) {
    // Abstract
    throw "Abstract Interface";
  }
}

export default BackendInterface;
