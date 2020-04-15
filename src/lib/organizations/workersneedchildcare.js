const RequestKinds = require('./kinds');

function get_field(name) {
  return (request) => {
    return request[name];
  };
}

function get_field_wrap_array(name) {
  return (request) => {
    return [request[name]];
  };
}

const FIELD_MAP = {
  Phone: get_field('phone'),

  'Parent First Name': get_field('first_name'),
  'Parent Last Name': get_field('last_name'),
  'Parent Email': get_field('email'),
  'Zip Code': get_field('zip_code'),
  'What neighborhoods are you open to having childcare?': get_field(
    'neighborhoods',
  ),
  'How do you want us to contact you?': (request) => {
    return {
      PHONE: ['Phone'],
      EMAIL: ['Email'],
      EITHER: ['Either'],
    }[request.preferred_contact];
  },
  'How soon do you need assistance?': function (request) {
    return {
      IMMEDIATELY: "Immediately, I'm in crisis",
      FEW_DAYS: 'In the next few days',
      SOON: "I'm okay for now, but am worried I won't be soon",
    }[request.urgency];
  },

  'What days do you need childcare?': get_field_wrap_array('day'),
  'What times do you need childcare?': get_field_wrap_array('time'),

  "Child's First Name": get_field('child_first_name'),
  "Child's Last Name": get_field('child_last_name'),
  "Child's Birth Year": get_field('child_birth_year'),

  'What childcare options are you interested in?': function (request) {
    return request.childcare_types.map(
      (t) =>
        ({
          CENTERS: 'Childcare centers - free and paid',
          DOE: 'DOE Regional Enrichment Centers (for essential workers only)',
          MUTUALAID: 'Mutual aid networks (free, volunteer childcare)',
          FREE: 'Only free options',
          BABYSITTERS: 'Babysitters - free and paid',
        }[t]),
    );
  },
  "If you're interested in low-cost options, please share how much you're able to pay:": get_field(
    'payment',
  ),
  'Is anyone in your household at higher risk of sever illness due to COVID-19?': function (
    request,
  ) {
    return {
      YES: 'Yes',
      NO: 'No',
      DONTKNOW: "I don't know",
    }[request.at_risk];
  },

  'Please share anything else you think we should know!': function (request) {
    return `
This is a request from help.supply.

Special Needs:
${request.child_special_needs}

Recurring? ${request.recurring ? 'Yes' : 'No'}

Language Preference? ${request.language_preference}

Other Notes:
${request.other_notes}

Reference ID:
https://help.supply/r/${request.id}
`;
  },
};

const WorkersNeedChildcareMetadata = {
  id: 'workersneedchildcare',
  Organization: 'Workers Need Childcare NYC',
  Kind: RequestKinds.GROCERY,
  ZipCodes: [10001, 10002],
  // Called by the backend when a request is saved with
  // organization = 'manyc'
  DeliverRequest: (backend, request) => {
    // Get the Webhook from the Database
    let url = backend.getWebhookForOrg('workersneedchildcare');

    // We actually need to send the request multiple times per child
    let payload = {};
    for (const field in FIELD_MAP) {
      payload[field] = FIELD_MAP[field](request);
    }

    // Send the request
    backend.postWebhook(url, payload);
  },
  // Called by the backend when MANYC pushes an update
  // about a request to our webhook
  HandleUpdate: (row) => {
    // If row is acknowledged, send an email/text to
    // the end user
  },
};

export default WorkersNeedChildcareMetadata;
