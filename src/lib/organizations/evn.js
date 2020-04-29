const RequestKinds = require('./kinds');

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
  Timestamp: (request) => '' + new Date(),
  'Name : ': (request, user) => {
    return user.firstName + ' ' + user.lastName;
  },
  'Email:': get_user_field('email'),
  'Phone ': get_user_field('phone'),
  'Please check off what you need:': always(
    "Grocery or other Shopping / Delivery (we'll be in touch to find out what you need)",
  ), // TODO: Fill in real string
  'Do you need a translator?': (request, user) => {
    if (user.languagePreference === 'english') {
      return 'No';
    }
    return 'Yes';
  },
  'If yes, what language?': (request, user) => {
    if (user.languagePreference === 'english') {
      return '';
    }
    return user.languagePreference;
  },
  'When your request is needed by:': (request) => {
    return {
      immediate: 'As soon as possible (1 - 3 Days)',
      soon: 'In the next few days (3 - 5 Days)',
      later: 'Soon (5 - 7+ Days)',
    }[request.urgency];
  },
  'Would you like to stay in touch with us to receive updates and current information?': always(
    'No',
  ),
  'Zip Code & Cross Streets': (request) => {
    return request.zip + ' ' + request.crossStreet;
  },
  'If you need groceries or items bought for you, how would you like to pay?   (Please note:  If you are not feeling well/experiencing COVID-19 symptoms, please do NOT give cash to the volunteer. Venmo is the easiest alternative.)': always(
    'Have the volunteer pay and reimburse them when they bring items to you',
  ),
  'Comments/Other': (request, user) => {
    return `
This is a request from help.supply.

Delivery Preference:
- ${request.date}
- ${request.time}

Grocery List:
${request.groceryList}

Dietary Restrictions:
${request.dietaryRestrictions}

Contact Preference (phone/email)? ${user.contactPreference}
Recurring? ${request.recurring ? 'Yes' : 'No'}

Additional Contact (if provided):
${request.additionalContactFirstName || ''} ${
      request.additionalContactLastName || ''
    }
${request.additionalContactRelationship || ''}
${request.additionalContactEmail || ''}
${request.additionalContactPhone || ''}
${request.additionalContactLanguagePreference || ''}

Other Notes:
${request.additionalInfo}

Reference ID:
https://help.supply/r/${request.id}
	  `;
  },
};

const EastVillageNeighborsMetadata = {
  id: 'evn',
  Organization: 'East Village Neighbors',
  Website: 'https://www.facebook.com/groups/eastvillageneighbors/',
  Email: 'EastVillageNeighbors@gmail.com',
  Kind: RequestKinds.GROCERY,
  ZipCodes: [
    11111,
    /*'10009', '10003', '10002'*/
  ],
  DeliverRequest: async (backend, request, user) => {
    let url = await backend.getWebhookForOrg('evn');

    let payload = {};
    for (const field in FIELD_MAP) {
      payload[field] = FIELD_MAP[field](request, user);
    }

    payload.sheet = 'Fresh Requests';
    await backend.postWebhook(url, payload);
  },
  // Called by the backend when MANYC pushes an update
  // about a request to our webhook
  HandleUpdate: (row) => {
    // If row is acknowledged, send an email/text to
    // the end user
  },
};

export default EastVillageNeighborsMetadata;
