/*****************************************************************************/
/* InsightsHome: Event Handlers */
/*****************************************************************************/
Template.InsightsHome.events({
});

/*****************************************************************************/
/* InsightsHome: Helpers */
/*****************************************************************************/
Template.InsightsHome.helpers({
  eo: function() {
    let A = Analysis.findOne({userId: Meteor.userId()});
    console.log(A);
    return A.eoanalysis;
  },

  credit: function() {
    let A = Analysis.findOne({userId: Meteor.userId()});
    return A.creditanalysis;
  },

  categorization: function() {
    let A = Analysis.findOne({userId: Meteor.userId()});
    return A.categorization;
  },

  overallSpend: function() {
    let A = Analysis.findOne({userId: Meteor.userId()});
    let TS = A.totalSpend.t365.amount;
    let FP = FinancialProfile.findOne({userId: Meteor.userId()});
    let GI = FP.gross_income();

    return {
      percent: TS/GI,
      gi: GI,
      total: TS,
    }
  }

});

/*****************************************************************************/
/* InsightsHome: Lifecycle Hooks */
/*****************************************************************************/
Template.InsightsHome.onCreated(function () {
  Meteor.call('updateMyPurchasePlaces', Meteor.userId(), function(error, result) {
    Meteor.call('analyzeCredit', Meteor.userId());
    Meteor.call('analyzeEatingOut', Meteor.userId());
  });

});

Template.InsightsHome.onRendered(function () {
});

Template.InsightsHome.onDestroyed(function () {
});
