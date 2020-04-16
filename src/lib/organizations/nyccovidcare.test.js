const WorkersNeedChildcare = require('./nyccovidcare').default;

test('Request Mapping', () => {
  let payloads = [];
  let mock_backend = {
    getWebhookForOrg: (org) => {
      return 'test';
    },
    postWebhook: (url, data) => {
      payloads.push(data);
    },
  };

  let request = {
    id: 'ABCDEFG',

    first_name: 'John',
    last_name: 'Smith',
    email: 'test@test.com',
    phone: '555-555-5555',
    zip_code: '00000',
    preferred_contact: 'PHONE',
    urgency: 'FEW_DAYS',
    language_preference: 'Spanish',

    day: 'Monday',
    time: 'Afternoon',
    recurring: true,

    volunteer_type: 'Life Coach',

    other_notes: 'i love cookies',
  };
  WorkersNeedChildcare.DeliverRequest(mock_backend, request);

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
