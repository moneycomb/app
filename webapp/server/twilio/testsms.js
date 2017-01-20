/*
var sid = process.env.TWILIO_ACCOUNT_SID;
var auth_token = process.env.TWILIO_AUTH_TOKEN;


//NPM.require('twilio');


HTTP.call(
  "POST",
  'https://api.twilio.com/2010-04-01/Accounts/' +
  process.env.TWILIO_ACCOUNT_SID + '/SMS/Messages.json', {
    params: {
      From: process.env.TWILIO_NUMBER,
      To: '+19197203889',
      Body: "this is a test"
    },
    // Set your credentials as environment variables
    // so that they are not loaded on the client
    auth: process.env.TWILIO_ACCOUNT_SID + ':' +
    process.env.TWILIO_AUTH_TOKEN
  },

  // Print error or success to console
  function (error) {
    if (error) {
      console.log(error);
    }
    else {
      console.log('SMS sent successfully.');
    }
  }
);
*/
