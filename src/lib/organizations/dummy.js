const RequestKinds = require('./kinds');

const DummyMetadata = {
  id: 'dummy',
  Organization: 'Test Dummy Organization',
  Kind: RequestKinds.GROCERY,
  ZipCodes: [0],

  DeliverRequest: async (backend, request) => {
    let url = await backend.getWebhookForOrg('dummy');
    await backend.postWebhook(url, { list: request.list });
  },

  HandleUpdate: async (row) => {},
};

export default DummyMetadata;
