const functions = require('firebase-functions');
const mailgun = require('mailgun-js');
const DOMAIN =
  process.env.MAILGUN_DOMAIN ||
  functions.config().mailgun_domain.key ||
  'help.supply';
const api_key = process.env.MAILGUN_API_KEY || functions.config().mailgun.key;
const mg = mailgun({ apiKey: api_key, domain: DOMAIN });

exports.sendEmail = async function (to, subject, text, html) {
  const data = {
    from: 'Help Supply <help@help.supply>',
    to: to,
    subject: subject,
    text: text,
    html: html,
  };
  return new Promise((resolve, reject) => {
    mg.messages().send(data, function (error, body) {
      if (error) {
        reject(error);
      } else {
        resolve(body);
      }
    });
  });
};

/*
(async () => {
	console.log(await exports.sendEmail('newhouseb@gmail.com', 'testing', 'onetwo', 'thre'));
})();
*/
