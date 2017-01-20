/*****************************************************************************/
/* AccountsAdd: Event Handlers */
/*****************************************************************************/
Template.AccountsAdd.events({

  'click .plaid-link': function (event) {

    if (Meteor.user().username == "demo") {
      sAlert.info("Accounts cannot be added in demo mode");
    } else {
      var plaidlinkHandler = Plaid.create({
        env: Meteor.settings.public.plaid_env,
        clientName: 'your Moneycomb account',
        key: '505704614c705498646afea6bffe29',
        product: 'connect',
        longTail: true,
        onSuccess: function (public_token) {
          console.log(public_token);

          Meteor.call('plaidExchange', public_token, function (error, results) {

            if (error) {
              console.log("An error has occured:");
              console.log(error);
              return error
            }

            console.log('Exchanged!!!!!');
            console.log(results.content);
            var blob = JSON.parse(results.content);
            var access_token = blob.access_token;

            //Now get the accounts and transactions usiing the access token

            Meteor.call('plaidConnectAT', access_token, function (error, results) {

              if (error) {
                console.log("An error has occured:");
                console.log(error);
                return error
              }
              
              var blob = JSON.parse(results.content);
              var accounts = blob.accounts;
              var transactions = blob.transactions;

              Meteor.call('plaidAddAccounts', accounts, access_token);
              Meteor.call('plaidAddTransactions', transactions);

              mixpanel.track("Linked an account");

              // if this is the fist account linked, we give them +100 HM..
              const numAccounts = Meteor.call('numFinAccounts');
              if (numAccounts == 1) {
                console.log('First account linked +100 HM!');
                Meteor.call('addHoneyMoney', 100);
              }

            });

          });
        }
      });

      plaidlinkHandler.open();
    }
  }

});

/*****************************************************************************/
/* AccountsAdd: Helpers */
/*****************************************************************************/
Template.AccountsAdd.helpers({});

/*****************************************************************************/
/* AccountsAdd: Lifecycle Hooks */
/*****************************************************************************/
Template.AccountsAdd.onCreated(function () {
});

Template.AccountsAdd.onRendered(function () {
});

