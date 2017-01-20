/*****************************************************************************/
/* AccountsSegment: Event Handlers */
/*****************************************************************************/
Template.AccountsSegment.events({
  'click .action-sync': function (e, t) {

    console.log("SyncAccount");
    console.log(this._id);

    Meteor.call('plaidSyncSingleAccount', this.access_token, this._plaidId, function (error, results) {

      if (error) {
        console.log("MC: plaidSyncSingleAccount: An error has occurgred:");
        console.log(error);
        //sAlert.info("Account syncing transactions...Error", {timeout: 1500});
      }

      var blob = JSON.parse(results.content);
      var access_token = blob.access_token;
      var accounts = blob.accounts;
      var transactions = blob.transactions;

      Meteor.call('plaidUpdateTransactions', transactions, function (err, result) {

        if (err) {
          console.log("err")
        } else {
          mixpanel.track("Synced account manually:" + result.new + "new, " + result.updated + " updated");
          sAlert.info("Account synced: "+result.new+" new, " + result.updated + " updated transactions");
        }
      });


    });

  },

  'click .action-sync-all': function (e, t) {

    console.log("Sync All Accounts");
    Meteor.call('plaidSyncAllAccounts', function(err,result) {
      if (err) console.log(err);
      sAlert.info("Account synced: "+result.new+" new, " + result.updated + " updated transactions");
    });
    console.log('Updating spend analysis on server upon login...')
    Meteor.call('updateSpendStatistics');

  },

  'click .action-transactions': function (e, t) {

    console.log("Transactions for Account");
    console.log(this._id);
    Router.go("/account/" + t.data._id);

  }

  ,

  'click .action-remove': function (e, t) {

    Meteor.call('removeAccount', this, function () {
      console.log("account " + this._id + " deleted");
      sAlert.info("Account deleted successfully");
    });

  }

  ,

  'click .action-details': function (e, t) {
    Router.go("/account/" + this._id);
  }

  ,


});

/*****************************************************************************/
/* AccountsSegment: Helpers */
/*****************************************************************************/
Template.AccountsSegment.helpers({
  accounts: function () {
    return FinAccounts.find({userId: Meteor.userId()});
  },
});

/*****************************************************************************/
/* AccountsSegment: Lifecycle Hooks */
/*****************************************************************************/
Template.AccountsSegment.onCreated(function () {
  // Subscribe to subscriptions at the Template level
  
});

Template.AccountsSegment.onRendered(function () {
});

Template.AccountsSegment.onDestroyed(function () {
});
