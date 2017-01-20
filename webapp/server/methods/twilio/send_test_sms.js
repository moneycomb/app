var twilio = require('twilio');

Meteor.methods({
  sendTestSMS: function(to) {

    this.unblock();
    check(to, String);

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_FROM;

    var client = new twilio.RestClient(accountSid, authToken);

    client.messages.create({
      body: 'Hello from Node',
      to: to,  // Text this number
      from: fromNumber // From a valid Twilio number
    }, function(err, message) {

      if (err) {
        console.log(err);
      } else {
        console.log(message);
      }

    });

  }

})



