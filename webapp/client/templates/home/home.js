/*****************************************************************************/
/* Home: Event Handlers */
/*****************************************************************************/


Template.Home.events({

});

/*****************************************************************************/
/* Home: Helpers */
/*****************************************************************************/
Template.Home.helpers({});

/*****************************************************************************/
/* Home: Lifecycle Hooks */
/*****************************************************************************/
Template.Home.onCreated(function () {

  // Subscribe to subscriptions at the Template level
  var self = this;

  self.autorun(function () {
    var accountsHandle = self.subscribe('accounts');
    var fpHandle = self.subscribe('financialprofile');


    // First thing we need to do: see if the user is Signed in. If so, their "homepage"
    // will not be the 'home' template. It will be the dashboard template.
    // Uses https://atmospherejs.com/brettle/accounts-login-state


    if (!!Meteor.userId()) {
      // sometimes users are getting partway through the onboarding and then hitting
      // the browser back button... need to make sure they are all the way through onboarding...

      /*
      if (accountsHandle.ready() && fpHandle.ready()) {
        const A = FinAccounts.find({userId: Meteor.userId()}).count();
        const FP = FinancialProfile.find({userId: Meteor.userId()}).count();

        if (FP == 0) {
          Router.go("/ob/info");
        } else if (A == 0) {
          console.log("We have no accounts..");
          Router.go("/ob/step2");
        } else {
          Router.go("/dashboard");
        }
      } */
      Router.go("/dashboard");
    }

  });

});

  Template.Home.onRendered(function () {


  });

  Template.Home.onDestroyed(function () {
  });

