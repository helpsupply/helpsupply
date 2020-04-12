let chatFlow = require('./chatflow2').chatFlow;

test('Basic Chatflow Test', async () => {
  let state = await chatFlow.test([
    'hi', // Wake up the bot, it asks if you're a healthcare worker
    'yes', // Say yes, it'll ask what service type you want
    '1', // Select the first service
  ]);
  expect(state).toStrictEqual({ active_request: '1' });
});

test('Test Greeting', async () => {
  let [state, next] = await chatFlow.raw_handlers.greeting.test({}, 'yes');
  expect(next.name).toBe('select_service');

  [state, next] = await chatFlow.raw_handlers.greeting.test({}, 'no');
  expect(next).toBe(undefined);
});

test('Test Facility Lookup', async () => {
  let [state, next] = await chatFlow.raw_handlers.search_facility_by_zip.test(
    {},
    '14830',
  );
  console.log(state);
});

test('Test Email Verification', async () => {
  let [state, next] = await chatFlow.raw_handlers.collect_email.test(
    {},
    'test@example.com',
  );
  expect(next.name).toBe('get_confirmation_code');

  [state, next] = await chatFlow.raw_handlers.get_confirmation_code.test(
    state,
    state.confirmation_code,
  );
  expect(state.confirmed).toBe(true);
});

test('Test Email Verification Failure', async () => {
  let [state, next] = await chatFlow.raw_handlers.collect_email.test(
    {},
    'test@example.com',
  );
  expect(next.name).toBe('get_confirmation_code');

  [state, next] = await chatFlow.raw_handlers.get_confirmation_code.test(
    state,
    '00000',
  );
  expect(next.name).toBe('get_confirmation_code');
  expect(state.confirmed).toBe(undefined);

  [state, next] = await chatFlow.raw_handlers.get_confirmation_code.test(
    state,
    '00000',
  );
  expect(next.name).toBe('get_confirmation_code');
  expect(state.confirmed).toBe(undefined);

  [state, next] = await chatFlow.raw_handlers.get_confirmation_code.test(
    state,
    '00000',
  );
  expect(next).toBe(undefined);
  expect(state.confirmed).toBe(undefined);
});
