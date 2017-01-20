/*****************************************************************************/
/* Hidden: Event Handlers */
/*****************************************************************************/
Template.Hidden.events({
  'click .unhide': function (e,t) {
    var transactionId = e.currentTarget.id;
    Transactions.update({_id: transactionId}, {$set: {ignore: false}});
  },

  'click .action-evaluatehome': function (e,t) {
    Router.go("/transactions");
  },

});

/*****************************************************************************/
/* Hidden: Helpers */
/*****************************************************************************/
Template.Hidden.helpers({
  transactions: function () {
    return Transactions.find({userId: Meteor.userId(),ignore: true});
  }
});

/*****************************************************************************/
/* Hidden: Lifecycle Hooks */
/*****************************************************************************/
Template.Hidden.onCreated(function () {

  // Subscribe to subscriptions at the Template level
  var self = this;
  self.autorun(function () {
    self.subscribe('Transactions.ignored');
  });

});

Template.Hidden.onRendered(function () {
});

Template.Hidden.onDestroyed(function () {
});
