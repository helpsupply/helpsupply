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

    additionalContactEmail: 'bob@bob.com',
    additionalContactFirstName: 'Bob',
    additionalContactLanguagePreference: 'Spanish',
    additionalContactLastName: 'Bobberson',
    additionalContactPhone: '111',
    additionalContactRelationship: 'Uncle Bob',

    crossStreet: 'a b',
    date: 'April 27, 2020',
    dietaryRestrictions: 'none',
    domain: 'ariaglassworks.com',
    groceryList: 'one two three',
    kind: 'grocery',
    neighborhood: 'Manhattan: East Village',
    organization: 'manyc',
    recurring: false,
    status: 'distributed',
    status_updated: 1587278146,
    time: 'evening',
    timeCreated: 1587278008948,
    urgency: 'later',
    user: 'hPoD6UgciHckILrm54wQRnkjtIH3',
    zip: '10002',
  };
  await MANYCMetadata.DeliverRequest(mock_backend, request, userInfo);

  console.log(JSON.stringify(payloads, null, 2));
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
