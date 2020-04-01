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
    handler: function (parsed_data, state) {
      if (parsed_data.is_hcp.answer == 'Yes') {
        return [state, 'Got it', 'select_service'];
      }
      return [state, 'Sorry, this number of for healthcare folks only'];
    },
    samples: ['hi', 'hello', 'sup', 'hey'],
  },
  select_service: {
    say: 'We can connect you with organization that provide many services',
    collect: [
      {
        question: 'What do you need?\n1.Groceries\n2.Mental Health',
        name: 'service_type',
      },
    ],
    handler: function (parsed_data, state) {
      console.log(parsed_data);
      if (parsed_data.service_type.answer == '1') {
        return [state, 'Thanks!', 'request_groceries'];
      } else if (parsed_data.service_type.answer == '2') {
        return [state, 'Thanks!', 'request_mental_health'];
      }
      return [state, "I didn't get that, come again?", 'select_service'];
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
    handler: function (parsed_data, state) {
      state.grocery_request = {
        people: parsed_data.people,
        diet: parsed_data.diet,
      };
      return [
        state,
        "Thanks, we'll reach out in a bit when we've found a match",
      ];
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
    handler: function (parsed_data, state) {
      state.mental_health_request = {
        frequency: parsed_data.frequency,
        duration: parsed_data.duration,
      };
      return [
        state,
        "Thanks, we'll reach out in a bit when we've found a match",
      ];
    },
  },
};

module.exports = {
  chatFlow: chatFlow,
};
