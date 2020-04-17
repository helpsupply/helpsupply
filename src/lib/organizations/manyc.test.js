const MANYCMetadata = require('./manyc').default;

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
    cross_streets: '1st and mission',
    borough_name: 'Manhattan',
    neighborhood_name: 'Central Harlem South',
    preferred_contact: 'TEXT',
    urgency: 'FEW_DAYS',
    language_preference: 'Spanish',

    delivery_day: '4/17',
    delivery_window: 'morning',
    recurring: false,
    grocery_list: 'pen, pinapple, apple, pen',
    dietary_restrictions: 'none',
    other_notes: 'i love cookies',
  };
  await MANYCMetadata.DeliverRequest(mock_backend, request);

  expect(payloads.length).toBe(1);
  for (let key in payloads[0].manyc) {
    let val = payloads[0].manyc[key];
    if (Array.isArray(val)) {
      val.map((v) => {
        expect(v).toBeDefined();
        return null;
      });
    }
    expect(val).toBeDefined();
  }
});
