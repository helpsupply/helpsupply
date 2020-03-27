// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions");
const hospital_index = require("./chatbot/hospital_index");
const tools = require("./chatbot/helperFunctions");
const express = require("express");
const cors = require("cors");
const twillioBot = express();

// DB FUNCTIONS

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
  console.log("getting dropsite");
  return dropSiteRef
    .doc(location_id)
    .get()
    .then(doc => {
      console.log(doc);
      if (doc.exists) {
        return doc.data();
      } else {
        return "";
      }
    })
    .catch(console.log);
}

// Automatically allow cross-origin requests
twillioBot.use(cors({ origin: true }));

twillioBot.post("/zipSearch", (req, res) => {
  const zipCode = req.body.CurrentInput;
  const searchResults = tools.searchByZip(hospital_index.index, zipCode);
  let responseMsg = "";
  if (searchResults.length === 0) {
    responseMsg = `We don't currently have any facilities with that zip code. Let's create a new facility. What is the name of your facility?`;
  } else if (searchResults.length === 1) {
    responseMsg = `I found: ${searchResults[0].h.name} - is that correct?`;
  } else if (searchResults.length > 1) {
    let output = "";
    let outputStart = "I found a few: ";
    let outputArray = [];
    let outputArrayText = "";
    let outputEnd = " - which one were you looking for?";
    for (var i = 0; i < searchResults.length; i++) {
      let index = i + 1;
      outputArray.push(index + ") " + searchResults[i].h.name);
    }
    outputArrayText = outputArray.join("  ");
    output = outputStart + outputArrayText + outputEnd;
    responseMsg = output + "Please tell me the number or say 'NONE'";
  }

  let actionsJSON = {
    actions: [
      {
        say: responseMsg
      }
    ]
  };
  res.json(actionsJSON);
});

exports.twillio = functions.https.onRequest(twillioBot);
