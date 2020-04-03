let firebase = require('firebase');
let admin = require('firebase-admin');

let email = 'newhouseb@gmail.com';

let config = {
  apiKey: 'AIzaSyAXmpRfgvne_w2apeWb3Q8wSNUqNey3-Mg',
  authDomain: 'help-supply-staging.firebaseapp.com',
  databaseURL: 'https://help-supply-staging.firebaseio.com',
  projectId: 'help-supply-staging',
  storageBucket: 'help-supply-staging.appspot.com',
  messagingSenderId: '395198068697',
  appId: '1:395198068697:web:3a7975e877fbc98c190bc8',
  measurementId: 'G-5SYKT9JHQF',
};

var app = admin.initializeApp();
firebase.initializeApp(config);

async function sendVerification(userRecord) {
  var actionCodeSettings = {
    url: 'http://' + 'localhost:3000' + '/verifyFromChat/' + userRecord.email,
    handleCodeInApp: true,
  };
  await firebase
    .auth()
    .sendSignInLinkToEmail(userRecord.email, actionCodeSettings);
  console.log('Email sent!');
}

async function verify_email(email) {
  let user = null;
  try {
    user = await app.auth().getUserByEmail(email);
  } catch (error) {
    user = await app.auth().createUser({ email: email });
  }
  return await sendVerification(user);
}

verify_email(email);
