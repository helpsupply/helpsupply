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
      phone: ['Phone call'],
      email: ['Email'],
    }[user.contactPreference];
  },
  'How soon do you need assistance?': function (request) {
    return {
      immediate: "Immediately, I'm in crisis",
      soon: 'In the next few days',
      later: "I'm okay for now, but am worried that I won't be soon",
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

Additional Contact (if provided):
${request.additionalContactFirstName || ''} ${
      request.additionalContactLastName || ''
    }
${request.additionalContactRelationship || ''}
${request.additionalContactEmail || ''}
${request.additionalContactPhone || ''}
${request.additionalContactLanguagePreference || ''}

Reference ID:
https://help.supply/r/${request.id}
`;
  },
};

const WorkersNeedChildcareMetadata = {
  id: 'workersneedchildcare',
  Organization: 'Workers Need Childcare NYC',
  Website: 'www.workersneedchildcare.org',
  Email: 'hello@workersneedchildcare.org',
  Kind: RequestKinds.CHILDCARE,
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
