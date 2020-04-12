const readline = require('readline');

let simulator = {
  on_response: null,
  on_response_error: null,
};

async function get_response() {
  return new Promise((resolve, reject) => {
    if (simulator.on_response != null || simulator.on_response_error != null) {
      throw 'Can only have one caller waiting for a response';
    }
    simulator.on_response = resolve;
    simulator.on_response_error = reject;
  });
}

/* This is passed to each back and forth */
class ChatContext {
  constructor(state, mode, response_source) {
    this.parameters = [];
    this.questions = [];
    this.ask_finished = null;
    this.ask_failed = null;
    this.simulate = mode === 'simulate';
    this.test = mode === 'test';
    this.response_source = response_source;
    this.state = state || {};
  }
  yes_no_question(question) {
    let name = 'param' + this.questions.length;
    this.questions.push({
      question: question,
      type: 'Twilio.YES_NO',
      name: name,
    });
    return name;
  }
  number_choice(question) {
    let name = 'param' + this.questions.length;
    this.questions.push({
      question: question,
      type: 'Twilio.NUMBER_SEQUENCE',
      name: name,
    });
    return name;
  }
  generic_question(question) {
    let name = 'param' + this.questions.length;
    this.questions.push({
      question: question,
      name: name,
    });
    return name;
  }
  async ask(...questions) {
    if (this.simulate === true) {
      let responses = [];
      for (var i = 0; i < this.questions.length; i++) {
        console.log('BOT> ' + this.questions[i].question);
        process.stdout.write('YOU> ');
        responses.push(await get_response());
      }
      return responses;
    }
    if (this.test === true) {
      let responses = [];
      for (var i = 0; i < this.questions.length; i++) {
        responses.push(this.response_source());
      }
      return responses;
    }

    this.parameters = questions;

    if (this.ask_finished != null || this.ask_failed != null) {
      throw 'Only one ask allowed per handler';
    }

    return new Promise((resolve, reject) => {
      this.ask_finished = resolve;
      this.ask_failed = reject;
    });
  }
  say(statement) {
    if (this.simulate === true) {
      console.log('BOT> ' + statement);
    }
  }
}

class ChatFramework {
  constructor(mode) {
    this.handlers = {};
    this.raw_handlers = {};
    this.metadata = {};
    this.match = {};
  }
  async register(handler, ...samples) {
    // First run the handler to extract the
    let context = new ChatContext();
    handler(context);
    this.metadata[handler.name] = {
      questions: context.questions,
      samples: samples,
      params: context.parameters,
    };

    // Now create a handler that wraps everything
    this.handlers[handler.name] = (state, ...params) => {
      // TODO: get the state
      let context = new ChatContext(state);
      handler(context);
      context.ask_finished(params);
      return context;
    };
    this.raw_handlers[handler.name] = handler;
    handler.wrapped = this.handlers[handler.name];

    // Create a function to test this specifically
    handler.test = async function (state, ...responses) {
      let fetch_response = function () {
        return responses.shift();
      };
      let context = new ChatContext(state, 'test', fetch_response);
      let next = await handler(context);
      return [state, next];
    };

    // And for simulation
    samples.map((s) => {
      this.match[s] = handler.name;
    });
  }
  async simulate() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.on('line', async (input) => {
      let resp = simulator.on_response;
      simulator.on_response = null;
      simulator.on_response_error = null;
      if (resp) {
        resp(input.trim());
      } else {
        console.log('!!! Unhandled response', input.trim());
      }
    });

    process.stdout.write('YOU> ');
    let state = {};
    while (true) {
      let resp = await get_response();
      if (resp.trim() in this.match) {
        let raw_handler = this.raw_handlers[this.match[resp.trim()]];
        while (raw_handler) {
          let context = new ChatContext(state, 'simulate');
          raw_handler = await raw_handler(context);
        }
        process.stdout.write('YOU> ');
      } else {
        if (resp.trim().length > 0) {
          process.stdout.write("Didn't recognize:" + resp + '\nYOU> ');
        } else {
          process.stdout.write('YOU> ');
        }
      }
    }
  }
  async test(responses, state) {
    let resp = responses.shift();
    let fetch_response = function () {
      return responses.shift();
    };
    state = state || {};
    if (resp.trim() in this.match) {
      let raw_handler = this.raw_handlers[this.match[resp.trim()]];
      while (raw_handler) {
        let context = new ChatContext(state, 'test', fetch_response);
        raw_handler = await raw_handler(context);
      }
      return state;
    } else {
      throw 'Unexpected prompt' + resp;
    }
  }
  async serve(req, res) {
    // TODO: Validate twilio
    let state = await backend.getConversationState(req.body.UserIdentifier);

    // Get the task name and look up the right handler
    let task = req.params.task;

    // Extract each parameter from the collected data

    let answers = (
      (JSON.parse(req.body.Memory).twilio.collected_data || {})[
        'collect_' + req.params.task
      ] || {}
    ).answers;

    // Execute the handler
    this.handlers[req.params.task](state, ...answers);

    // Save the state

    // Return the result to twilio
  }
  dumpToTwilio() {
    for (var task in this.metadata) {
      // This is a clowny but simple way to do a deep copy
      let taskdata = JSON.parse(JSON.stringify(this.metadata[task]));

      // Rename questions to collect
      taskdata.collect = taskdata.questions;
      delete taskdata.questions;

      // Remove parameters, which we use internally
      delete taskdata.params;

      console.log(task, taskdata);
    }
  }
}

exports.ChatFramework = ChatFramework;
