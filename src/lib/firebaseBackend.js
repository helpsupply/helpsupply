import OrganizationIndex from './organizations/index';

const Firebase = require('firebase');
const axios = require('axios').default;

let config = null;
if (process.env.REACT_APP_HOST_ENV === 'production') {
  config = {
    apiKey: 'AIzaSyBtHRUSPc0e4rF057rotTeVpeZ3lDWoQTE',
    authDomain: 'hospitalcommunity.firebaseapp.com',
    databaseURL: 'https://hospitalcommunity.firebaseio.com',
    projectId: 'hospitalcommunity',
    storageBucket: 'hospitalcommunity.appspot.com',
    messagingSenderId: '726825294724',
    appId: '1:726825294724:web:f3dc998705fbe6c8b09bd1',
    measurementId: 'G-987WXEFK5D',
  };
} else {
  config = {
    apiKey: 'AIzaSyAXmpRfgvne_w2apeWb3Q8wSNUqNey3-Mg',
    authDomain: 'help-supply-staging.firebaseapp.com',
    databaseURL: 'https://help-supply-staging.firebaseio.com',
    projectId: 'help-supply-staging',
    storageBucket: 'help-supply-staging.appspot.com',
    messagingSenderId: '395198068697',
    appId: '1:395198068697:web:3a7975e877fbc98c190bc8',
    measurementId: 'G-5SYKT9JHQF',
  };
}

export default class FirebaseBackend {
  // Note: testApp can also be an admin app
  constructor(testApp) {
    this.firebase = testApp || Firebase.initializeApp(config);
    testApp || (this.firebase.analytics && this.firebase.analytics());
    this.firestore = this.firebase.firestore();
    this.loggedIn = false;
    this.authLoaded = false;
    this.badDomain = false;

    let auth = this.firebase.auth();

    if (auth.onAuthStateChanged) {
      auth.onAuthStateChanged((user) => {
        this.authLoaded = true;
        if (user) {
          this.loggedIn = true;
        } else {
          this.loggedIn = false;
        }
      });
    }
  }

  setLocalZip(zipCode) {
    window.localStorage.setItem('zipCode', zipCode);
  }

  getLocalZip() {
    return window.localStorage.getItem('zipCode');
  }

  clearLocalZip() {
    return window.localStorage.removeItem('zipCode');
  }

  // Returns an array of pairs [RequestKind, OrganizationId]
  getServicesForZip(zipCode) {
    return OrganizationIndex.ByZip[zipCode];
  }

  // Returns a full metadata object a la lib/organizations/manyc.js
  getMetadataForProvider(provider) {
    return OrganizationIndex.Metadata[provider];
  }

  async getServiceRequests(status) {
    const { currentUser } = this.firebase.auth();
    if (!currentUser.uid) {
      throw new Error('You must be logged in to view your requests.');
    }
    var queryBuilder = this.firestore
      .collection('servicerequest')
      .where('user', '==', currentUser.uid);
    if (status) {
      queryBuilder = queryBuilder.where('status', '==', status);
    }
    let snapshot = await queryBuilder.get();
    let data = snapshot.docs.map((d) => {
      var dict = d.data();
      dict['id'] = d.id;
      return dict;
    });

    return data;
  }

  // Saves a request to the database, with the appropriate request
  async saveServiceRequest(request) {
    if (request.kind === undefined) {
      throw new Error("Request needs a 'kind'");
    }
    if (request.organization === undefined) {
      throw new Error("Request needs a mapped 'organization'");
    }
    if (request.user !== undefined) {
      throw new Error("'user' is a reserved property for Requests");
    }
    if (request.domain !== undefined) {
      throw new Error("'domain' is a reserved property for Requests");
    }
    if (request.status !== undefined && request.status !== 'open') {
      throw new Error("'status' is a reserved property for Requests");
    }
    if (request.sent !== undefined) {
      throw new Error("'sent' is a reserved property for Requests");
    }

    if (request.status === undefined) {
      request.status = 'inprogress';
    }

    const { currentUser } = this.firebase.auth();
    request.domain = currentUser ? currentUser.email.split('@')[1] || '' : '';
    request.user = currentUser ? currentUser.uid || '' : '';
    request.timeCreated = Date.now();
    return (await this.firestore.collection('servicerequest').add(request)).id;
  }

  // Saves a request to the database, with the appropriate request
  async updateServiceRequest(id, request, admin) {
    if (admin !== true) {
      if (request.user !== undefined) {
        throw new Error("'user' is a reserved property for Requests");
      }
      if (request.domain !== undefined) {
        throw new Error("'domain' is a reserved property for Requests");
      }
      if (request.status !== undefined) {
        throw new Error("'status' is a reserved property for Requests");
      }
      if (request.sent !== undefined) {
        throw new Error("'sent' is a reserved property for Requests");
      }
    }

    return this.firestore
      .collection('servicerequest')
      .doc(id)
      .set(request, { merge: true })
      .then(() => {
        return 'Success';
      })
      .catch((e) => {
        throw new Error(e);
      });
  }

  // Get a specific Service Request
  async getServiceRequest(id) {
    let snapshot = await this.firestore
      .collection('servicerequest')
      .doc(id)
      .get();
    let dict = snapshot.data();
    dict.id = snapshot.id;
    return dict;
  }

  // Delete a service request
  async deleteServiceRequest(id) {
    await this.firestore.collection('servicerequest').doc(id).delete();
  }

  // Gets all requests for a given user
  async getAllServiceRequests() {
    const { currentUser } = this.firebase.auth();
    let snapshot = await this.firestore
      .collection('servicerequest')
      .where('user', '==', currentUser.uid)
      .get();
    return snapshot.docs.map((d) => {
      var dict = d.data();
      dict['id'] = d.id;
      return dict;
    });
  }

  /*
   * Legacy code below! (primarily for the old PPE flow)
   */

  async _checkValidity(data) {
    let domain_names = [
      ...new Set(data.map((d) => d.domain).filter((d) => d !== undefined)),
    ];
    const domains = await Promise.all(
      domain_names.map((id) => this.firestore.doc(`domain/${id}`).get()),
    );
    let valid_domains = new Set();
    domains.map(
      (d) => d.data() && d.data().valid === 'true' && valid_domains.add(d.id),
    );

    return data.map((d) => {
      d.valid = valid_domains.has(d.domain);
      return d;
    });
  }

  async listDropSites(zipcode, radius) {
    let snapshot = await this.firestore.collection('dropSite').get();
    let data = snapshot.docs.map((d) => {
      var dict = d.data();
      dict['id'] = d.id;
      return dict;
    });

    return this._checkValidity(data);
    // To do
    // create zipcode and radius filters
  }

  async getDropSites(dropSiteId) {
    if (dropSiteId) {
      let doc = await this.firestore
        .collection('dropSite')
        .doc(dropSiteId)
        .get();
      if (!doc.exists) {
        return false;
      }
      let dropsite = doc.data();
      return (await this._checkValidity([dropsite]))[0];
    } else {
      console.log('Error, one or more required params missing.');
      await Promise.reject('Error, one or more required params missing.');
    }
  }

  addDropSite(dropSite) {
    if (
      dropSite.dropSiteDescription &&
      dropSite.location_id &&
      dropSite.dropSiteAddress
    ) {
      const { currentUser } = this.firebase.auth();
      let newSiteObj = {
        ...dropSite,
        domain: currentUser.email.split('@')[1],
        user: currentUser.uid,
      };
      return this.firestore
        .collection('dropSite')
        .doc(dropSite.location_id)
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

  // Note: for the moment, this is done before a user even logs in so it
  // is not signed with any credentials and assumed to be invalid until
  // it is edited later in the flow.
  addNewDropSite({
    dropSiteFacilityName = '',
    dropSiteZip = '',
    dropSiteAddress = '',
    dropSiteCity = '',
    dropSiteState = '',
    dropSiteUrl = '',
  }) {
    if (dropSiteFacilityName && dropSiteZip) {
      const { currentUser } = this.firebase.auth();
      let newSiteObj = {
        dropSiteFacilityName,
        dropSiteZip,
        dropSiteAddress,
        dropSiteCity,
        dropSiteState,
        dropSiteUrl,
        domain: currentUser.email.split('@')[1] || '',
        user: currentUser.uid || '',
      };
      let db = this.firestore;
      return db
        .collection('dropSite')
        .add(newSiteObj)
        .then(function (docRef) {
          return db
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

  editDropSite({
    location_id,
    dropSiteAddress,
    dropSiteCity,
    dropSiteDescription,
    dropSiteFacilityName,
    dropSiteName,
    dropSitePhone,
    dropSiteState,
    dropSiteZip,
  }) {
    if (location_id) {
      let newSiteObj = {
        domain: this.firebase.auth().currentUser.email.split('@')[1],
        user: this.firebase.auth().currentUser.uid,
        dropSiteFacilityName: dropSiteFacilityName || '',
        dropSiteDescription: dropSiteDescription || '',
        dropSiteAddress: dropSiteAddress || '',
        dropSiteZip: dropSiteZip || '',
        dropSitePhone: dropSitePhone || '',
        dropSiteState: dropSiteState || '',
        dropSiteName: dropSiteName || '',
        dropSiteCity: dropSiteCity || '',
      };
      return this.firestore
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

  deleteDropSite(dropSiteId) {
    if (dropSiteId) {
      return this.firestore
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

  async getRequests(dropSiteId, requestType, status) {
    if (dropSiteId) {
      var queryBuilder = this.firestore
        .collection('request')
        .where('dropSiteId', '==', dropSiteId);
      if (requestType) {
        queryBuilder = queryBuilder.where('requestType', '==', requestType);
      }
      if (status) {
        queryBuilder = queryBuilder.where('status', '==', status);
      }
      let snapshot = await queryBuilder.get();
      let data = snapshot.docs.map((d) => {
        var dict = d.data();
        dict['id'] = d.id;
        return dict;
      });
      return this._checkValidity(data);
    } else {
      console.log('Error, one or more required params missing.');
      return Promise.reject('Error, one or more required params missing.');
    }
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
    if (
      dropSiteId &&
      requestType &&
      requestTitle &&
      requestQuantity &&
      status
    ) {
      return this.firestore
        .collection('request')
        .add({
          dropSiteId: dropSiteId,
          requestType: requestType,
          requestTitle: requestTitle,
          requestDescription: requestDescription || '',
          requestQuantity: requestQuantity,
          status: status,
          domain: this.firebase.auth().currentUser.email.split('@')[1],
          user: this.firebase.auth().currentUser.uid,
          requestWillingToPay: requestWillingToPay || false,
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

  editRequest({
    requestId,
    requestType,
    requestTitle,
    requestDescription,
    requestQuantity,
    status,
    requestWillingToPay,
  }) {
    if (requestId) {
      let updateObj = {
        domain: this.firebase.auth().currentUser.email.split('@')[1],
        user: this.firebase.auth().currentUser.uid,
        requestId,
        requestType,
        requestTitle,
        requestDescription,
        requestQuantity,
        status,
        requestWillingToPay,
      };

      return this.firestore
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

  deleteRequest(requestId) {
    if (requestId) {
      return this.firestore
        .collection('request')
        .doc(requestId)
        .delete()
        .then(() => {
          return requestId;
        })
        .catch(console.log);
    } else {
      console.log('Error, one or more required params missing.');
      return Promise.reject('Error, one or more required params missing.');
    }
  }

  // SUPPPLY

  listSupply(dropSiteId) {
    return this.firestore
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

  addSupply(
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
      return this.firestore
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

  deleteSupply(supplyId) {
    if (supplyId) {
      return this.firestore
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

  // Login State
  isLoggedIn() {
    return this.loggedIn;
  }

  async isValidHealthcareWorker() {
    if (!this.loggedIn) {
      return false;
    }

    let email = this.firebase.auth().currentUser.email;
    var existing = (
      await this.firestore.collection('domain').doc(email.split('@')[1]).get()
    ).data();
    if (!existing) {
      console.log('New domain, setting pending!', email);
      await this.firestore
        .collection('domain')
        .doc(email.split('@')[1])
        .set({ valid: 'pending' });
    } else {
      console.log('pending entry found matching', email);
    }

    var domain = this.firebase.auth().currentUser.email.split('@')[1];
    var verification = await this.firestore
      .collection('domain')
      .doc(domain)
      .get();
    console.log('checking validity', verification.data());
    if (verification.data() && verification.data().valid === 'true') {
      return true;
    }
    if (verification.data() && verification.data().valid === 'false') {
      this.badDomain = true;
    }
    return false;
  }

  async dropSiteExists(dropsite) {
    if (
      (await this.firestore.collection('dropSite').doc(dropsite).get()).data()
    ) {
      return true;
    }
    return false;
  }

  // VALIDATED DOMAINS

  async signupWithEmail(email, selectedDropSite) {
    var actionCodeSettings = {
      url:
        window.location.protocol +
        '//' +
        window.location.host +
        '/signup/finish/' +
        selectedDropSite,
      handleCodeInApp: true,
    };

    window.localStorage.setItem('intendedDropSite', selectedDropSite);
    await this.firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings);
    window.localStorage.setItem('emailForSignIn', email);
  }

  async signupServicesWithEmail(email, zip) {
    window.localStorage.setItem('emailForSignIn', email);
    await axios({
      method: 'POST',
      // Equal to EMAIL_SIGNUP_COMPLETE
      // TODO: Configure staging vs production somewhere
      url:
        'https://us-central1-help-supply-staging.cloudfunctions.net/sendSigninEmail',
      params: {
        email: email,
        url: `${window.location.protocol}//${window.location.host}/signup/complete/${zip}/`,
      },
    });
  }

  getEmailForSignIn() {
    return window.localStorage.getItem('emailForSignIn');
  }

  async continueSignup(url, email) {
    if (this.firebase.auth().isSignInWithEmailLink(url)) {
      const emailOrStoredEmail =
        email || window.localStorage.getItem('emailForSignIn');

      await this.firebase
        .auth()
        .signInWithEmailLink(emailOrStoredEmail, url)
        .then((result) => {
          if (process.env.NODE_ENV !== 'production') {
            console.log(result);
          }
        })
        .catch((err) => {
          if (process.env.NODE_ENV !== 'production') {
            console.error(err);
          }
          throw new Error('Email Link Invalid');
        });

      window.localStorage.removeItem('emailForSignIn');
      window.testfs = this.firestore;
    } else {
      throw new Error('Email Link Invalid');
    }
  }

  // Saves a serviceuser to the database, extra metadata that isn't supported byt the regular firebase user
  async saveServiceUser(inputFields) {
    return this.getServiceUser().then(async (serviceUser) => {
      const user = this.firebase.auth().currentUser;
      if (!user) {
        throw new Error('User invalid');
      }

      if (inputFields.firstName === undefined) {
        throw new Error("User needs a 'firstName'");
      }
      if (inputFields.lastName === undefined) {
        throw new Error("User needs a 'lastName'");
      }
      if (inputFields.phone === undefined) {
        throw new Error("User needs a 'phone'");
      }
      if (inputFields.contactPreference === undefined) {
        throw new Error("User needs a 'contactPreference'");
      }
      if (inputFields.languagePreference === undefined) {
        throw new Error("User needs a 'languagePreference'");
      }
      inputFields.updatedAt = Firebase.firestore.FieldValue.serverTimestamp();
      inputFields.uid = user.uid;
      inputFields.user = user.uid;

      if (serviceUser) {
        // Update serviceuser
        return await this.firestore
          .collection('serviceuser')
          .doc(serviceUser.id)
          .set(inputFields, { merge: true });
      } else {
        // Create serviceuser
        return await this.firestore
          .collection('serviceuser')
          .doc(user.uid)
          .set(inputFields);
      }
    });
  }

  async getServiceUser() {
    const user = this.firebase.auth().currentUser;
    if (!user) {
      throw new Error('Service user invalid: firebase user is not logged in');
    }
    let result = this.firestore
      .collection('serviceuser')
      .where('user', '==', user.uid)
      .get()
      .then(function (querySnapshot) {
        if (!querySnapshot.empty) {
          return {
            id: querySnapshot.docs[0].id,
            data: querySnapshot.docs[0].data(),
          };
        } else {
          return false;
        }
      })
      .catch(function (err) {
        if (process.env.NODE_ENV !== 'production') {
          console.error(err);
          console.error(
            'error selecting serviceuser by firebase user.uid',
            user.uid,
          );
        }
        throw new Error('Error getting user');
      });
    return result;
  }

  // Conversation state
  // Note: only firebase functions have permissions to call these
  async getConversationState(user) {
    let state = await this.firestore.collection('conversation').doc(user).get();
    return state ? state.data() || {} : {};
  }

  async setConversationState(user, state) {
    await this.firestore.collection('conversation').doc(user).set(state);
  }

  // VALIDATED DOMAINS

  async getDomains(pendingOnly, callback) {
    let domains = null;
    let newDomains = [];

    if (pendingOnly) {
      domains = await this.firestore
        .collection('domain')
        .where('valid', '==', 'pending');
    } else {
      domains = await this.firestore.collection('domain');
    }

    return domains.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          newDomains.push(change.doc.id);
          // Gross layer violation here
          if (
            typeof window !== 'undefined' &&
            window.Notification &&
            Notification.permission === 'granted'
          ) {
            // var notification = new Notification(
            //   'New domain added: ' + change.doc.id,
            // );
          }
        }

        if (change.type === 'removed') {
          newDomains = newDomains.filter((doc) => doc !== change.doc.id);
        }
        callback(newDomains);
      });
    });
  }

  async setDomainIsValid(domain, isValid) {
    try {
      await this.firestore
        .collection('domain')
        .doc(domain)
        .set({ valid: isValid ? 'true' : 'false' });
    } catch (e) {
      throw new Error('Validating domains is not allowed');
    }
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
