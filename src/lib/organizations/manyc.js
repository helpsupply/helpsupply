const RequestKinds = require('./kinds');

function get_field(name) {
  return (request) => {
    return request[name];
  };
}

function get_user_field(name) {
  return (request, user) => {
    return user[name];
  };
}

function always(resp) {
  return (request) => {
    return resp;
  };
}

const FIELD_MAP = {
  source: always('help.supply'),
  sourceID: get_field('id'),

  supportType: always(['Deliver groceries or supplies to me']),
  otherSupport: always(''),

  community: always(['Healthcare workers']),

  language: get_user_field('languagePreference'), // TODO: map/validate
  languageOther: always(''),

  neighborhood: get_field('neighborhood'),

  zip: get_field('zip'),
  phone: get_user_field('phone'),
  email: get_user_field('email'),

  firstName: get_user_field('firstName'),
  lastName: get_user_field('lastName'),

  urgency: (request) => {
    return {
      immediate: "Immediately, I'm in crisis",
      soon: 'In the next few days',
      later: "I'm okay for now, but am worried that I won't be soon",
    }[request.urgency];
  },

  contactMethod: (request, user) => {
    return {
      email: ['Email'], // TODO: Validate
      phone: ['Phone Call'],
    }[user.contactPreference];
  },

  crossStreet: get_field('crossStreet'),
  timestampCreated: get_field('timeCreated'),
  notes: (request) => {
    return `
This is a request from help.supply.

Delivery Preference:
- ${request.delivery_day}
- ${request.time}

Grocery List:
${request.groceryList}

Dietary Restrictions:
${request.dietaryRestrictions}

Other Info:
${request.additionalInfo}
`;
  },
};

const MANYCMetadata = {
  id: 'manyc',
  Organization: 'Mutual Aid NYC',
  Kind: RequestKinds.GROCERY,
  ZipCodes: [10001, 10002],
  // Called by the backend when a request is saved with
  // organization = 'manyc'
  DeliverRequest: async (backend, request, user) => {
    // Get the Webhook from the Database
    let url = await backend.getWebhookForOrg('manyc');

    let payload = {};
    for (const field in FIELD_MAP) {
      payload[field] = FIELD_MAP[field](request, user);
    }

    // Send the request
    await backend.postWebhook(url, { manyc: payload });
  },
  // Called by the backend when MANYC pushes an update
  // about a request to our webhook
  HandleUpdate: (row) => {
    // If row is acknowledged, send an email/text to
    // the end user
  },
};

export default MANYCMetadata;
