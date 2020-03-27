// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions");
const serviceAccount = require("./service-account.json");
const hospital_index = require("./chatbot/hospital_index");
const tools = require("./chatbot/helperFunctions");
const db = require("./chatbot/firebaseBackend");

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
  ADD_NEW_FACILITY: "add_new_facility",
  ONE_FACILITY_FOUND: "one_facility_found",
  MULTIPLE_FACILITY_FOUND: "multiple_facility_found",
  ONE_FACILITY_CONFIRMED: "one_facility_confirmed",
  CREATE_NEW_DROPSITE: "create_new_dropsite",
  CREATE_NEW_DROPSITE_ADDRESS_ADDED: "create_new_dropsite_address_added",
  CREATE_NEW_DROPSITE_ADDRESS_DETAILS_ADDED:
    "create_new_dropsite_address_details_added",
  CREATE_NEW_DROPSITE_REQUIREMENTS_ADDED:
    "create_new_dropsite_requirements_added",
  CREATE_NEW_FACILITY: "create_new_facility",
  CREATE_NEW_FACILITY_NAME_ADDED: "create_new_facility_name_added"
};

/** Dialogflow Context Lifespans {@link https://dialogflow.com/docs/contexts#lifespan} */
const Lifespans = {
  DEFAULT: 1,
  LONG: 10
};

// look through hospitals and zip
app.intent("HCPSignupHospitalZip", (conv, data) => {
  let zipCode = data["zip-code"];
  // right now this index only accepts
  const searchResults = tools.searchByZip(hospital_index.index, zipCode);

  if (searchResults.length === 0) {
    conv.contexts.set(AppContexts.ADD_NEW_FACILITY, Lifespans.DEFAULT);
    conv.ask(
      `We don't currently have any facilities with that zip code. Let's create a new facility. What is the name of your facility?`
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

    const parameters = {
      results: searchResults
    };
    conv.contexts.set(
      AppContexts.MULTIPLE_FACILITY_FOUND,
      Lifespans.DEFAULT,
      parameters
    );

    conv.ask(output + "Please tell me the number or say 'NONE'");
  }
});

app.intent("HCPSignupFollowupMultipleResultsYes", (conv, data) => {
  const context = conv.contexts.get("multiple_facility_found");
  let selection = parseInt(data["number"]) - 1;
  const searchResults = context.parameters.results;
  const location_id = searchResults[selection].id;

  return db
    .getDropSite(location_id)
    .then(doc => {
      if (doc.exists) {
        var data = doc.data();
        const parameters = {
          location_id: location_id
        };
        conv.contexts.set(
          AppContexts.ONE_FACILITY_CONFIRMED,
          Lifespans.DEFAULT,
          parameters
        );
        conv.ask(
          `Great! We have a drop-off location for this facility at: ${data.dropSiteAddress}.`
        );
        conv.ask(
          `Would you like to 1) ADD A NEW REQUEST or 2) SEE OPEN REQUESTS AND DONATIONS?`
        );
      } else {
        // doc.data() will be undefined in this case
        const parameters = {
          location_id: location_id
        };
        conv.contexts.set(
          AppContexts.CREATE_NEW_DROPSITE,
          Lifespans.LONG,
          parameters
        );
        conv.ask(
          `Got it. Let's create a new drop-off location for this facility. What would you like the address of the drop-off location to be?`
        );
      }
    })
    .catch(e => {
      console.log("error:", e);
      conv.close("Sorry, try again.");
    });
});

app.intent("HCPSignupFollowupOneResultYes", (conv, data) => {
  const context = conv.contexts.get("one_facility_found");
  const searchResults = context.parameters.results;
  const location_id = searchResults[0].id;

  return db
    .getDropSite(location_id)
    .then(doc => {
      if (doc.exists) {
        var data = doc.data();
        const parameters = {
          location_id: location_id
        };
        conv.contexts.set(
          AppContexts.ONE_FACILITY_CONFIRMED,
          Lifespans.DEFAULT,
          parameters
        );
        conv.ask(
          `Great! We have a drop-off location for this facility at: ${data.dropSiteAddress}.`
        );
        conv.ask(
          `Would you like to 1) ADD A NEW REQUEST or 2) SEE OPEN REQUESTS AND DONATIONS?`
        );
      } else {
        // doc.data() will be undefined in this case
        const parameters = {
          location_id: location_id
        };
        conv.contexts.set(
          AppContexts.CREATE_NEW_DROPSITE,
          Lifespans.LONG,
          parameters
        );
        conv.ask(
          `Got it. Let's create a new drop-off location for this facility. What would you like the address of the drop-off location to be?`
        );
      }
    })
    .catch(e => {
      console.log("error:", e);
      conv.close("Sorry, try again.");
    });
});

app.intent("HCPSeeDropOffDetails", (conv, data) => {
  const context = conv.contexts.get("one_facility_confirmed");
  const location_id = context.parameters.location_id;
  const dropSiteURL = "https://help.supply/dropsite/" + location_id + "/admin";
  conv.ask("To see open requests and donations, go to: " + dropSiteURL);
});

app.intent("HCPCreateNewDropsite", (conv, data) => {
  const parameters = {
    address: conv.query
  };
  conv.contexts.set(
    AppContexts.CREATE_NEW_DROPSITE_ADDRESS_ADDED,
    Lifespans.LONG,
    parameters
  );
  conv.ask(
    `Are there any details, like a backdoor or loading dock that people donating should know about?`
  );
});

app.intent("HCPCreateNewDropSiteAddressDetails", (conv, data) => {
  const parameters = {
    addressDetails: conv.query
  };
  conv.contexts.set(
    AppContexts.CREATE_NEW_DROPSITE_ADDRESS_DETAILS_ADDED,
    Lifespans.LONG,
    parameters
  );
  conv.ask(
    `What are the requirements for donations? (e.g. sealed boxes, sterile, unused, etc.)`
  );
});

app.intent("HCPCreateNewDropSiteRequirements", (conv, data) => {
  const parameters = {
    requirements: conv.query
  };
  conv.contexts.set(
    AppContexts.CREATE_NEW_DROPSITE_REQUIREMENTS_ADDED,
    Lifespans.LONG,
    parameters
  );
  conv.ask(
    `What is the contact (email/phone) for this drop-off location? This is optional. You can also say "skip".`
  );
});

app.intent("HCPCreateNewDropSiteContact", (conv, data) => {
  const facilityNameContext = conv.contexts.get(
    AppContexts.CREATE_NEW_FACILITY
  );
  let facilityName;
  if (facilityNameContext) {
    facilityName = facilityNameContext.parameters.facilityName;
  }

  const location_idContext = conv.contexts.get(AppContexts.CREATE_NEW_DROPSITE);
  let location_id;
  if (location_idContext) {
    location_id = location_idContext.parameters.location_id;
  }

  const addressContext = conv.contexts.get(
    AppContexts.CREATE_NEW_DROPSITE_ADDRESS_ADDED
  );
  const address = addressContext.parameters.address;

  const addressDetailsContext = conv.contexts.get(
    AppContexts.CREATE_NEW_DROPSITE_ADDRESS_DETAILS_ADDED
  );
  const addressDetails = addressDetailsContext.parameters.addressDetails;

  const requirementsContext = conv.contexts.get(
    AppContexts.CREATE_NEW_DROPSITE_REQUIREMENTS_ADDED
  );
  const requirements = requirementsContext.parameters.requirements;

  const contact = conv.query;

  /*
  if (facilityName) {
    return dropSiteRef
      .add({
        dropSiteFacilityName: facilityName,
        dropSiteAddress: address,
        dropSiteDetails: addressDetails,
        dropSiteRequirements: requirements,
        dropSitePhone: contact
      })
      .then(function(docRef) {
        conv.contexts.set(
          AppContexts.CREATE_NEW_DROPSITE_FINAL_ADDED,
          Lifespans.LONG
        );
        conv.ask(
          `You can view your drop-off location at https://help.supply/dropsite/` +
            docRef.id +
            "/"
        );
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  } else {
    return dropSiteRef
      .doc(`${location_id}`)
      .set({
        dropSiteName: hospital_index.index.id_index[location_id].name,
        location_id: location_id,
        dropSiteAddress: address,
        dropSiteDetails: addressDetails,
        dropSiteRequirements: requirements,
        dropSiteZip: hospital_index.index.id_index[location_id].zip,
        dropSitePhone: contact
      })
      .then(function(docRef) {
        conv.contexts.set(
          AppContexts.CREATE_NEW_DROPSITE_FINAL_ADDED,
          Lifespans.LONG
        );
        conv.ask(
          `You can view your drop-off location at https://help.supply/dropsite/` +
            location_id +
            "/"
        );
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  }
  */
});

app.intent("HCPCreateNewDropSiteContactSkip", (conv, data) => {
  const addressContext = conv.contexts.get(
    AppContexts.CREATE_NEW_DROPSITE_ADDRESS_ADDED
  );
  const address = addressContext.parameters.address;
  const addressDetailsContext = conv.contexts.get(
    AppContexts.CREATE_NEW_DROPSITE_ADDRESS_DETAILS_ADDED
  );
  const addressDetails = addressDetailsContext.parameters.addressDetails;
  const requirementsContext = conv.contexts.get(
    AppContexts.CREATE_NEW_DROPSITE_REQUIREMENTS_ADDED
  );
  const requirements = requirementsContext.parameters.requirements;

  /*
  return dropSite
    .set({
      dropSiteName: hospital_index.index.id_index[location_id].name,
      location_id: location_id,
      dropSiteAddress: address,
      dropSiteDescription: addressDetails,
      dropSiteRequirements: requirements,
      dropSiteZip: hospital_index.index.id_index[location_id].zip
    })
    .then(function(docRef) {
      conv.contexts.set(
        AppContexts.CREATE_NEW_DROPSITE_FINAL_ADDED,
        Lifespans.LONG
      );
      conv.ask(
        `Your new drop-off location has been added: ${address} / ${addressDetails} / ${requirements}`
      );
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
    */
});

app.intent("HCPCreateNewFacility", (conv, data) => {
  const parameters = {
    facilityName: conv.query
  };
  conv.contexts.set(
    AppContexts.CREATE_NEW_FACILITY_NAME_ADDED,
    Lifespans.LONG,
    parameters
  );
  conv.contexts.set(
    AppContexts.CREATE_NEW_DROPSITE,
    Lifespans.DEFAULT,
    parameters
  );
  conv.ask(
    `Got it. Let's create a new drop-off location for this facility. What would you like the address of the drop-off location to be?`
  );
});

exports.dialogflowWebhook = functions.https.onRequest(app);
