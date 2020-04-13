const RequestKinds = require('./kinds');

const MANYCMetadata = {
  id: 'manyc',
  Organization: 'Mutual Aid NYC',
  Kind: RequestKinds.GROCERY,
  ZipCodes: [10001, 10002],
  // We'll probably have default fields for a given Kind,
  // but for groups with specific needs we can specify
  // things fully custom
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
  // Called by the backend when a request is saved with
  // organization = 'manyc'
  DeliverRequest: (backend, request) => {
    // Get the Webhook from the Database
    // Map the request to the format they expect
    // Send the request
    // Ack that we've sent the request in our database
  },
  // Called by the backend when MANYC pushes an update
  // about a request to our webhook
  HandleUpdate: (row) => {
    // If row is acknowledged, send an email/text to
    // the end user
  },
};

export default MANYCMetadata;
