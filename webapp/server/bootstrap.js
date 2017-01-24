// Server Startup code
Meteor.startup(function () {
  console.log(`Starting MoneyComb Backend Server`);
  console.log(`Plaid environment: ${Meteor.settings.public.plaid_env}`);
  console.log("Plaid public key: "+ Meteor.settings.public.plaid_public_key);
});
