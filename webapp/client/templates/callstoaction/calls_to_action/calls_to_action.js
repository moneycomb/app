/*****************************************************************************/
/* CallsToAction: Event Handlers */
/*****************************************************************************/
Template.CallsToAction.events({
  'click .action-reviewed': function (e, t) {
    const tid = e.currentTarget.id;
    console.log(`transaction id ${tid} reviewed`);
    Transactions.update({_id: tid}, {$set: {isNew: false, toReview: false}})
    Meteor.call('haveTransactionsToReview', function(error,result) {
      if (!error) {
        Session.set('itemsToReview',result)
      }
    });
 
  },

  'click .action-help-evaluate': function (e, t) {

    $('.ui.modal.help-evaluate')
      .modal('show')
  },

});

/*****************************************************************************/
/* CallsToAction: Helpers */
/*****************************************************************************/
Template.CallsToAction.helpers({
  transactions: function () {
    return Transactions.find({userId: Meteor.userId(), toReview: true}, {sort: {date: -1}, limit: 5})
  },


  current: function () {

    const current = Transactions.findOne({userId: Meteor.userId(), toReview: true});

    if (current != undefined) {
      return current
    }
  },

  haveUnreviewed: function () {
    console.log("re-running...");
    Meteor.call('haveTransactionsToReview', function(error,result) {
      if (!error) {
        Session.set('itemsToReview',result)
      }
    });
    console.log(`toreview = ${Number(Session.get('itemsToReview'))}`);

    return (Number(Session.get('itemsToReview')) > 0 );
  },

  matchChecker: function () {
    const unrcat = Transactions.find({userId: Meteor.userId(),toReview: true}).count();
    return (unrcat != 0)
  },

});

/*****************************************************************************/
/* CallsToAction: Lifecycle Hooks */
/*****************************************************************************/
Template.CallsToAction.onCreated(function () {

  var self = this;

  self.autorun(function () {
    self.subscribe('Transactions.toReview');
    console.log('in autorun');
  });

});


Template.CallsToAction.onRendered(function () {
  $('.fullcard')
      .transition('slide down');
});

Template.CallsToAction.onDestroyed(function () {
});
