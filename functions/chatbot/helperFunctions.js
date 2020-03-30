const twilio = require("twilio"); // needed in verifyTwilio() for verification

function verifyTwilio(req) {
  // as per https://www.twilio.com/blog/how-to-secure-twilio-webhook-urls-in-nodejs
  const twilioSignature = req.headers["x-twilio-signature"];
  const params = req.body;
  const baseUrl =
    "https://us-central1-hospitalcommunity.cloudfunctions.net/twilio";
  const url = baseUrl + req.path;
  const requestIsValid = twilio.validateRequest(
    process.env.TWILIO_AUTH_TOKEN,
    twilioSignature,
    url,
    params
  );
  return requestIsValid;
}

function searchByZip(hospital_index, zip) {
  let results = [];
  let city_hits = hospital_index.zip_index[zip] || [];
  for (var i = 0; i < city_hits.length; i++) {
    let h = hospital_index.id_index[city_hits[i]];
    let id = city_hits[i];
    results.push({ h, id });
  }
  return results;
}

// creates a new response object
function tResponseNew() {
  const actionsTemplate = {
    actions: []
  };
  return actionsTemplate;
}

// adds a new message to the response object
function tResponseAddMsg(responseObj, message) {
  responseObj.actions.push({
    say: message
  });
  return responseObj;
}

function tResponseEndByListening(responseObj) {
  responseObj.actions.push({
    listen: true
  });
  return responseObj;
}

// adds a redirects for chatbot to a specific task or webhook
function tResponseEndByRedirect(responseObj, urlRedirectTrue, taskNameOrURL) {
  if (urlRedirectTrue) {
    responseObj.actions.push({
      redirect: {
        uri: taskNameOrURL,
        method: "POST"
      }
    });
  } else {
    let taskURL = "task://" + taskNameOrURL;
    responseObj.actions.push({
      redirect: taskURL
    });
  }
  return responseObj;
}

// adds a memory
function tResponseAddMemory(responseObj, objWithKeyValuePairs) {
  responseObj.actions.push({
    remember: objWithKeyValuePairs
  });
  return responseObj;
}

// returns array of collected answers from requested "collect" action
function twilioGetCollectedAnswersObj(twilioRequest, twilioCollectName) {
  let Memory = JSON.parse(twilioRequest.body.Memory);
  return Memory.twilio.collected_data[twilioCollectName].answers;
}

// returns single collected answer from requested "collect" action
function twilioGetCollectedAnswer(twilioRequest, twilioCollectName, field) {
  let Memory = JSON.parse(twilioRequest.body.Memory);
  return Memory.twilio.collected_data[twilioCollectName].answers[field].answer;
}

// returns value from memory (stored from previous "remember" actions)
function twilioRemember(twilioRequest, field) {
  let Memory = JSON.parse(twilioRequest.body.Memory);
  return Memory[field];
}

module.exports = {
  verifyTwilio: verifyTwilio,
  searchByZip: searchByZip,
  twilioGetCollectedAnswersObj: twilioGetCollectedAnswersObj,
  twilioGetCollectedAnswer: twilioGetCollectedAnswer,
  twilioRemember: twilioRemember,
  tResponseNew: tResponseNew,
  tResponseAddMsg: tResponseAddMsg,
  tResponseEndByListening: tResponseEndByListening,
  tResponseEndByRedirect: tResponseEndByRedirect,
  tResponseAddMemory: tResponseAddMemory
};
