/*****************************************************************************/
/* ReviewTransactions: Event Handlers */
/*****************************************************************************/
Template.ReviewTransactions.events({
});

/*****************************************************************************/
/* ReviewTransactions: Helpers */
/*****************************************************************************/
Template.ReviewTransactions.helpers({
  newTransactions: function () {
    return Transactions.find({userId: Meteor.userId(), toReview: true});
  }
});

/*****************************************************************************/
/* ReviewTransactions: Lifecycle Hooks */
/*****************************************************************************/
Template.ReviewTransactions.onCreated(function () {
  var self = this;
  self.autorun(function() {
    self.subscribe('Transactions.review');
  });
});

Template.ReviewTransactions.onRendered(function () {
});

Template.ReviewTransactions.onDestroyed(function () {
});
