import BackendInterface from './backendInterface'
import Firebase from 'firebase'
import config from '../components/Firebase/config'

class FirebaseBackend extends BackendInterface {
  constructor(testApp) {
    super()

    this.firebase = testApp || Firebase.initializeApp(config)
    this.firebase.analytics()
    this.firestore = this.firebase.firestore()
    this.loggedIn = false
    this.authLoaded = false
    this.badDomain = false

    this.firebase.auth().onAuthStateChanged((user) => {
      this.authLoaded = true
      if (user) {
        this.loggedIn = true
      } else {
        this.loggedIn = false
      }
    })
  }

  listDropSites(zipcode, radius) {
    return this.firestore
      .collection('dropSite')
      .get()
      .then((snapshot) => {
        let data = snapshot.docs.map((d) => {
          var dict = d.data()
          dict['id'] = d.id
          return dict
        })
        return data
      })
      .catch(console.log)
    // To do
    // create zipcode and radius filters
  }

  getDropSites(dropSiteId) {
    if (dropSiteId) {
      return this.firestore
        .collection('dropSite')
        .doc(dropSiteId)
        .get()
        .then((doc) => {
          return doc.data()
        })
        .catch(console.log)
    } else {
      console.log('Error, one or more required params missing.')
      return Promise.resolve('Error, one or more required params missing.')
    }
  }

  addDropSite({
    location_id,
    dropSiteDescription,
    dropSiteAddress,
    dropSiteRequirements,
    dropSitePhone,
    dropSiteNotes,
    requestWillingToPay,
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
        domain: this.firebase.auth().currentUser.email.split('@')[1],
        user: this.firebase.auth().currentUser.uid,
      }
      return this.firestore
        .collection('dropSite')
        .doc(location_id)
        .set(newSiteObj)
        .then(function (docRef) {
          return 'Drop site added'
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
    } else {
      console.log('Error, one or more required params missing.')
      return Promise.resolve('Error, one or more required params missing.')
    }
  }

  addNewDropSite({
    dropSiteFacilityName,
    dropSiteZip,
    dropSiteAddress,
    dropSiteCity,
    dropSiteState,
    dropSiteUrl,
  }) {
    if (dropSiteFacilityName && dropSiteAddress && dropSiteZip) {
      let newSiteObj = {
        dropSiteFacilityName,
        dropSiteZip,
        dropSiteAddress,
        dropSiteCity,
        dropSiteState,
        dropSiteUrl,
      }
      let db = this.firestore
      return db
        .collection('dropSite')
        .add(newSiteObj)
        .then(function (docRef) {
          return db
            .collection('dropSite')
            .doc(docRef.id)
            .set({ location_id: docRef.id }, { merge: true })
            .then(() => {
              return docRef.id
            })
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
    } else {
      console.log('Error, one or more required params missing.')
      return Promise.resolve('Error, one or more required params missing.')
    }
  }

  editDropSite(
    location_id,
    dropSiteName,
    dropSiteDescription,
    dropSiteAddress,
    dropSiteZip,
    dropSitePhone
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
        domain: this.firebase.auth().currentUser.email.split('@')[1],
        user: this.firebase.auth().currentUser.uid,
        dropSiteName: '',
        dropSiteDescription: '',
        dropSiteAddress: '',
        dropSiteZip: '',
        dropSitePhone: '',
      }
      if (dropSiteName) {
        newSiteObj.dropSiteName = dropSiteName
      }
      if (dropSiteDescription) {
        newSiteObj.dropSiteDescription = dropSiteDescription
      }
      if (dropSiteAddress) {
        newSiteObj.dropSiteAddress = dropSiteAddress
      }
      if (dropSiteZip) {
        newSiteObj.dropSiteZip = dropSiteZip
      }
      if (dropSitePhone) {
        newSiteObj.dropSitePhone = dropSitePhone
      }
      return this.firestore
        .collection('dropSite')
        .doc(location_id)
        .set(newSiteObj, { merge: true })
        .then(function () {
          return 'Drop site updated'
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
    } else {
      console.log('Error, one or more required params missing.')
      return Promise.resolve('Error, one or more required params missing.')
    }
  }

  deleteDropSite(dropSiteId) {
    if (dropSiteId) {
      return this.firestore
        .collection('dropSite')
        .doc(dropSiteId)
        .delete()
        .then(() => {
          return dropSiteId + ' deleted'
        })
        .catch(console.log)
    } else {
      console.log('Error, one or more required params missing.')
      return Promise.resolve('Error, one or more required params missing.')
    }
  }

  // REQUESTS

  getRequests(dropSiteId, requestType, status) {
    if (dropSiteId) {
      var queryBuilder = this.firestore
        .collection('request')
        .where('dropSiteId', '==', dropSiteId)
      if (requestType) {
        queryBuilder = queryBuilder.where('requestType', '==', requestType)
      }
      if (status) {
        queryBuilder = queryBuilder.where('status', '==', status)
      }
      return queryBuilder
        .get()
        .then((snapshot) => {
          let data = snapshot.docs.map((d) => {
            var dict = d.data()
            dict['id'] = d.id
            return dict
          })
          return data
        })
        .catch(console.log)
    } else {
      console.log('Error, one or more required params missing.')
      return Promise.resolve('Error, one or more required params missing.')
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
        .collection('request')
        .add({
          dropSiteId: dropSiteId,
          requestType: requestType,
          requestTitle: requestTitle,
          requestDescription: requestDescription,
          requestQuantity: requestQuantity,
          status: status,
          domain: this.firebase.auth().currentUser.email.split('@')[1],
          user: this.firebase.auth().currentUser.uid,
          requestWillingToPay: requestWillingToPay,
        })
        .then(function (docRef) {
          return docRef.id
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
    } else {
      console.log('Error, one or more required params missing.')
      return Promise.resolve('Error, one or more required params missing.')
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
      let updateObj = {}
      if (requestType) {
        updateObj.requestType = requestType
      }
      if (requestTitle) {
        updateObj.requestTitle = requestTitle
      }
      if (requestDescription) {
        updateObj.requestDescription = requestDescription
      }
      if (requestQuantity) {
        updateObj.requestQuantity = requestQuantity
      }
      if (status) {
        updateObj.status = status
      }
      return this.firestore
        .collection('request')
        .doc(requestId)
        .set(updateObj, { merge: true })
        .then(function (docRef) {
          return 'Request update success.'
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
    } else {
      console.log('Error, requestId is required.')
      return Promise.resolve('Error, requestId is required.')
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
          return requestId + ' deleted'
        })
        .catch(console.log)
    } else {
      console.log('Error, one or more required params missing.')
      return Promise.resolve('Error, one or more required params missing.')
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
          var dict = d.data()
          dict['id'] = d.id
          return dict
        })
        return data
      })
      .catch(console.log)
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
          return docRef.id
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
    } else {
      console.log('Error, one or more required params missing.')
      return Promise.resolve('Error, one or more required params missing.')
    }
  }

  deleteSupply(supplyId) {
    if (supplyId) {
      return this.firestore
        .collection('supply')
        .doc(supplyId)
        .delete()
        .then(() => {
          return supplyId + ' deleted'
        })
        .catch(console.log)
    } else {
      console.log('Error, one or more required params missing.')
      return Promise.resolve('Error, one or more required params missing.')
    }
  }

  // Login State
  isLoggedIn() {
    return this.loggedIn
  }

  async isValidHealthcareWorker() {
    if (!this.loggedIn) return false

    let email = this.firebase.auth().currentUser.email
    var existing = (
      await this.firestore.collection('domain').doc(email.split('@')[1]).get()
    ).data()
    if (!existing) {
      console.log('New domain, setting pending!', email)
      await this.firestore
        .collection('domain')
        .doc(email.split('@')[1])
        .set({ valid: 'pending' })
    } else {
      console.log('pending entry found matching', email)
    }

    var domain = this.firebase.auth().currentUser.email.split('@')[1]
    var verification = await this.firestore
      .collection('domain')
      .doc(domain)
      .get()
    console.log('checking validity', verification.data())
    if (verification.data() && verification.data().valid == 'true') return true
    if (verification.data() && verification.data().valid == 'false')
      this.badDomain = true
    return false
  }

  async dropSiteExists(dropsite) {
    if (
      (await this.firestore.collection('dropSite').doc(dropsite).get()).data()
    )
      return true
    return false
  }

  // VALIDATED DOMAINS

  async signupWithEmail(email, selectedDropSite) {
    var actionCodeSettings = {
      url:
        window.location.protocol +
        '//' +
        window.location.host +
        '/signupFinish/' +
        selectedDropSite,
      handleCodeInApp: true,
    }

    window.localStorage.setItem('intendedDropSite', selectedDropSite)
    await this.firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
    window.localStorage.setItem('emailForSignIn', email)
  }

  shouldRepromptEmail() {
    return window.localStorage.getItem('emailForSignIn') === null
  }

  async continueSignup(url, email, dropsite) {
    if (this.firebase.auth().isSignInWithEmailLink(url)) {
      var email = window.localStorage.getItem('emailForSignIn') || email
      await this.firebase.auth().signInWithEmailLink(email, url)
      window.localStorage.removeItem('emailForSignIn')
      window.testfs = this.firestore
    } else {
      throw 'Email Link Invalid'
    }
  }

  // VALIDATED DOMAINS

  async getDomains(pendingOnly, callback) {
    let domains = null
    let newDomains = []

    if (pendingOnly) {
      domains = await this.firestore
        .collection('domain')
        .where('valid', '==', 'pending')
    } else {
      domains = await this.firestore.collection('domain')
    }

    return domains.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          newDomains.push(change.doc.id)
          // Gross layer violation here
          if (Notification.permission === 'granted') {
            var notification = new Notification(
              'New domain added: ' + change.doc.id
            )
          }
        }

        if (change.type === 'removed') {
          newDomains = newDomains.filter((doc) => doc !== change.doc.id)
        }
        callback(newDomains)
      })
    })
  }

  async setDomainIsValid(domain, isValid) {
    try {
      await this.firestore
        .collection('domain')
        .doc(domain)
        .set({ valid: isValid ? 'true' : 'false' })
    } catch (e) {
      throw 'Validating domains is not allowed'
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

export default FirebaseBackend
