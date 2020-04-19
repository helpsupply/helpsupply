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
  source: always('help.supply'),
  sourceID: get_field('id'),

  supportType: always(['Deliver groceries or supplies to me']),
  otherSupport: always(''),

  community: always(['Healthcare workers']),

  language: get_field('language_preference'), // TODO: map/validate
  languageOther: always(''),

  neighborhood: (request) => {
    return [request.borough_name + ': ' + request.neighborhood_name];
  },

  zip: get_field('zip_code'),
  phone: get_field('phone'),
  email: get_field('email'),

  firstName: get_field('first_name'),
  lastName: get_field('last_name'),

  urgency: (request) => {
    return {
      IMMEDIATELY: "Immediately, I'm in crisis",
      FEW_DAYS: 'In the next few days',
      SOON: "I'm okay for now, but am worried that I won't be soon",
    }[request.urgency];
  },

  contactMethod: (request) => {
    return {
      TEXT: ['Text message'],
      CALL: ['Phone Call'],
      EMAIL: ['Email'],
    }[request.preferred_contact];
  },

  crossStreet: get_field('cross_streets'),
  timestampCreated: (request) => {
    return '0';
  },

  notes: (request) => {
    return `
This is a request from help.supply.

Delivery Preference:
- ${request.delivery_day}
- ${request.delivery_window}

Grocery List:
${request.grocery_list}

Dietary Restrictions:
${request.dietary_restrictions}

Other Info:
${request.other_notes}
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
