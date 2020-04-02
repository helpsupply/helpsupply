const chatFlow = {
  greeting: {
    say: 'Hello!',
    collect: [
      {
        question: 'Hi! Are you a healthcare professional?',
        name: 'is_hcp',
        type: 'Twilio.YES_NO',
      },
    ],
    handler: async function (context, parsed_data, state) {
      if (parsed_data.is_hcp.answer == 'Yes') {
        return ['Got it', 'select_service'];
      }
      return ['Sorry, this number of for healthcare folks only'];
    },
    samples: ['hi', 'hello', 'sup', 'hey'],
  },
  dev: {
    say: 'I see you are devloper',
    collect: [
      {
        question: 'r u devleper?',
        name: 'is_dev',
        type: 'Twilio.YES_NO',
      },
    ],
    handler: async function (context, parsed_data, state) {
      state.counter = (state.counter || 0) + 1;
      return ['Nice! ' + context.user + '#' + state.counter];
    },
    samples: ['dev', 'test'],
  },
  select_service: {
    say: 'We can connect you with organization that provide many services',
    collect: [
      {
        question: 'What do you need?\n1.Groceries\n2.Mental Health',
        name: 'service_type',
      },
    ],
    handler: async function (context, parsed_data, state) {
      console.log(parsed_data);
      if (parsed_data.service_type.answer == '1') {
        return ['Thanks!', 'request_groceries'];
      } else if (parsed_data.service_type.answer == '2') {
        return ['Thanks!', 'request_mental_health'];
      }
      return ["I didn't get that, come again?", 'select_service'];
    },
  },
  request_groceries: {
    say: "Great, we're partnering with [SOME ORG] who can help",
    collect: [
      {
        question: 'Who are you shopping for (number of adults and children)?',
        name: 'people',
      },
      {
        question: 'Any dietary restrictions?',
        name: 'diet',
      },
    ],
    handler: async function (context, parsed_data, state) {
      state.grocery_request = {
        people: parsed_data.people,
        diet: parsed_data.diet,
      };
      return ["Thanks, we'll reach out in a bit when we've found a match"];
    },
  },
  request_mental_health: {
    say: "Great, we're partnering with [SOME ORG] who can help",
    collect: [
      {
        question: 'How many times a week would you like support?',
        name: 'frequency',
      },
      {
        question: 'How long would you like to spend with some per session?',
        name: 'duration',
      },
    ],
    handler: async function (context, parsed_data, state) {
      state.mental_health_request = {
        frequency: parsed_data.frequency,
        duration: parsed_data.duration,
      };
      return ["Thanks, we'll reach out in a bit when we've found a match"];
    },
  },
};

module.exports = {
  chatFlow: chatFlow,
};
