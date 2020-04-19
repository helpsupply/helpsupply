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

function get_user_field(name) {
  return (request, user) => {
    return user[name];
  };
}

const FIELD_MAP = {
  'Submitted On': (request) => '' + new Date(),
  Name: (request, user) => {
    return user.firstName + ' ' + user.lastName;
  },
  Email: get_user_field('email'),
  Phone: get_user_field('phone'),
  'Whats your preferred form of contact': (request, user) => {
    return {
      phone: ['Phone'],
      email: ['Email'],
    }[user.contactPreference];
  },
  'When is a good time to reach you Check all that apply': (request) =>
    request.date + ' ' + request.time,
  'What kind of volunteer would you be most interested in speaking with': (
    request,
  ) => {
    return {
      licensed: 'Licensed Mental Health Professional',
      spiritual: 'Spiritual Care Provider',
      coach: 'Personal/Life Coach',
      stress: 'Stress-Reduction Expert',
      healing: 'Healing Arts Practitioner',
      any: "I don't have a preference",
    }[request.type];
  },
  'Anything else about your identity or situation that you would like us to know': (
    request,
    user,
  ) => {
    return `
This is a request from Help Supply

Recurring? ${request.recurring ? 'Yes' : 'No'}
Language Preference? ${user.languagePreference}
Urgency? ${
      {
        immediate: "Immediately, I'm in crisis",
        soon: 'In the next few days',
        later: "I'm okay for now, but am worried I won't be soon",
      }[request.urgency]
    }

Other Notes:
${request.additionalInfo}

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
  DeliverRequest: async (backend, request, user) => {
    // Get the Webhook from the Database
    let url = await backend.getWebhookForOrg('nyccovidcare');

    // We actually need to send the request multiple times per child
    let payload = {};
    for (const field in FIELD_MAP) {
      payload[field] = FIELD_MAP[field](request, user);
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
