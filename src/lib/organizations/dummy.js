const RequestKinds = require('./kinds');

const DummyMetadata = {
  id: 'testOrg',
  Organization: 'test org NYC',
  Kind: RequestKinds.GROCERY,
  ZipCodes: [11238, 11222],
  Fields: [
    {
      id: 'first_name',
      label: 'First Name',
    },
    {
      id: 'last_name',
      label: 'Phone',
    },
    {
      id: 'email',
      label: 'Email',
    },
    {
      id: 'urgency',
      label: 'How soon do you need support?',
      choices: [
        {
          name: 'Immediately',
          value: 1,
        },
        {
          name: 'In the next few days',
          value: 2,
        },
        {
          name: 'Sometime soon',
          value: 3,
        },
      ],
    },
  ],
  DeliverRequest: (backend, request) => {},
  HandleUpdate: (row) => {},
};

export default DummyMetadata;
