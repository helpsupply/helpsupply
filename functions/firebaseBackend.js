// Switch for prod
const prodEnv = false;

let serviceAccount;
let databaseURL;

if (prodEnv) {
  serviceAccount = null; //require("./service-account.json");
  databaseURL = 'https://hospitalcommunity.firebaseio.com';
} else {
  serviceAccount = null; //require("./service-account-staging.json");
  databaseURL = 'https://help-supply-staging.firebaseio.com';
}

var admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: databaseURL,
});

// DATABASE FUNCTIONS

const database = admin.firestore();

function listDropSites(zipcode, radius) {
  return database
    .collection('dropSite')
    .get()
    .then((snapshot) => {
      let data = snapshot.docs.map((d) => {
        var dict = d.data();
        dict['id'] = d.id;
        return dict;
      });
      return data;
    })
    .catch(console.log);
  // To do
  // create zipcode and radius filters
}

function getDropSites(dropSiteId) {
  if (dropSiteId) {
    return database
      .collection('dropSite')
      .doc(dropSiteId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return doc.data();
        } else {
          return '';
        }
      })
      .catch(console.log);
  } else {
    console.log('Error, one or more required params missing.');
    return Promise.reject('Error, one or more required params missing.');
  }
}

function addDropSite({
  location_id,
  dropSiteDescription,
  dropSiteAddress,
  dropSiteRequirements,
  dropSitePhone,
  dropSiteNotes,
  requestWillingToPay,
  domain,
  user,
}) {
  if (dropSiteDescription && location_id && dropSiteAddress) {
    let newSiteObj = {
      location_id,
      dropSiteDescription,
      dropSiteAddress,
      dropSiteRequirements,
      dropSitePhone,
      dropSiteNotes,
      requestWillingToPay,
      domain: domain,
      user: user,
    };
    return database
      .collection('dropSite')
      .doc(location_id)
      .set(newSiteObj)
      .then(function (docRef) {
        return 'Drop site added';
      })
      .catch(function (error) {
        console.error('Error writing document: ', error);
      });
  } else {
    console.log('Error, one or more required params missing.');
    return Promise.reject('Error, one or more required params missing.');
  }
}

function addNewDropSite({
  dropSiteFacilityName,
  dropSiteZip,
  dropSiteAddress,
  dropSiteCity,
  dropSiteState,
  dropSiteUrl,
  domain,
  user,
}) {
  if (dropSiteFacilityName && dropSiteAddress && dropSiteZip) {
    let newSiteObj = {
      dropSiteFacilityName,
      dropSiteZip,
      dropSiteAddress,
      dropSiteCity,
      dropSiteState,
      dropSiteUrl,
      domain: domain,
      user: user,
    };
    return database
      .collection('dropSite')
      .add(newSiteObj)
      .then(function (docRef) {
        return database
          .collection('dropSite')
          .doc(docRef.id)
          .set({ location_id: docRef.id }, { merge: true })
          .then(() => {
            return docRef.id;
          });
      })
      .catch(function (error) {
        console.error('Error writing document: ', error);
      });
  } else {
    console.log('Error, one or more required params missing.');
    return Promise.reject('Error, one or more required params missing.');
  }
}

function editDropSite(
  location_id,
  dropSiteName,
  dropSiteDescription,
  dropSiteAddress,
  dropSiteZip,
  dropSitePhone,
  domain,
  user,
) {
  if (
    location_id &&
    (dropSiteName ||
      dropSiteDescription ||
      dropSiteAddress ||
      dropSiteZip ||
      dropSitePhone)
  ) {
    let newSiteObj = {
      domain: domain,
      user: user,
      dropSiteName: '',
      dropSiteDescription: '',
      dropSiteAddress: '',
      dropSiteZip: '',
      dropSitePhone: '',
    };
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
    if (dropSitePhone) {
      newSiteObj.dropSitePhone = dropSitePhone;
    }
    return database
      .collection('dropSite')
      .doc(location_id)
      .set(newSiteObj, { merge: true })
      .then(function () {
        return 'Drop site updated';
      })
      .catch(function (error) {
        console.error('Error writing document: ', error);
      });
  } else {
    console.log('Error, one or more required params missing.');
    return Promise.reject('Error, one or more required params missing.');
  }
}

function deleteDropSite(dropSiteId) {
  if (dropSiteId) {
    return database
      .collection('dropSite')
      .doc(dropSiteId)
      .delete()
      .then(() => {
        return dropSiteId + ' deleted';
      })
      .catch(console.log);
  } else {
    console.log('Error, one or more required params missing.');
    return Promise.reject('Error, one or more required params missing.');
  }
}

// REQUESTS

function getRequests(dropSiteId, requestType, status) {
  if (dropSiteId) {
    var queryBuilder = database
      .collection('request')
      .where('dropSiteId', '==', dropSiteId);
    if (requestType) {
      queryBuilder = queryBuilder.where('requestType', '==', requestType);
    }
    if (status) {
      queryBuilder = queryBuilder.where('status', '==', status);
    }
    return queryBuilder
      .get()
      .then((snapshot) => {
        let data = snapshot.docs.map((d) => {
          var dict = d.data();
          dict['id'] = d.id;
          return dict;
        });
        return data;
      })
      .catch(console.log);
  } else {
    console.log('Error, one or more required params missing.');
    return Promise.reject('Error, one or more required params missing.');
  }
}

function addRequest(
  dropSiteId,
  requestType,
  requestTitle,
  requestDescription,
  requestQuantity,
  status,
  requestWillingToPay,
  domain,
  user,
) {
  if (
    dropSiteId &&
    requestType &&
    requestTitle &&
    requestDescription &&
    requestQuantity &&
    status
  ) {
    return database
      .collection('request')
      .add({
        dropSiteId: dropSiteId,
        requestType: requestType,
        requestTitle: requestTitle,
        requestDescription: requestDescription,
        requestQuantity: requestQuantity,
        status: status,
        domain: domain,
        user: user,
        requestWillingToPay: requestWillingToPay,
      })
      .then(function (docRef) {
        return docRef.id;
      })
      .catch(function (error) {
        console.error('Error writing document: ', error);
      });
  } else {
    console.log('Error, one or more required params missing.');
    return Promise.reject('Error, one or more required params missing.');
  }
}

function editRequest(
  requestId,
  requestType,
  requestTitle,
  requestDescription,
  requestQuantity,
  status,
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
    return database
      .collection('request')
      .doc(requestId)
      .set(updateObj, { merge: true })
      .then(function (docRef) {
        return 'Request update success.';
      })
      .catch(function (error) {
        console.error('Error writing document: ', error);
      });
  } else {
    console.log('Error, requestId is required.');
    return Promise.reject('Error, requestId is required.');
  }

  // To do
  // add validation for the required variables
  // make it so that only the variables requested will be updated
}

function deleteRequest(requestId) {
  if (requestId) {
    return database
      .collection('request')
      .doc(requestId)
      .delete()
      .then(() => {
        return requestId + ' deleted';
      })
      .catch(console.log);
  } else {
    console.log('Error, one or more required params missing.');
    return Promise.reject('Error, one or more required params missing.');
  }
}

// SUPPPLY

function listSupply(dropSiteId) {
  return database
    .collection('supply')
    .where('dropSiteId', '==', dropSiteId)
    .get()
    .then((snapshot) => {
      let data = snapshot.docs.map((d) => {
        var dict = d.data();
        dict['id'] = d.id;
        return dict;
      });
      return data;
    })
    .catch(console.log);
  // To do
  // create zipcode and radius filters
}

function addSupply(
  dropSiteId,
  requestId,
  requestTitle,
  supplyPhone,
  supplyQuantity,
  supplyDeliveryTime,
  supplyComments,
) {
  if (
    dropSiteId &&
    requestId &&
    requestTitle &&
    supplyQuantity &&
    supplyDeliveryTime &&
    supplyComments
  ) {
    return database
      .collection('supply')
      .add({
        dropSiteId: dropSiteId,
        requestId: requestId,
        requestTitle: requestTitle,
        supplyPhone: supplyPhone,
        supplyQuantity: supplyQuantity,
        supplyDeliveryTime: supplyDeliveryTime,
        supplyComments: supplyComments,
      })
      .then(function (docRef) {
        return docRef.id;
      })
      .catch(function (error) {
        console.error('Error writing document: ', error);
      });
  } else {
    console.log('Error, one or more required params missing.');
    return Promise.reject('Error, one or more required params missing.');
  }
}

function deleteSupply(supplyId) {
  if (supplyId) {
    return database
      .collection('supply')
      .doc(supplyId)
      .delete()
      .then(() => {
        return supplyId + ' deleted';
      })
      .catch(console.log);
  } else {
    console.log('Error, one or more required params missing.');
    return Promise.reject('Error, one or more required params missing.');
  }
}

module.exports = {
  listDropSites: listDropSites,
  getDropSites: getDropSites,
  addDropSite: addDropSite,
  addNewDropSite: addNewDropSite,
  editDropSite: editDropSite,
  deleteDropSite: deleteDropSite,
  getRequests: getRequests,
  addRequest: addRequest,
  editRequest: editRequest,
  deleteRequest: deleteRequest,
  listSupply: listSupply,
  addSupply: addSupply,
  deleteSupply: deleteSupply,
};
