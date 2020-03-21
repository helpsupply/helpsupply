import BackendInterface from "./backendInterface";
import Firebase from "firebase";
import config from "../components/Firebase/config";

class FirebaseBackend extends BackendInterface{
  constructor(testApp) {
    super();

    this.firebase = testApp || Firebase.initializeApp(config);
    this.firestore = this.firebase.firestore();
    this.loggedIn = false;

    this.firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
  }

  listDropSites(zipcode, radius) {
    this.firestore
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

  // Login State
  async isLoggedIn() {
    return this.loggedIn;
  }

  async isValidHealthcareWorker() {
    if (!this.loggedIn) return false;

    var domain = this.firebase.auth().currentUser.email.split('@')[1];
    verification = await this.firestore.collection('domain').doc(domain).get();
    if (verification.data().valid == 'true') return true;
    return false;
  }

  // VALIDATED DOMAINS

  async signupWithEmail(email, selectedDropSite) {
    var actionCodeSettings = {
        url: 'https://hospital.community/signupFinish',
        handleCodeInApp: true,
    };

    window.localStorage.setItem('intendedDropSite', selectedDropSite)
    await this.firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
    window.localStorage.setItem('emailForSignIn', email);
  }

  shouldRepromptEmail() {
    return window.localStorage.getItem('emailForSignIn') === null;
  }

  async continueSignup(url, email) {
    if (this.firebase.auth().isSignInWithEmailLink(url)) {
      var email = window.localStorage.getItem('emailForSignIn') || email;
      await this.firebase.auth().signInWithEmailLink(email, url);
      window.localStorage.removeItem('emailForSignIn')

      let uid = this.firebase.auth().currentUser.uid;
      let initialDropsite = '1';//window.localStorage.getItem('intendedDropSite');

      // TODO: possibly fill in /dropAdmin/bla if we can't index it
      await this.firestore.collection('user').doc(uid).collection('dropsites').doc(initialDropsite).set({'active': true});
      // Add to user their domain so we can use that to validate everything
    } else {
      throw "Email Link Invalid"
    }
  }

  // VALIDATED DOMAINS

  async getDomains(pendingOnly) {
    let domains = null;
    if (pendingOnly) {
      domains = await (this.firestore.collection('domain').where("valid", '==', "pending").get());
    } else {
      domains = await (this.firestore.collection('domain').get());
    }
    return domains.docs.map((d) => d.id);
  }

  async setDomainIsValid(domain, isValid) {
    await this.firestore.collection('domain').doc(domain).set({'status': isValid ? "approved" : "denied"});
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
