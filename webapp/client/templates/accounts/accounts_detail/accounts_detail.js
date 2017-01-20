import TransactionList from '../../../components/TransactionList';
import CProgressBar from '../../../components/ProgressBar';

/*****************************************************************************/
/* AccountsDetail: Event Handlers */
/*****************************************************************************/
Template.AccountsDetail.events({

  'click .load-more': function (e,t) {
    const newAmountToLoad = t.numLoaded.get() + 10;
    t.numLoaded.set(newAmountToLoad);

  },

});

/*****************************************************************************/
/* AccountsDetail: Helpers */
/*****************************************************************************/
Template.AccountsDetail.helpers({
  TransactionList: function () {
    return TransactionList;
  },

  CProgressBar() {
    return CProgressBar;
  },

  account: function() {
    return FinAccounts.findOne({_id: this.accountId});
  },

  selector: function() {
    return {account: this.accountId};
  },

  transactions: function () {

    let numLoaded = Template.instance().numLoaded.get();
    return Transactions.find({account: this.accountId},{limit: numLoaded});
  },

  numTransactions: function () {
    let An = Analysis.findOne({userId: Meteor.userId()});
    return An.account[this.accountId].count;
  },

  creditLimit() {
    let Acc = FinAccounts.findOne({_id: this.accountId});
    return Acc.balance.current + Acc.balance.available;
  }



});

/*****************************************************************************/
/* AccountsDetail: Lifecycle Hooks */
/*****************************************************************************/
Template.AccountsDetail.onCreated(function () {
  // Subscribe to subscriptions at the Template level
  var self = this;
  self.autorun(function () {
    self.subscribe('accounts');
    self.subscribe('account_transactions', self.data.accountId);

    self.numLoaded = new ReactiveVar(10);

  });
});


Template.AccountsDetail.onRendered(function () {
});

Template.AccountsDetail.onDestroyed(function () {
});
