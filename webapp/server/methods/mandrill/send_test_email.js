Meteor.methods({
  sendTestEmail: function(to) {

    this.unblock();
    check(to, String);

    Email.send({from:'info@mymoneycomb.com',to:'gschleic@gmail.com',subject:'test', text:'testing..'});

    
  }
})