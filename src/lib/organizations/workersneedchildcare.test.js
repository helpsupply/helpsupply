const WorkersNeedChildcare = require('./workersneedchildcare').default;

test('Request Mapping', async () => {
  let payloads = [];
  let mock_backend = {
    getWebhookForOrg: async (org) => {
      return 'test';
    },
    postWebhook: async (url, data) => {
      payloads.push(data);
    },
  };

  let userInfo = {
    contactPreference: 'email',
    firstName: 'Ben',
    languagePreference: 'english',
    lastName: 'Newhouse',
    phone: '5555555555',
    email: 'test@test.com',
  };

  let request = {
    id: 'ABCDEFG',

    additionalInfo: 'nothing',
    afternoons: true,
    babySitters: true,
    childCareCenters: true,
    children: {
      '1': {
        birthMonth: 'march',
        birthYear: '2016',
        specialNeeds: 'hi',
      },
      '2': {
        birthMonth: 'may',
        birthYear: '2014',
        specialNeeds: 'nope',
      },
    },
    crossStreet: 'a b',
    domain: 'ariaglassworks.com',
    enrichmentCenters: true,
    error: 'unknown provider: placeholder',
    evenings: true,
    freeOptions: true,
    fridays: true,
    householdRisk: 'no',
    kind: 'childcare',
    mondays: true,
    mornings: true,
    mutualAid: true,
    neighborhood: 'brighton-beach',
    nights: true,
    organization: 'placeholder',
    paymentAbility: '333',
    saturdays: true,
    status: 'error',
    status_updated: 1587261026,
    sundays: true,
    thursdays: true,
    timeCreated: 1587260966110,
    tuesdays: true,
    urgency: 'soon',
    user: 'hPoD6UgciHckILrm54wQRnkjtIH3',
    varies: true,
    variesTime: true,
    wednesdays: true,

    // Not integrated yet
    zip: '00000',
    neighborhoods: ['Manhattan: Central Harlem'],
  };

  await WorkersNeedChildcare.DeliverRequest(mock_backend, request, userInfo);

  // console.log(payloads);
  expect(payloads.length).toBe(2);
  for (var i = 0; i < 2; i++) {
    for (let key in payloads[i]) {
      let val = payloads[i][key];
      if (Array.isArray(val)) {
        val.map((v) => {
          expect(v).toBeDefined();
          return null;
        });
      }
      expect(val).toBeDefined();
    }
  }
});
