/*****************************************************************************/
/* AccountsList: Event Handlers */
/*****************************************************************************/
Template.AccountsList.events({
  'click .resync-accounts': function(e,tmpl) {
    $('.syncing-msg').show()
    //Meteor.call("plaidResyncAccounts","test");
  },

  'click .action-profile': function (e,t) {
    Router.go("/myprofile");
  },

  'click .action-sync-all': function (e, t) {

    console.log("Sync All Accounts");
    t.syncAll.set('loading');

    Meteor.call('plaidSyncAllAccounts', function(err,result) {
      if (err) console.log(err);
      if (result.amount !=0) {
        sAlert.info("$" + result.amount + " in new spending (" + result.new + ") transactions");
      } else {
        sAlert.info("No new spending purchases");
      }

      Meteor.call('updateSpendStatistics');
      t.syncAll.set('');
    });

  },

});

/*****************************************************************************/
/* AccountsList: Helpers */
/*****************************************************************************/
Template.AccountsList.helpers({
  savings_accounts: function() {
    return FinAccounts.find({type:"depository",subtype:"savings"});
  },

  checking_accounts: function() {
    return FinAccounts.find({type:"depository",subtype:"checking"});
  },

  credit_accounts: function() {
    return FinAccounts.find({type:"credit"});
  },

  other_accounts: function() {
    return FinAccounts.find({});
  },

  syncingAll: function() {
    return Template.instance().syncAll.get()
  }

});

/*****************************************************************************/
/* AccountsList: Lifecycle Hooks */
/*****************************************************************************/
Template.AccountsList.onCreated(function () {

  // Subscribe to subscriptions at the Template level
  var self = this;

  this.syncAll = new ReactiveVar('');

  self.autorun(function() {
    self.subscribe('accounts');
  });

});

Template.AccountsList.onRendered(function () {

});

Template.AccountsList.onDestroyed(function () {
});
