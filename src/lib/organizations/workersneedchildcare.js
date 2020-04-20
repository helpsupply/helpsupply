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

function get_multi_select(keys, values) {
  return (request) => {
    let out = [];
    keys.map((k, i) => {
      if (request[k] === true) out.push(values[i]);
      return null;
    });
    return out;
  };
}

function always(resp) {
  return (request) => {
    return resp;
  };
}

const FIELD_MAP = {
  Phone: get_user_field('phone'),

  'Parent First Name': get_user_field('firstName'),
  'Parent Last Name': get_user_field('lastName'),
  'Parent Email': get_user_field('email'),

  'Zip Code': get_field('zip'),
  'What neighborhoods are you open to having childcare?': (request) => {
    return [request.neighborhood];
  },

  'How do you want us to contact you?': (request, user) => {
    return {
      phone: ['Phone'],
      email: ['Email'],
    }[user.contactPreference];
  },
  'How soon do you need assistance?': function (request) {
    return {
      immediate: "Immediately, I'm in crisis",
      soon: 'In the next few days',
      later: "I'm okay for now, but am worried I won't be soon",
    }[request.urgency];
  },

  'What days do you need childcare?': get_multi_select(
    [
      'mondays',
      'tuesdays',
      'wednesdays',
      'thursdays',
      'fridays',
      'saturdays',
      'sundays',
      'varies',
    ],
    [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
      'It varies week-to-week',
    ],
  ),
  'What times do you need childcare?': get_multi_select(
    ['mornings', 'afternoons', 'evenings', 'night', 'variesTime'],
    ['Mornings ', 'Afternoons', 'Evenings', 'Night', 'It varies week to week'],
  ),

  "Child's Birth Year": get_field('birthYear'),
  'Child’s Birth Month': (request) => {
    return (
      request.birthMonth.slice(0, 1).toUpperCase() + request.birthMonth.slice(1)
    );
  },

  'What childcare options are you interested in?': get_multi_select(
    [
      'childCareCenters',
      'enrichmentCenters',
      'mutualAid',
      'freeOptions',
      'babySitters',
    ],
    [
      'Childcare centers - free and paid',
      'DOE Regional Enrichment Centers (for essential workers only)',
      'Mutual aid networks (free, volunteer childcare)',
      'Only free options',
      'Babysitters - free and paid',
    ],
  ),
  "If you're interested in low-cost options, please share how much you're able to pay:": get_field(
    'paymentAbility',
  ),
  'Is anyone in your household at higher risk of sever illness due to COVID-19?': function (
    request,
  ) {
    return {
      yes: 'Yes',
      no: 'No',
    }[request.householdRisk];
  },

  'Please share anything else you think we should know!': function (
    request,
    user,
  ) {
    return `
This is a request from help.supply.

Special Needs:
${request.specialNeeds}

Language Preference? ${user.languagePreference}

Other Notes:
${request.additionalInfo}

Reference ID:
https://help.supply/r/${request.id}
`;
  },
};

const WorkersNeedChildcareMetadata = {
  id: 'workersneedchildcare',
  Organization: 'Workers Need Childcare NYC',
  Kind: RequestKinds.CHILDCARE,
  ZipCodes: [10001, 10002],
  // Called by the backend when a request is saved with
  // organization = 'manyc'
  DeliverRequest: async (backend, request, user) => {
    // Get the Webhook from the Database
    let url = await backend.getWebhookForOrg('workersneedchildcare');

    // We actually need to send the request multiple times per child

    for (var key in request.children) {
      request.birthMonth = request.children[key].birthMonth;
      request.birthYear = request.children[key].birthYear;
      request.specialNeeds = request.children[key].specialNeeds;

      let payload = {};
      for (const field in FIELD_MAP) {
        payload[field] = FIELD_MAP[field](request, user);
      }

      // Send the request
      await backend.postWebhook(url, payload);
    }
  },
  // Called by the backend when MANYC pushes an update
  // about a request to our webhook
  HandleUpdate: (row) => {
    // If row is acknowledged, send an email/text to
    // the end user
  },
};

export default WorkersNeedChildcareMetadata;
