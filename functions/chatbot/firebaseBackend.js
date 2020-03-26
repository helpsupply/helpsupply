var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hospitalcommunity.firebaseio.com"
});
// DB Consts:
const db = admin.firestore();
const dropSiteRef = db.collection("dropSite");

function getDropSite(location_id) {
  return dropSiteRef.doc(location_id).get().then;
}
