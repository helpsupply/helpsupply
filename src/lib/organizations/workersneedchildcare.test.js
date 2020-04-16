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

  let request = {
    id: 'ABCDEFG',

    phone: '555-555-5555',
    email: 'test@test.com',
    first_name: 'John',
    last_name: 'Smith',
    zip_code: '00000',
    neighborhoods: ['Manhattan: Central Harlem'],
    preferred_contact: 'PHONE',
    urgency: 'FEW_DAYS',
    language_preference: 'Spanish', // not standard

    // Childcare Specific
    day: 'Monday',
    time: 'Afternoon',
    recurring: true, // not standard

    child_first_name: 'Mini',
    child_last_name: 'Me',
    child_birth_year: '2000',
    child_special_needs: 'none', // not standard

    childcare_types: ['BABYSITTERS'],
    payment: '$0',
    at_risk: 'DONTKNOW',

    other_notes: 'i love cookies',
  };
  await WorkersNeedChildcare.DeliverRequest(mock_backend, request);

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
