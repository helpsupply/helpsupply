// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions");
const serviceAccount = require("./service-account.json");
const hospital_index = require("./chatbot/hospital_index");
const tools = require("./chatbot/helperFunctions");

var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hospitalcommunity.firebaseio.com"
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.json({ messages: [{ text: "Hello from Firebase!" }] });
});

// DialogFlow Webhooks
const { dialogflow } = require("actions-on-google");
const app = dialogflow();

/** Dialogflow Contexts {@link https://dialogflow.com/docs/contexts} */
const AppContexts = {
  NO_FACILITY_FOUND: "no_facility_found",
  ONE_FACILITY_FOUND: "one_facility_found",
  MULTIPLE_FACILITY_FOUND: "multiple_facility_found"
};

/** Dialogflow Context Lifespans {@link https://dialogflow.com/docs/contexts#lifespan} */
const Lifespans = {
  DEFAULT: 5
};

// DB Consts:
const db = admin.firestore();
const dropSiteRef = db.collection("dropSite");

// look through hospitals and zip
app.intent("HCP Signup - hospitalZip", (conv, data) => {
  let zipCode = data["zip-code"];
  // right now this index only accepts
  const searchResults = tools.searchByZip(hospital_index.index, zipCode);

  if (searchResults.length === 0) {
    conv.ask(
      `We don't currently have any facilities with that zip code. Do you want to register a new one?`
    );
  } else if (searchResults.length === 1) {
    const parameters = {
      results: searchResults
    };
    conv.contexts.set(
      AppContexts.ONE_FACILITY_FOUND,
      Lifespans.DEFAULT,
      parameters
    );
    conv.ask(`I found: ${searchResults[0].h.name} - is that correct?`);
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
    conv.ask(output);
  }
});

app.intent("HCPSignup-Followup-OneResult-Yes", (conv, data) => {
  const context = conv.contexts.get("one_facility_found");
  const searchResults = context.parameters.results;
  const location_id = searchResults[0].id;
  const dropSite = dropSiteRef.doc(`${location_id}`);
  console.log(dropSite);

  return dropSite
    .get()
    .then(doc => {
      if (doc.exists) {
        var data = doc.data();
        conv.ask(
          `Great we have a drop-off location for this facility at: ${data.dropSiteAddress}.`
        );
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        conv.ask(`We don't have a drop-off location for this facility.`);
      }
    })
    .catch(e => {
      console.log("error:", e);
      conv.close("Sorry, try again.");
    });
});

exports.dialogflowWebhook = functions.https.onRequest(app);
