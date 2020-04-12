let ChatFramework = require('./chatframework').ChatFramework;

let helpSupply = new ChatFramework();

async function greeting(chat) {
  chat.say(
    'Hi! Welcome to Help Supply. We’re here to help Healthcare Professionals easily connect with services that make their lives easier during COVID-19.',
  );
  let q_is_hcp = chat.yes_no_question(
    'Are you a healthcare professional looking for some help?',
  );
  let [is_hcp] = await chat.ask(q_is_hcp);
  if (is_hcp == 'yes') {
    chat.say('Great!');
    return select_service;
  }
  chat.say("Sorry, we can't help then");
}
helpSupply.register(greeting, 'hi', 'hello', 'hello?');

async function select_service(chat) {
  chat.say('We offer many options: 1. Grocery Delivery, 2. Mental Health');
  let which_service = chat.number_choice('Which do you want?');
  let [service] = await chat.ask(which_service);
  chat.state.active_request = service;
  chat.say('You chose ' + service);
  return search_facility_by_zip;
}
helpSupply.register(select_service);

async function search_facility_by_zip(chat) {
  chat.say('First, we need to confirm you are a healthcare worker.');
  let ask_zip = chat.number_choice(
    "What's the zip code of the health facility where you work?",
  );
  let [zip_code] = await chat.ask(ask_zip);
  chat.state.facility_zip = zip_code;
  chat.state.facility_choices = [1, 2, 3];
  chat.say("Here's nearby facilities:");
  return choose_facility;
}
helpSupply.register(search_facility_by_zip);

async function choose_facility(chat) {
  let facility_choice = chat.number_choice(
    'Which facility are you connected with?',
  );
  let [choice] = await chat.ask(facility_choice);
  chat.state.selected_facility = chat.state.facility_choices[parseInt(choice)];
  return collect_email;
}
helpSupply.register(choose_facility);

async function collect_email(chat) {
  chat.say(
    'Got it. We need to verify your affiliation by sending a code to your work email.',
  );
  let q_email = chat.generic_question("What's your work email?");
  let [email] = await chat.ask(q_email);
  chat.state.confirmation_code = '12345';
  chat.state.confirmation_attempts = 0;
  // TODO: Send the email
  return get_confirmation_code;
}
helpSupply.register(collect_email);

async function get_confirmation_code(chat) {
  chat.say('Check your email (might take a few).');
  let get_code = chat.number_choice(
    'Please enter the code we sent to your email',
  );
  let [code] = await chat.ask(get_code);
  if (chat.state.confirmation_code === code) {
    chat.say('Thanks');
    chat.state.confirmed = true;
    // TODO: Map to the active request type
  } else {
    chat.say("Hmm, that wasn't right.");
    chat.state.confirmation_attempts += 1;
    if (chat.state.confirmation_attempts >= 3) {
      chat.say('Sorry, too many incorrect attempts');
      return;
    }
    return get_confirmation_code;
  }
}
helpSupply.register(get_confirmation_code);

// If you're running this directly (with node, then start the simulator)
if (require.main === module) {
  //helpSupply.simulate();
  helpSupply.dumpToTwilio();
}

exports.chatFlow = helpSupply;
