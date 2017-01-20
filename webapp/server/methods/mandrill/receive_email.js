
Meteor.methods({
    spendemail: function (request, response) {

        this.unblock();

        console.log("Incoming Email message:");
        console.log(request);
        console.log("-----------------");

        const result = JSON.parse(request.mandrill_events);

        console.log(`${result[0].msg}`);
        console.log("-----------------");
        console.log(`subject = ${result[0].msg.subject}`);
        console.log(`body = ${result[0].msg.text}`);
        console.log(`from = ${result[0].msg.from_email}`);
    }

});

