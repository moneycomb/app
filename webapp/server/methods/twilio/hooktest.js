var twilio = require('twilio');
var cloudinary = require('cloudinary');


Meteor.methods({
  hooktest: function (request, response) {

    this.unblock();

    var client = new twilio.RestClient(accountSid, authToken);

    console.log("Incoming Text message:");
    console.log(request.From);
    console.log(request.MediaUrl0);
    console.log(request.Body);
    console.log("-----------------");

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_FROM;


    // Let's find the user...
    const fullNumber = request.From;
    let number = fullNumber.replace(/^\+1/,'');   // take off the +1 prefix....

    const U = Meteor.users.findOne({"profile.mobile_number": number});

    if (U == undefined) {
      // We don't know the user...yet...invite them!
      console.error(`Incoming text message from an unknown user: ${fullNumber}`);

      const response = "Hi from MoneyComb. We don't seem to have an matching number for you. You are welcome to join us! http://www.mymoneycomb.com to learn more!";

      client.messages.create({
        body: response,
        to: fullNumber,  // Text this number
        from: fromNumber, // From a valid Twilio number
        //mediaUrl: "https://app.mymoneycomb.com/images/bee.png"
      }, function (err, message) {
        if (err) {
          console.log(err);
        } else {
          console.log(message);
        }
      });
      // end unknown user

    } else {

      // WE KNOW THE USER!
      const greeting = `${_.sample(['Hi', 'Hey', 'Hello'])} ${U.profile.first_name}`;  // custom greeting

      // PARSE THE TEXT INPUT
      const command = String(request.Body);

      const parseResult = parse_command(command);

      console.log(parseResult);

      let response = greeting +". I don't understand the command. Send 'helpme' and I'll give some info on valid commands I understand";
      
      if (parseResult.cmd == 'spend') {
        
        //SPEND COMMAND
        const transaction = {
          name: parseResult.name,
          amount: parseResult.amount,
          cell: parseResult.cell,
        };

        Meteor.call('addTransaction', transaction, U._id, function () {
          console.log("transaction added...update stats...");
          updateSpendStatistics(U._id);
        });

        response = `Ok, ${U.profile.first_name}, I recorded that you spent $${transaction.amount} in ${MoneyComb.singlecellname(transaction.cell)} for you`;

        // STATUS COMMAND
      } else if (parseResult.cmd == 'status') {

        const An = Analysis.findOne({userId: U._id});

        response = greeting + `. You have spent $${parseFloat(An.totalSpend.t30.amount).toFixed(0)} over the last 30 days.`;
        response = response + 'See your full status at: https://app.mymoneycomb.com/dashboard';

        // HELP COMMAND
      } else if (parseResult.cmd == 'help') {
        
        response = `Here are some commands to try:\n`
        response += ' status - displays your spending status summary\n';
        response += ' help - this message';

      }

      // Process a receipt if we have one
      if (request.MediaUrl0 != undefined) {
        console.log('Processing receipt..');

        cloudinary.config({
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
          api_key: process.env.CLOUDINARY_API_KEY,
          api_secret: process.env.CLOUDINARY_API_SECRET
        });


        cloudinary.uploader.upload(request.MediaUrl0, function (result) {
          console.log(result)
        }, {
          transformation: [
            {radius: 0, width: 400, crop: "scale"},
            {gravity: "north", overlay: "receipt_header", radius: 0, y: 10},
            {gravity: "north_east", overlay: "moneycomblogo", width: 60, y: 5, crop: "scale"},
            {radius: 20}
          ]
        });

      }

      // RESPOND TO THE USER!

      client.messages.create({
        body: response,
        to: fullNumber,  // Text this number
        from: fromNumber, // From a valid Twilio number
        //mediaUrl: "https://app.mymoneycomb.com/images/bee.png"
      }, function (err, message) {
        if (err) {
          console.log(err);
        } else {
          console.log(message);
        }
      });


    }
    return "yoyo";

  }

});

