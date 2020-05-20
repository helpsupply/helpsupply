import OrganizationIndex from './organizations/index';

const Firebase = require('firebase');
const axios = require('axios').default;

let config = null;
let functionurl = null;

if (process.env.REACT_APP_FIREBASE_CONFIG && process.env.REACT_APP_API_URL) {
  functionurl = process.env.REACT_APP_API_URL;
  config = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG);
} else if (typeof window !== 'undefined') {
  if (window.location.hostname === 'help.supply') {
    functionurl = 'https://us-central1-hospitalcommunity.cloudfunctions.net';
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
    functionurl = 'https://us-central1-help-supply-staging.cloudfunctions.net';
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
}

export default class FirebaseBackend {
  // Note: testApp can also be an admin app
  constructor(testApp) {
    this.firebase = testApp || Firebase.initializeApp(config);
    testApp || (this.firebase.analytics && this.firebase.analytics());
    this.firestore = this.firebase.firestore();
    this.loggedIn = false;

    let auth = this.firebase.auth();

    if (auth.onAuthStateChanged) {
      auth.onAuthStateChanged((user) => {
        this.loggedIn = !!user;
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

  setLocalFacility(facility) {
    window.localStorage.setItem('facility', facility);
  }

  getLocalFacility(facility) {
    return window.localStorage.getItem('facility');
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

  // Login State
  isLoggedIn() {
    return this.loggedIn;
  }

  async signupServicesWithEmail(email, zip, facility) {
    window.localStorage.setItem('emailForSignIn', email);
    await axios({
      method: 'POST',
      url: functionurl + '/sendSigninEmail',
      params: {
        email: email,
        // Equal to EMAIL_SIGNUP_COMPLETE
        url: `${window.location.protocol}//${window.location.host}/signup/complete/${zip}/${facility}`,
      },
    });
  }

  async loginServicesWithEmail(email) {
    window.localStorage.setItem('emailForSignIn', email);
    await axios({
      method: 'POST',
      url: functionurl + '/sendSigninEmail',
      params: {
        email: email,
        login: 'true',
        // Login complete url
        url: `${window.location.protocol}//${window.location.host}/login/complete/`,
      },
    });
  }

  getEmailForSignIn() {
    return window.localStorage.getItem('emailForSignIn');
  }

  async continueSignin(url, email) {
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

  // Saves an email to the database
  async saveToEmailList(email) {
    return (
      await this.firestore.collection('emaillist').add({
        createdAt: Firebase.firestore.FieldValue.serverTimestamp(),
        email: email,
      })
    ).id;
  }

  async sendRequestConfirmation(data) {
    await axios({
      method: 'POST',
      // TODO: Configure staging vs production somewhere
      url: functionurl + '/sendRequestConfirmation',
      params: {
        organization: data.organization,
        request: data.id,
        type: data.type,
        date: data.date,
        details: JSON.stringify(data.details),
      },
    });
    return true;
  }
}
