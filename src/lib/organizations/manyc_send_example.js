const fetch = require('node-fetch');

const example = {
  Source: 'help.supply',
  'Source ID': 'ABCDEFG',

  Cell: '+15555555555',
  Email: 'test@test.com',
  'First Name': 'John',
  'Last Name': 'Smith',
  'Zip Code': '00000',
  'Cross Streets': '1st and Market',
  'What borough/region are you in?': 'selihZrYb0KwDJKDi',
  'What neighborhood?': ['recfinrr8sOvRUuhR'],
  'What type(s) of support are you seeking?': ['sel2id9wbZhujdxrW'],
  'Are you, or anyone in your household in one or more of these hardest-hit groups? Please select all that apply.': [
    'sel9iXUHwQBxwJR9A',
  ],
  'Which of these ways are best to get in touch with you?': [
    'selcp4xYi4krApJaA',
  ],
  'How soon do you need support?': 'selYKne9Et1ixIAqG',
  "Language Access: is your primary language something other than English, for which you'd need translation & interpretation support to connect to volunteers?": [
    'sel9W4YTtAL6rQsZv',
  ],
  'Anything else you want to share about your situation at this time?':
    "\n\nThis is a request from help.supply. (It's also a test, don't actually service).\n\nDelivery Preference:\n- April 18\n- Morning\n\nGrocery List:\n- Bananas\n- Eggs\n\nDietary Restrictions:\n- Lactose Intolerant\n\nOther Info:\n\t    ",
};

(async () => {
  let url = 'https://hook.integromat.com/4nwig47x0n625x2zxzuaj7tv9fqijhqn';
  console.log(JSON.stringify(example, null, 2));
  //return;
  let response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(example),
  });
  console.log(response);
})();
