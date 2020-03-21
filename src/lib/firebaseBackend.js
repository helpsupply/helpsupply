import BackendInterface from "./backendInterface";
import Firebase from "firebase";
import config from "../components/Firebase/config";

class FirebaseBackend extends BackendInterface {
  constructor() {
    super();
    this.firebase = Firebase.initializeApp(config);
    this.firestore = Firebase.firestore();
  }

  listDropSites(zipcode, radius) {
    return this.firestore
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
    if (dropSiteId) {
      return this.firestore
        .collection("dropSite")
        .doc(dropSiteId)
        .get()
        .then(doc => {
          return doc.data();
        })
        .catch(console.log);
    } else {
      console.log("Error, one or more required params missing.");
      return Promise.resolve("Error, one or more required params missing.");
    }
  }

  addDropSite(
    location_id,
    dropSiteName,
    dropSiteDescription,
    dropSiteAddress,
    dropSiteZip
  ) {
    if (dropSiteName && location_id && dropSiteAddress && dropSiteZip) {
      let newSiteObj = {
        dropSiteName: dropSiteName,
        location_id: location_id,
        dropSiteAddress: dropSiteAddress,
        dropSiteZip: dropSiteZip
      };
      if (dropSiteDescription) {
        newSiteObj.dropSiteDescription = dropSiteDescription;
      }
      return this.firestore
        .collection("dropSite")
        .doc(location_id)
        .set(newSiteObj)
        .then(function(docRef) {
          return "Drop site added";
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    } else {
      console.log("Error, one or more required params missing.");
      return Promise.resolve("Error, one or more required params missing.");
    }
  }

  editDropSite(
    location_id,
    dropSiteName,
    dropSiteDescription,
    dropSiteAddress,
    dropSiteZip
  ) {
    if (
      location_id &&
      (dropSiteName || dropSiteDescription || dropSiteAddress || dropSiteZip)
    ) {
      let newSiteObj = {};
      if (dropSiteName) {
        newSiteObj.dropSiteName = dropSiteName;
      }
      if (dropSiteDescription) {
        newSiteObj.dropSiteDescription = dropSiteDescription;
      }
      if (dropSiteAddress) {
        newSiteObj.dropSiteAddress = dropSiteAddress;
      }
      if (dropSiteZip) {
        newSiteObj.dropSiteZip = dropSiteZip;
      }
      return this.firestore
        .collection("dropSite")
        .doc(location_id)
        .set(newSiteObj, { merge: true })
        .then(function() {
          return "Drop site updated";
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    } else {
      console.log("Error, one or more required params missing.");
      return Promise.resolve("Error, one or more required params missing.");
    }
  }

  deleteDropSite(dropSiteId) {
    if (dropSiteId) {
      return this.firestore
        .collection("dropSite")
        .doc(dropSiteId)
        .delete()
        .then(() => {
          return dropSiteId + " deleted";
        })
        .catch(console.log);
    } else {
      console.log("Error, one or more required params missing.");
      return Promise.resolve("Error, one or more required params missing.");
    }
  }

  // REQUESTS

  getRequests(dropSiteId, requestType, status) {
    if (dropSiteId) {
      var queryBuilder = this.firestore
        .collection("request")
        .where("dropSiteId", "==", dropSiteId);
      if (requestType) {
        queryBuilder = queryBuilder.where("requestType", "==", requestType);
      }
      if (status) {
        queryBuilder = queryBuilder.where("status", "==", status);
      }
      return queryBuilder
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
    } else {
      console.log("Error, one or more required params missing.");
      return Promise.resolve("Error, one or more required params missing.");
    }
  }

  addRequest(
    dropSiteId,
    requestType,
    requestTitle,
    requestDescription,
    requestQuantity,
    status
  ) {
    if (
      dropSiteId &&
      requestType &&
      requestTitle &&
      requestDescription &&
      requestQuantity &&
      status
    ) {
      return this.firestore
        .collection("request")
        .add({
          dropSiteId: dropSiteId,
          requestType: requestType,
          requestTitle: requestTitle,
          requestDescription: requestDescription,
          requestQuantity: requestQuantity,
          status: status
        })
        .then(function(docRef) {
          return docRef.id;
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    } else {
      console.log("Error, one or more required params missing.");
      return Promise.resolve("Error, one or more required params missing.");
    }
  }

  editRequest(
    requestId,
    requestType,
    requestTitle,
    requestDescription,
    requestQuantity,
    status
  ) {
    if (requestId) {
      let updateObj = {};
      if (requestType) {
        updateObj.requestType = requestType;
      }
      if (requestTitle) {
        updateObj.requestTitle = requestTitle;
      }
      if (requestDescription) {
        updateObj.requestDescription = requestDescription;
      }
      if (requestQuantity) {
        updateObj.requestQuantity = requestQuantity;
      }
      if (status) {
        updateObj.status = status;
      }
      return this.firestore
        .collection("request")
        .doc(requestId)
        .set(updateObj, { merge: true })
        .then(function(docRef) {
          return "Request update success.";
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    } else {
      console.log("Error, requestId is required.");
      return Promise.resolve("Error, requestId is required.");
    }

    // To do
    // add validation for the required variables
    // make it so that only the variables requested will be updated
  }

  deleteRequest(requestId) {
    if (requestId) {
      return this.firestore
        .collection("request")
        .doc(requestId)
        .delete()
        .then(() => {
          return requestId + " deleted";
        })
        .catch(console.log);
    } else {
      console.log("Error, one or more required params missing.");
      return Promise.resolve("Error, one or more required params missing.");
    }
  }

  // SUPPPLY

  listSupply(dropSiteId) {
    return this.firestore
      .collection("supply")
      .where("dropSiteId", "==", dropSiteId)
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

  addSupply(
    dropSiteId,
    requestId,
    requestTitle,
    supplyPhone,
    supplyQuantity,
    supplyDeliveryTime,
    supplyComments
  ) {
    if (
      (dropSiteId && requestId && requestTitle,
      supplyPhone && supplyQuantity && supplyDeliveryTime && supplyComments)
    ) {
      return this.firestore
        .collection("supply")
        .add({
          dropSiteId: dropSiteId,
          requestId: requestId,
          requestTitle: requestTitle,
          supplyPhone: supplyPhone,
          supplyQuantity: supplyQuantity,
          supplyDeliveryTime: supplyDeliveryTime,
          supplyComments: supplyComments
        })
        .then(function(docRef) {
          return docRef.id;
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    } else {
      console.log("Error, one or more required params missing.");
      return Promise.resolve("Error, one or more required params missing.");
    }
  }

  deleteSupply(supplyId) {
    if (supplyId) {
      return this.firestore
        .collection("supply")
        .doc(supplyId)
        .delete()
        .then(() => {
          return supplyId + " deleted";
        })
        .catch(console.log);
    } else {
      console.log("Error, one or more required params missing.");
      return Promise.resolve("Error, one or more required params missing.");
    }
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
