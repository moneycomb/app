var insertFinProfileHook = {

  onSuccess: function(formType, result) {
    // User has submitted Income info. We can calculate and save the base allocation
    console.log('Updating Allocations after initial fincancial profile set in onboarding');
    
    //ok here is where we have enough info - I think - for mixpanel...
    //Lets identify ourselves to mixpanel
    let FP = FinancialProfile.findOne({userId: Meteor.userId()});
    
    // if the user has registered via the "take the quiz" route, lets save the results in their money mindset...
    const quiz_results = Session.get("quiz_results");
    if (quiz_results != undefined) {
      console.log("pre-registration quiz taken..saving results in profile");
      MoneyMindset.insert({'userId': Meteor.userId(), 'quiz_results': quiz_results});
      Session.set('quiz_results', undefined);   // discard the results in the case of subsequent updates
    }

    mixpanel.identify(Meteor.userId());
    mixpanel.people.set({
      "$first_name": Meteor.user().profile.first_name,
      "$last_name": Meteor.user().profile.last_name,
      "$lastlogin": Meteor.user().profile.lastLogin,
      "$email": Meteor.user().primaryemail(),
      "$age": FP.age,
      "$gender": FP.gender,
      "$income": FP.income,
      "$created_at": FP.createdAt,
      "$status": FP.status,
    });

    Meteor.call('sendWelcomeEmail',Meteor.user().emails[0].address, Meteor.user().profile.first_name);

    // We give them +100 HM for signing up!
    Meteor.call('addHoneyMoney', 100);

    Router.go('/ob/step2');
  },

};

var updateProfileHook = {

  onSuccess: function(formType, result) {

    Meteor.call('updateAllocation')
    sAlert.info("Profile Updated Successfully", {timeout: 1500});
    Meteor.call('hiveify');
    //Meteor.call('logActivity','profile','You updated your profile','Nice job!')
  },

};

var updateMCUserProfileHook = {

  onSuccess: function (formType, result) {
    console.log(formType);
    console.log(result);
    Meteor.call('updateEmail');
  }

}

AutoForm.hooks({
  insertFinProfile: insertFinProfileHook,
  updateFinProfile: updateProfileHook,
  updateMCUserProfile: updateMCUserProfileHook,
});


Meteor.startup(function () {

  sAlert.config({
    effect: 'jelly',
    position: 'top',
    timeout: 2000,
    html: false,
    onRouteClose: true,
    stack: true,
    // or you can pass an object:
    // stack: {
    //     spacing: 10 // in px
    //     limit: 3 // when fourth alert appears all previous ones are cleared
    // }
    offset: 50, // in px - will be added to first alert (bottom or top - depends of the position in oldconfig)
    beep: false,
    onClose: _.noop //
    // examples:
    // onClose: function() {
    //     /* Code here will be executed once the alert closes. */
    // }
  });


  // see: https://atmospherejs.com/fabienb4/autoform-semantic-ui
  AutoForm.setDefaultTemplate("semanticUI");


});
