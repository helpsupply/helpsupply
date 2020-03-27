var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hospitalcommunity.firebaseio.com"
});
// DB Consts:
const db = admin.firestore();
const dropSiteRef = db.collection("dropSite");

function getDropSite(location_id) {
  return dropSiteRef
    .doc(location_id)
    .get()
    .then(doc => {
      return doc.data();
    })
    .catch(console.log);
}

module.exports = {
  getDropSite: getDropSite
};

/*

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
    dropSiteFacilityName,
    dropSiteAddress,
    dropSiteZip,
    dropSiteDescription,
    dropSiteRequirements,
    dropSiteName,
    dropSitePhone,
    dropSiteNotes
  ) {
    if (
      location_id &&
      dropSiteFacilityName &&
      dropSiteAddress &&
      dropSiteZip &&
      dropSiteDescription
    ) {
      let newSiteObj = {
        location_id: location_id,
        dropSiteFacilityName: dropSiteFacilityName,
        dropSiteAddress: dropSiteAddress,
        dropSiteZip: dropSiteZip,
        dropSiteDescription: dropSiteDescription,
        dropSiteRequirements: dropSiteRequirements,
        dropSiteName: dropSiteName,
        dropSitePhone: dropSitePhone,
        dropSiteNotes: dropSiteNotes,
        domain: this.firebase.auth().currentUser.email.split("@")[1],
        user: this.firebase.auth().currentUser.uid
      };
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

  addNewDropSite(
    dropSiteFacilityName,
    dropSiteAddress,
    dropSiteZip,
    dropSiteDescription,
    dropSiteRequirements,
    dropSiteName,
    dropSitePhone,
    dropSiteNotes
  ) {
    if (
      dropSiteAddress &&
      dropSiteZip &&
      dropSiteDescription &&
      dropSiteFacilityName
    ) {
      let newSiteObj = {
        dropSiteFacilityName: dropSiteFacilityName,
        dropSiteAddress: dropSiteAddress,
        dropSiteZip: dropSiteZip,
        dropSiteDescription: dropSiteDescription,
        dropSiteRequirements: dropSiteRequirements,
        dropSiteName: dropSiteName,
        dropSitePhone: dropSitePhone,
        dropSiteNotes: dropSiteNotes,
        domain: this.firebase.auth().currentUser.email.split("@")[1],
        user: this.firebase.auth().currentUser.uid
      };
      let db = this.firestore;
      return db
        .collection("dropSite")
        .add(newSiteObj)
        .then(function(docRef) {
          return db
            .collection("dropSite")
            .doc(docRef.id)
            .set({ location_id: docRef.id }, { merge: true })
            .then(() => {
              return docRef.id;
            });
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
    dropSiteAddress,
    dropSiteZip,
    dropSiteDescription,
    dropSiteRequirements,
    dropSiteName,
    dropSitePhone,
    dropSiteNotes
  ) {
    if (
      location_id &&
      (dropSiteAddress ||
        dropSiteZip ||
        dropSiteDescription ||
        dropSiteRequirements ||
        dropSiteName ||
        dropSitePhone ||
        dropSiteNotes)
    ) {
      let newSiteObj = {
        domain: this.firebase.auth().currentUser.email.split("@")[1],
        user: this.firebase.auth().currentUser.uid
      };
      if (dropSiteAddress) {
        newSiteObj.dropSiteAddress = dropSiteAddress;
      }
      if (dropSiteZip) {
        newSiteObj.dropSiteZip = dropSiteZip;
      }
      if (dropSiteDescription) {
        newSiteObj.dropSiteDescription = dropSiteDescription;
      }
      if (dropSiteRequirements) {
        newSiteObj.dropSiteRequirements = dropSiteRequirements;
      }
      if (dropSiteName) {
        newSiteObj.dropSiteName = dropSiteName;
      }
      if (dropSitePhone) {
        newSiteObj.dropSitePhone = dropSitePhone;
      }
      if (dropSiteNotes) {
        newSiteObj.dropSiteNotes = dropSiteNotes;
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
    status,
    requestWillingToPay
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
          status: status,
          domain: this.firebase.auth().currentUser.email.split("@")[1],
          user: this.firebase.auth().currentUser.uid,
          requestWillingToPay: requestWillingToPay
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
      dropSiteId &&
      requestId &&
      requestTitle &&
      supplyQuantity &&
      supplyDeliveryTime &&
      supplyComments
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
  */
