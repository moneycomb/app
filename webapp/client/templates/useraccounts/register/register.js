/*****************************************************************************/
/* MoneyCombSignUp: Event Handlers */
/*****************************************************************************/


/*****************************************************************************/
/* MoneyCombSignUp: Lifecycle Hooks */
/*****************************************************************************/
Template.MoneyCombSignUp.onCreated(function () {

  Accounts.logout(function(error) {
    if (error) console.log("Error logging user out?");
    console.log('User logged out: '+ Meteor.userId());
  });
  
});

Template.MoneyCombSignUp.onRendered(function () {


});

Template.MoneyCombSignUp.onDestroyed(function () {
});
