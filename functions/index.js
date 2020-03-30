// Note that ENV Variables are set in the Cloud Functions Console:
// https://console.cloud.google.com/functions/details/us-central1/twilio?project=hospitalcommunity&supportedpurview=project&tab=general

const functions = require("firebase-functions");
const hospital_index = require("./chatbot/hospital_index");
const tools = require("./chatbot/helperFunctions");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./firebaseBackend");

// Setup Express app for listening to requests
const twilioBot = express();
twilioBot.use(cors({ origin: true }));
twilioBot.use(bodyParser.urlencoded({ extended: false }));

// CHATBOT WEBHOOKS

// TESTER/TUTORIAL HOOKS // Use the simulator at: https://www.twilio.com/console/autopilot/helpsupply/simulator and start by chatting "test"
twilioBot.post("/tester", (req, res) => {
  if (tools.verifyTwilio(req)) {
    // this will verify that the POST request is from our Twilio account
    let outputToTwilio = tools.tResponseNew(); // this will create a new response to send back to Twilio
    outputToTwilio = tools.tResponseAddMsg(outputToTwilio, "Test successful"); // add a message to send to the user
    // you can add memory key/value pairs, which will stay with the user until the end of the conversation.
    const newMemories = { fishName: "Dory", snakeName: "Voldemort" };
    outputToTwilio = tools.tResponseAddMemory(outputToTwilio, newMemories);
    // outputToTwilio = tools.tResponseEndByListening(outputToTwilio); // (optional) needed in order for the conversation to stay open (and for memories to pass to the subsequent tasks). In this case,
    outputToTwilio = tools.tResponseEndByRedirect(
      outputToTwilio,
      true,
      "https://us-central1-hospitalcommunity.cloudfunctions.net/twilio/testerEnd"
    ); // (optional) when this task is done, automatically redirect to this new task without waiting for user reply
    res.json(outputToTwilio);
  } else {
    return res.status(401).send("Unauthorized");
  }
});

twilioBot.post("/testerEnd", (req, res) => {
  if (tools.verifyTwilio(req)) {
    console.log("testerEndStarted");
    const catName = tools.twilioRemember(req, "fishName"); // this allows you to grab any memories previously stored in this conversation.
    let outputToTwilio = tools.tResponseNew();
    outputToTwilio = tools.tResponseAddMsg(
      outputToTwilio,
      "Test successful. Your fish's name is " +
        catName +
        ". Conversation ended."
    );
    res.json(outputToTwilio);
  } else {
    return res.status(401).send("Unauthorized");
  }
});

twilioBot.post("/testdb", (req, res) => {
  if (tools.verifyTwilio(req)) {
    const answersObj = tools.twilioGetCollectedAnswersObj(req, "add_dropsite");
    const newDropSiteObj = {
      location_id: answersObj.location_id.answer,
      dropSiteDescription: answersObj.dropSiteDescription.answer,
      dropSiteAddress: answersObj.dropSiteAddress.answer,
      dropSiteRequirements: answersObj.dropSiteRequirements.answer,
      dropSitePhone: answersObj.dropSitePhone.answer,
      dropSiteNotes: answersObj.dropSiteNotes.answer,
      requestWillingToPay: answersObj.requestWillingToPay.answer,
      domain: answersObj.domain.answer,
      user: answersObj.user.answer
    };
    db.addDropSite(newDropSiteObj).then(data => {
      console.log(data);
      let outputToTwilio = tools.tResponseNew();
      outputToTwilio = tools.tResponseAddMsg(outputToTwilio, data);
      res.json(outputToTwilio);
    });
  } else {
    return res.status(401).send("Unauthorized");
  }
});

// END TESTER/TUTORIAL HOOKS

// Takes the zipcode and searches for available facilities
twilioBot.post("/zipSearch", (req, res) => {
  if (tools.verifyTwilio(req)) {
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

    let outputToTwilio = tools.tResponseNew();
    outputToTwilio = tools.tResponseAddMsg(outputToTwilio, responseMsg);
    outputToTwilio = tools.tResponseEndByListening(outputToTwilio);
    res.json(outputToTwilio); // send back to Twilio
  } else {
    return res.status(401).send("Unauthorized");
  }
});

// Takes a location_id and sends dropSiteDetails
twilioBot.post("/dropSiteDetails", (req, res) => {
  if (tools.verifyTwilio(req)) {
    const location_id = tools.twilioGetCollectedAnswer(
      req,
      "collect_dropsite_location_id",
      "location_id"
    ); // get the answer
    db.getDropSites(location_id).then(data => {
      let outputToTwilio = tools.tResponseNew();
      if (data) {
        outputToTwilio = tools.tResponseAddMsg(
          outputToTwilio,
          data.dropSiteName
        );
        outputToTwilio = tools.tResponseAddMsg(
          outputToTwilio,
          data.dropSiteAddress
        ); // add new "say" action
        outputToTwilio = tools.tResponseEndByListening(outputToTwilio);
      } else {
        outputToTwilio = tools.tResponseAddMsg(
          outputToTwilio,
          "We couldn't find a location with that id, try again?"
        );
        outputToTwilio = tools.tResponseEndByRedirect(
          outputToTwilio,
          false,
          "review_drop_site_details"
        );
      }
      res.json(outputToTwilio);
    });
  } else {
    return res.status(401).send("Unauthorized");
  }
});

exports.twilio = functions.https.onRequest(twilioBot);
