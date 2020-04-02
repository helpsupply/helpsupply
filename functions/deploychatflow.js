/*
 * This is a script that creates the requisite JSON file to define a Twilio autopilot chatbot,
 * it pulls from chatflow.js which has inline handlers (which are not sent to Twilio but run in
 * firebase functions).
 *
 * node deploychatflow.js
 *
 * Note: you'll need the twilio-cli with the right plugins:
 *
 * npm install -g twilio-cli
 * twilio login (or whatever it is)
 * twilio plugins:install @dabblelab/plugin-autopilot
 *
 */
const fs = require('fs');
const { exec } = require('child_process');
const chatFlow = require('./chatflow').chatFlow;
console.log(chatFlow);

const functionhost =
  process.env.HELP_SUPPLY_HOST + '/help-supply-staging/us-central1';

let twilioImport = {
  friendlyName: '',
  logQueries: true,
  uniqueName: 'helpsupply2',
  defaults: {
    defaults: {
      assistant_initiation: 'task://greeting',
      fallback: 'task://fallback',
      collect: {
        validate_on_failure: 'task://collect_fallback',
      },
    },
  },
  styleSheet: {
    style_sheet: {
      collect: {
        validate: {
          on_failure: {
            repeat_question: false,
            messages: [
              {
                say: {
                  speech: "I didn't get that. What did you say?",
                },
              },
              {
                say: {
                  speech: "I still didn't catch that. Please repeat.",
                },
              },
              {
                say: {
                  speech: "Let's try one last time. Say it again please.",
                },
              },
            ],
          },
          on_success: { say: { speech: '' } },
          max_attempts: 4,
        },
      },
      voice: {
        say_voice: 'Polly.Matthew',
      },
      name: '',
    },
  },
  fieldTypes: [],
  tasks: [
    {
      uniqueName: 'collect_fallback',
      actions: {
        actions: [
          {
            say:
              "Looks like I'm having trouble. Apologies for that. Let's start again, how can I help you today?",
          },
          { listen: true },
        ],
      },
      fields: [],
      samples: [],
    },
    {
      uniqueName: 'fallback',
      actions: {
        actions: [
          {
            say: "I'm sorry didn't quite get that. Please say that again.",
          },
          { listen: true },
        ],
      },
      fields: [],
      samples: [],
    },
  ],
};

for (const taskname in chatFlow) {
  let samples = (chatFlow[taskname].samples || []).map((s) => {
    return {
      language: 'en-US',
      taggedText: s,
    };
  });
  let task = {
    uniqueName: taskname,
    actions: {
      actions: [
        {
          collect: {
            on_complete: {
              redirect: {
                method: 'POST',
                uri: functionhost + '/twilio/chatFlow/' + taskname,
              },
            },
            name: 'collect_' + taskname,
            questions: chatFlow[taskname].collect,
          },
        },
      ],
    },
    fields: [],
    samples: samples,
  };
  twilioImport.tasks.push(task);
}

fs.writeFileSync(
  'autopilot/toimport.json',
  JSON.stringify(twilioImport, null, 2),
);

console.log('Deploying...');
exec(
  'twilio autopilot:update -s autopilot/toimport.json',
  (error, stdout, stderr) => {
    console.log(error, stdout, stderr);
  },
);
