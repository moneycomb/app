/*****************************************************************************/
/* AccountsAddButton: Event Handlers */
/*****************************************************************************/
Template.AccountsAddButton.events({
  'click .plaid-link': function (event) {

    if (Meteor.user().username == "demo") {
      sAlert.info("Accounts cannot be added in demo mode");
    } else {

      console.log(Meteor.settings.public.plaid_env);
      console.log(Meteor.settings.public.plaid_public_key);

      var plaidlinkHandler = Plaid.create({
        env: Meteor.settings.public.plaid_env,
        clientName: 'your Moneycomb account',
        key: Meteor.settings.public.plaid_public_key,
        product: 'connect',
        longtail: true,
        onSuccess: function (public_token) {
          //console.log(public_token);

          Meteor.call('plaidExchange', public_token, function (error, results) {

            if (error) {
              console.log("plaidExchange: An error has occured:");
              console.log(error);
              return error
            }

            console.log('Exchange success');
            //console.log(results.content);
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
              Meteor.call('plaidAddTransactions', transactions, function(err,result) {
                Meteor.call('updateSpendStatistics');
              });

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
/* AccountsAddButton: Helpers */
/*****************************************************************************/
Template.AccountsAddButton.helpers({
  displayText: function() {
    if (this.label == null) {
      return "Link Account"
    } else {
      return this.label
    }
  }
});

/*****************************************************************************/
/* AccountsAddButton: Lifecycle Hooks */
/*****************************************************************************/
Template.AccountsAddButton.onCreated(function () {
});

Template.AccountsAddButton.onRendered(function () {
});

Template.AccountsAddButton.onDestroyed(function () {
});
