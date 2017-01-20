/*****************************************************************************/
/* OtherTransactions: Event Handlers */
/*****************************************************************************/
Template.OtherTransactions.events({
  'click .load-more': function (e,t) {
    const newAmountToLoad = t.numLoaded.get() + 10;
    t.numLoaded.set(newAmountToLoad);
  }
});

/*****************************************************************************/
/* OtherTransactions: Helpers */
/*****************************************************************************/
Template.OtherTransactions.helpers({
  otherTransactions: function () {

    let numLoaded = Template.instance().numLoaded.get();
    return Transactions.find({userId: Meteor.userId(), cell: "o"},{sort: {date: -1},skip:0, limit: numLoaded})
  }
});

/*****************************************************************************/
/* OtherTransactions: Lifecycle Hooks */
/*****************************************************************************/
Template.OtherTransactions.onCreated(function () {
  // Subscribe to subscriptions at the Template level
  var self = this;

  self.numLoaded = new ReactiveVar(10);

  self.autorun(function() {
    self.subscribe('Transactions.other');
  });

});

Template.OtherTransactions.onRendered(function () {
});

Template.OtherTransactions.onDestroyed(function () {
});
