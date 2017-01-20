Meteor.methods({

  // this method simple copies profile.email_address to emails[0].address, the users
  // primary email address
  updateEmail: function () {

    console.log("updating email for user "+ Meteor.userId())
    let user = Meteor.user()
    console.log(user);
    user.emails[0].address = user.profile.email_address;

    Meteor.users.update(Meteor.userId(),
      {$set: {"emails": [{"address": user.profile.email_address}]}})
  }

});


