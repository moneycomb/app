/*****************************************************************************/
/* Uncategorized: Event Handlers */
/*****************************************************************************/
Template.Uncategorized.events({
  'click .load-more': function (e,t) {
    const newAmountToLoad = t.numLoaded.get() + 10;
    t.numLoaded.set(newAmountToLoad);
  }
});

/*****************************************************************************/
/* Uncategorized: Helpers */
/*****************************************************************************/
Template.Uncategorized.helpers({
  transactions: function() {

    let numLoaded = Template.instance().numLoaded.get();

    return Transactions.find({userId: Meteor.userId(), cell:null},{sort: {date: -1},skip:0, limit: numLoaded})
  }
});

/*****************************************************************************/
/* Uncategorized: Lifecycle Hooks */
/*****************************************************************************/
Template.Uncategorized.onCreated(function () {

  // Subscribe to subscriptions at the Template level
  var self = this;

  self.numLoaded = new ReactiveVar(10);

  self.autorun(function () {
    self.subscribe('Transactions.uncategorized');
  });
});

Template.Uncategorized.onRendered(function () {
});

Template.Uncategorized.onDestroyed(function () {
});
