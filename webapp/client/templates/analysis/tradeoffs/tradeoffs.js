/*****************************************************************************/
/* Tradeoffs: Event Handlers */
/*****************************************************************************/
Template.Tradeoffs.events({
});

/*****************************************************************************/
/* Tradeoffs: Helpers */
/*****************************************************************************/
Template.Tradeoffs.helpers({
  cells: function() {
    return Cells.find();
  },

  t2ttom: function () {
    var A = Analysis.findOne({userId: Meteor.userId()});
    var cell= this.abbrev;
    var tom = A[this.abbrev].t2ttom;
    var retval = []
    _.each(tom,function(to) {

    });

    return _.values(A[this.abbrev].t2ttom);
  },

  tomkeys: function() {
    var A = Analysis.findOne({userId: Meteor.userId()});
    var tom = A["eo"].t2ttom;
    return _.keys(tom);
  },


  t2dtom: function () {
    var A = Analysis.findOne({userId: Meteor.userId()});
    return _.values(A[this.abbrev].t2dtom);
  },

  d2dtom: function () {
    var A = Analysis.findOne({userId: Meteor.userId()});
    return _.values(A[this.abbrev].d2dtom);
  },

  d2ttom: function () {
    var A = Analysis.findOne({userId: Meteor.userId()});
    return _.values(A[this.abbrev].d2ttom);
  }


});

/*****************************************************************************/
/* Tradeoffs: Lifecycle Hooks */
/*****************************************************************************/
Template.Tradeoffs.onCreated(function () {
  // Subscribe to subscriptions at the Template level
  var self = this;
  self.autorun(function () {
    self.subscribe('cells');
    self.subscribe('analysis');
  });
});

Template.Tradeoffs.onRendered(function () {
});

Template.Tradeoffs.onDestroyed(function () {
});
