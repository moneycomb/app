/*****************************************************************************/
/* Analysis: Event Handlers */
/*****************************************************************************/
Template.TAnalysis.events({
  'click .action-analyze': function() {
    Meteor.call("mcDeepAnalysis","full",Session.get('NOW'));
  }
});

/*****************************************************************************/
/* Analysis: Helpers */
/*****************************************************************************/
Template.TAnalysis.helpers({

  cells: function() {
    return Cells.find();
  },

  average: function(cell) {
    var A = Analysis.findOne({userId: Meteor.userId()});
    return A[cell].trans_average;
  },

  count: function(cell) {
    var A = Analysis.findOne({userId: Meteor.userId()});
    return A[cell].count;
  },

  lastPeriodCount: function (cell) {
    var A = Analysis.findOne({userId: Meteor.userId()});
    return A[cell].periods[1].count;
  },

  t2ttom: function () {
    var A = Analysis.findOne({userId: Meteor.userId()});
    return _.pairs(A[this.abbrev].t2ttom);
  }


});

/*****************************************************************************/
/* Analysis: Lifecycle Hooks */
/*****************************************************************************/
Template.TAnalysis.onCreated(function () {

  // Subscribe to subscriptions at the Template level
  var self = this;
  self.autorun(function () {
    self.subscribe('cells');
    self.subscribe('analysis');
  });

});

Template.TAnalysis.onRendered(function () {
});

Template.TAnalysis.onDestroyed(function () {
});
