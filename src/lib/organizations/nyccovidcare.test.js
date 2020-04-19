const WorkersNeedChildcare = require('./nyccovidcare').default;

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

    additionalInfo: 'nope',
    agreement: true,
    date: 'wednesday',
    domain: 'ariaglassworks.com',
    kind: 'mentalhealth',
    organization: 'nyccovidcare',
    recurring: true,
    status: 'open',
    time: 'afternoon',
    timeCreated: 1587276683414,
    type: 'coach',
    urgency: 'soon',
    user: 'hPoD6UgciHckILrm54wQRnkjtIH3',
    zip: '10002',
  };
  await WorkersNeedChildcare.DeliverRequest(mock_backend, request, userInfo);

  console.log(payloads);
  expect(payloads.length).toBe(1);
  for (let key in payloads[0]) {
    let val = payloads[0][key];
    if (Array.isArray(val)) {
      val.map((v) => {
        expect(v).toBeDefined();
        return null;
      });
    }
    expect(val).toBeDefined();
  }
});
