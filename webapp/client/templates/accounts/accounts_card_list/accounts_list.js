/*****************************************************************************/
/* AccountsCardList: Event Handlers */
/*****************************************************************************/
Template.AccountsCardList.events({
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
/* AccountsCardList: Helpers */
/*****************************************************************************/
Template.AccountsCardList.helpers({

  have_savings_accounts: function() {
    return (FinAccounts.find({type:"depository",subtype:"savings"}).count() > 0);
  },

  have_checking_accounts: function() {
    return (FinAccounts.find({type:"depository",subtype:"checking"}).count() > 0);
  },

  have_credit_accounts: function() {
    return (FinAccounts.find({type:"credit"}).count() > 0);
  },

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
/* AccountsCardList: Lifecycle Hooks */
/*****************************************************************************/
Template.AccountsCardList.onCreated(function () {

  // Subscribe to subscriptions at the Template level
  var self = this;

  self.autorun(function() {
    self.subscribe('accounts');
  });

});

Template.AccountsCardList.onRendered(function () {

});

Template.AccountsCardList.onDestroyed(function () {
});
