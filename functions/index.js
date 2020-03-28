// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions");
const hospital_index = require("./chatbot/hospital_index");
const tools = require("./chatbot/helperFunctions");
const express = require("express");
const cors = require("cors");
const twilioBot = express();

// DB FUNCTIONS
const db = require("./firebaseBackend");

// Automatically allow cross-origin requests
twilioBot.use(cors({ origin: true }));

// CHATBOT WEBHOOKS

// Takes the zipcode and searches for available facilities
twilioBot.post("/zipSearch", (req, res) => {
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

  let outputToTwilio = tools.tResponseNew(); // create new Twilio Actions object
  outputToTwilio = tools.tResponseAddMsg(outputToTwilio, responseMsg); // add new "say" action
  res.json(outputToTwilio); // send back to Twilio
});

// Takes a location_id and sends dropSiteDetails
twilioBot.post("/dropSiteDetails", (req, res) => {
  const location_id = tools.twilioGetCollectedAnswer(
    req,
    "collect_dropsite_location_id",
    "location_id"
  ); // get the answer

  console.log(tools.twilioRemember(req, "welcomeStarted"));

  db.getDropSite(location_id).then(data => {
    let outputToTwilio = tools.tResponseNew(); // create new Twilio Actions object
    outputToTwilio = tools.tResponseAddMsg(outputToTwilio, data.dropSiteName); // add new "say" action
    outputToTwilio = tools.tResponseAddMsg(
      outputToTwilio,
      data.dropSiteAddress
    ); // add new "say" action
    res.json(outputToTwilio); // send back to Twilio
  });
});

exports.twilio = functions.https.onRequest(twilioBot);
