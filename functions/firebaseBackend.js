var admin = require("firebase-admin");
const serviceAccount = require("./service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hospitalcommunity.firebaseio.com"
});

// DATABASE FUNCTIONS

const database = admin.firestore();
const dropSiteRef = database.collection("dropSite");

function getDropSite(location_id) {
  return dropSiteRef
    .doc(location_id)
    .get()
    .then(doc => {
      if (doc.exists) {
        return doc.data();
      } else {
        return "";
      }
    })
    .catch(console.log);
}

module.exports = {
  getDropSite: getDropSite
};
