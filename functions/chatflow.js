const hospital_index = require('./chatbot/hospital_index');
const tools = require('./chatbot/helperFunctions');

const chatFlow = {
  greeting: {
    collect: [
      {
        question:
          'Hi! Welcome to Help Supply. We’re here to help Healthcare Professionals easily connect with services that make their lives easier during COVID-19. Are you a healthcare professional looking for some help?',
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

  select_service: {
    collect: [
      {
        question: 'What do you need?\r\n1.Groceries\r\n2.Mental Health',
        name: 'service_type',
      },
    ],
    handler: async function (context, parsed_data, state) {
      switch (parsed_data.service_type.answer) {
        case '1':
          state.active_request = 'request_groceries';
          break;
        case '2':
          state.active_request = 'request_mental_health';
          break;
      }
      return [
        "Great, we can help you with that. First we need to confirm you're a healthcare professional.",
        'find_facility',
      ];
    },
  },

  find_facility: {
    collect: [
      {
        question:
          "We're currently servicing select hospital networks, select which you are a part of:\r\n1. NYU\r\n2. Cornell\r\n3. Other",
        name: 'hospital',
        type: 'Twilio.NUMBER_SEQUENCE',
      },
    ],
    handler: async function (context, parsed_data, state) {
      switch (parsed_data.hospital.answer) {
        case '1':
          state.network = 'nyu';
          return ['Thanks.', 'verify_email'];
        case '2':
          state.network = 'cornell';
          return ['Thanks.', 'verify_email'];
        case '3':
          return ["Sorry, we aren't servicing your hospital yet."];
        default:
          return ["I didn't catch that, come again?", 'find_facility'];
      }
    },
  },

  verify_email: {
    collect: [
      {
        question:
          "What is your work email, we'll send you an email to confirm your affiliation",
        name: 'email',
      },
    ],
    handler: async function (context, parsed_data, state) {
      context.verify_email(parsed_data.email.answer);
      return [
        "Thanks, please check your email! Your request won't be live until you click the enclosed link. Let's continue...",
        state.active_request,
      ];
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
