/*****************************************************************************/
/* Review: Event Handlers */
/*****************************************************************************/
Template.Review.events({

  'click .load-more': function (e,t) {
    const newAmountToLoad = t.numLoaded.get() + 20;
    t.numLoaded.set(newAmountToLoad);
  }

});

/*****************************************************************************/
/* Review: Helpers */
/*****************************************************************************/
Template.Review.helpers({
  transactions: function() {

    let numLoaded = Template.instance().numLoaded.get();

    return Transactions.find({userId: Meteor.userId(), toReview: true},{sort: {date: 1},skip:0, limit: numLoaded})
  }
});

/*****************************************************************************/
/* Review: Lifecycle Hooks */
/*****************************************************************************/
Template.Review.onCreated(function () {

  this.numLoaded = new ReactiveVar(20);

  // Subscribe to subscriptions at the Template level
  var self = this;
  self.autorun(function () {
    self.subscribe('Transactions.toReview');
  });
});

Template.Review.onRendered(function () {
});

Template.Review.onDestroyed(function () {
});
