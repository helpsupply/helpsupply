const RequestKinds = require('./kinds');

function get_field(name) {
  return (request) => {
    return request[name];
  };
}

function always(resp) {
  return (request) => {
    return resp;
  };
}

const FIELD_MAP = {
  'Submitted On': (request) => '' + new Date(),
  Name: (request) => {
    return request.first_name + ' ' + request.last_name;
  },
  Email: get_field('email'),
  Phone: get_field('phone'),
  'Whats your preferred form of contact': (request) => {
    return {
      PHONE: ['Phone'],
      EMAIL: ['Email'],
      EITHER: ['Either'],
    }[request.preferred_contact];
  },
  'When is a good time to reach you Check all that apply': (request) =>
    request.day + ' ' + request.time,
  'What kind of volunteer would you be most interested in speaking with': get_field(
    'volunteer_type',
  ),
  'Anything else about your identity or situation that you would like us to know': (
    request,
  ) => {
    return `
This is a request from Help Supply

Recurring? ${request.recurring ? 'Yes' : 'No'}
Language Preference? ${request.language_preference}
Urgency? ${
      {
        IMMEDIATELY: "Immediately, I'm in crisis",
        FEW_DAYS: 'In the next few days',
        SOON: "I'm okay for now, but am worried I won't be soon",
      }[request.urgency]
    }

Other Notes:
${request.other_notes}

Reference ID:
https://help.supply/r/${request.id}
	  `;
  },
  'I understand this network connects individuals and is not a professional therapeutic organization': always(
    'Yes',
  ),
};

const NYCCovidCareMetadata = {
  id: 'nyccovidcare',
  Organization: 'NYC Covid Care',
  Kind: RequestKinds.MENTALHEALTH,
  ZipCodes: [10001, 10002],
  // Called by the backend when a request is saved with
  // organization = 'manyc'
  DeliverRequest: async (backend, request) => {
    // Get the Webhook from the Database
    let url = await backend.getWebhookForOrg('nyccovidcare');

    // We actually need to send the request multiple times per child
    let payload = {};
    for (const field in FIELD_MAP) {
      payload[field] = FIELD_MAP[field](request);
    }

    payload.sheet = 'Fresh Requests';

    // Send the request
    await backend.postWebhook(url, payload);
  },
  // Called by the backend when MANYC pushes an update
  // about a request to our webhook
  HandleUpdate: (row) => {
    // If row is acknowledged, send an email/text to
    // the end user
  },
};

export default NYCCovidCareMetadata;
