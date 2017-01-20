/*****************************************************************************/
/* NewTransactions: Event Handlers */
/*****************************************************************************/
Template.NewTransactions.events({
});

/*****************************************************************************/
/* NewTransactions: Helpers */
/*****************************************************************************/
Template.NewTransactions.helpers({
  newTransactions: function () {
    return Transactions.find({userId: Meteor.userId(), isNew: true});
  }
});

/*****************************************************************************/
/* NewTransactions: Lifecycle Hooks */
/*****************************************************************************/
Template.NewTransactions.onCreated(function () {
  // Subscribe to subscriptions at the Template level
  var self = this;
  self.autorun(function() {
    self.subscribe('Transactions.new');
  });

});

Template.NewTransactions.onRendered(function () {
});

Template.NewTransactions.onDestroyed(function () {
});
