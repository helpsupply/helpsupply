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

const OUR_FIELD_MAP = {
  'First Name': get_user_field('firstName'),
  'Last Name': get_user_field('lastName'),

  'How soon do you need support?': (request) => {
    return {
      immediate: "Immediately, I'm in crisis",
      soon: 'In the next few days',
      later: "I'm okay for now, but am worried that I won't be soon",
    }[request.urgency];
  },

  Cell: get_user_field('phone'),
  Email: get_user_field('email'),

  'Which of these ways are best to get in touch with you?': (request, user) => {
    return {
      email: ['Email'], // TODO: Validate
      phone: ['Phone call'],
    }[user.contactPreference];
  },

  "Language Access: is your primary language something other than English, for which you'd need translation & interpretation support to connect to volunteers?": (
    request,
    user,
  ) => {
    switch (user.languagePreference) {
      case 'english':
        return null;
      case 'mandarin':
        return 'Chinese: Mandarin';
      case 'cantonese':
        return 'Chinese: Cantonese';
      case 'russian':
        return 'Russian';
      case 'haitian-creole':
        return 'Haitian Kreyol';
      case 'bengali':
        return 'Bengali';
      case 'yiddish':
        return 'Yiddish';
      case 'french':
        return 'French';
      case 'italian':
        return 'Italian';
      case 'korean':
        return 'Korean';
      case 'arabic':
        return 'Arabic';
      case 'polish':
        return 'Polish';
      case 'tagalog':
        return 'Tagalog';
      case 'asl':
        return 'ASL';
      default:
        return null;
    }
  },

  'What type(s) of support are you seeking?': always([
    'Deliver groceries or supplies to me',
  ]),
  'Zip Code': (request) => {
    return parseInt(request.zip);
  },
  'Cross Streets': get_field('crossStreet'),
  'What borough/region are you in?': (request) => {
    return request.neighborhood.split(':')[0];
  },
  'What neighborhood?': (request) => {
    return [request.neighborhood];
  },
  'Are you, or anyone in your household in one or more of these hardest-hit groups? Please select all that apply.': always(
    ['Healthcare workers'],
  ),
  'Anything else you want to share about your situation at this time?': (
    request,
  ) => {
    return `
This is a request from help.supply.

Delivery Preference:
- ${request.date}
- ${request.time}

Grocery List:
${request.groceryList}

Dietary Restrictions:
${request.dietaryRestrictions}

Other Info:
${request.additionalInfo}

Request ID: https://help.supply/r/${request.id}
`;
  },
};

OUR_FIELD_MAP.unused = true;

const FIELD_MAP = {
  source: always('help.supply'),
  sourceID: get_field('id'),

  supportType: always(['Deliver groceries or supplies to me']),
  otherSupport: always(''),

  community: always(['Healthcare workers']),

  language: (request, user) => {
    switch (user.languagePreference) {
      case 'english':
        return null;
      case 'mandarin':
        return 'Chinese (Mandarin): 简体中文 / 繁體中文';
      case 'cantonese':
        return 'Cantonese: 廣東話';
      case 'russian':
        return 'Russian: русский';
      case 'haitian-creole':
        return 'Haitian Creole: kreyòl ayisyen';
      case 'bengali':
        return 'Bengali: বাঙালি';
      case 'yiddish':
        return 'Yiddish: אידיש';
      case 'french':
        return 'French: français';
      case 'italian':
        return 'Italian: italiano';
      case 'korean':
        return 'Korean: 한국어';
      case 'arabic':
        return 'Arabic: اللغة العربية';
      case 'polish':
        return 'Polish: polski';
      case 'tagalog':
        return 'Tagalog';
      case 'asl':
        return 'American Sign Language';
      default:
        return null;
    }
  },
  languageOther: always(''),

  neighborhood: get_field('neighborhood'),

  zip: get_field('zip'),
  phone: get_user_field('phone'),
  email: get_user_field('email'),

  firstName: get_user_field('firstName'),
  lastName: (request) => {
    return request.lastName ? request.lastName.slice(0, 1) : '';
  },

  urgency: (request) => {
    return {
      immediate: 'As soon as possible (1 - 3 Days)',
      soon: 'In the next few days (3 - 5 Days)',
      later: 'Soon (5 - 7+ Days)',
    }[request.urgency];
  },

  contactMethod: (request, user) => {
    return {
      email: ['Email'],
      phone: ['Phone call'],
    }[user.contactPreference];
  },

  crossStreet: get_field('crossStreet'),
  timestampCreated: get_field('timeCreated'),
  notes: (request) => {
    return `
This is a request from help.supply.

Delivery Preference:
- ${request.date}
- ${request.time}

Grocery List:
${request.groceryList}

Dietary Restrictions:
${request.dietaryRestrictions}

Additional Contact (if provided):
${request.additionalContactFirstName || ''} ${
      request.additionalContactLastName || ''
    }
${request.additionalContactRelationship || ''}
${request.additionalContactEmail || ''}
${request.additionalContactPhone || ''}
${request.additionalContactLanguagePreference || ''}

Other Info:
${request.additionalInfo}


Request ID: https://help.supply/r/${request.id}
`;
  },
};

const MANYCMetadata = {
  id: 'manyc',
  Organization: 'Mutual Aid NYC',
  Kind: RequestKinds.GROCERY,
  ZipCodes: [
    '11697',
    '11694',
    '11693',
    '11692',
    '11691',
    '11451',
    '11436',
    '11435',
    '11434',
    '11433',
    '11432',
    '11430',
    '11429',
    '11428',
    '11427',
    '11426',
    '11423',
    '11422',
    '11421',
    '11420',
    '11419',
    '11418',
    '11417',
    '11416',
    '11415',
    '11414',
    '11413',
    '11412',
    '11411',
    '11385',
    '11379',
    '11378',
    '11377',
    '11375',
    '11374',
    '11373',
    '11372',
    '11371',
    '11370',
    '11369',
    '11368',
    '11367',
    '11366',
    '11365',
    '11364',
    '11363',
    '11362',
    '11361',
    '11360',
    '11359',
    '11358',
    '11357',
    '11356',
    '11355',
    '11354',
    '11251',
    '11249',
    '11239',
    '11238',
    '11237',
    '11236',
    '11235',
    '11234',
    '11233',
    '11232',
    '11231',
    '11230',
    '11229',
    '11228',
    '11226',
    '11225',
    '11224',
    '11223',
    '11222',
    '11221',
    '11220',
    '11219',
    '11218',
    '11217',
    '11216',
    '11215',
    '11214',
    '11213',
    '11212',
    '11211',
    '11210',
    '11209',
    '11208',
    '11207',
    '11206',
    '11205',
    '11204',
    '11203',
    '11201',
    '11109',
    '11106',
    '11105',
    '11104',
    '11103',
    '11102',
    '11101',
    '11096',
    '11040',
    '11005',
    '11004',
    '11001',
    '10475',
    '10474',
    '10473',
    '10472',
    '10471',
    '10470',
    '10469',
    '10468',
    '10467',
    '10466',
    '10465',
    '10464',
    '10463',
    '10462',
    '10461',
    '10460',
    '10459',
    '10458',
    '10457',
    '10456',
    '10455',
    '10454',
    '10453',
    '10452',
    '10451',
    '10314',
    '10312',
    '10310',
    '10309',
    '10308',
    '10307',
    '10306',
    '10305',
    '10304',
    '10303',
    '10302',
    '10301',
    '10286',
    '10285',
    '10282',
    '10281',
    '10280',
    '10279',
    '10278',
    '10275',
    '10271',
    '10270',
    '10265',
    '10260',
    '10259',
    '10203',
    '10196',
    '10178',
    '10177',
    '10176',
    '10175',
    '10174',
    '10173',
    '10172',
    '10171',
    '10170',
    '10169',
    '10168',
    '10167',
    '10166',
    '10165',
    '10162',
    '10158',
    '10155',
    '10154',
    '10153',
    '10152',
    '10151',
    '10128',
    '10123',
    '10122',
    '10121',
    '10120',
    '10119',
    '10118',
    '10115',
    '10112',
    '10111',
    '10110',
    '10107',
    '10106',
    '10105',
    '10104',
    '10103',
    '10097',
    '10096',
    '10081',
    '10080',
    '10075',
    '10069',
    '10065',
    '10055',
    '10048',
    '10047',
    '10045',
    '10044',
    '10043',
    '10041',
    '10040',
    '10039',
    '10038',
    '10037',
    '10036',
    '10035',
    '10034',
    '10033',
    '10032',
    '10031',
    '10030',
    '10029',
    '10028',
    '10027',
    '10026',
    '10025',
    '10024',
    '10023',
    '10022',
    '10021',
    '10020',
    '10019',
    '10018',
    '10017',
    '10016',
    '10014',
    '10013',
    '10012',
    '10011',
    '10010',
    '10009',
    '10007',
    '10006',
    '10005',
    '10004',
    '10003',
    '10002',
    '10001',
    '00083',
  ],
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
    //await backend.postWebhook(url, payload);
  },
  // Called by the backend when MANYC pushes an update
  // about a request to our webhook
  HandleUpdate: (row) => {
    // If row is acknowledged, send an email/text to
    // the end user
  },
};

export default MANYCMetadata;
