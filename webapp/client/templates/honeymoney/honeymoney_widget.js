Template.HoneyMoneyWidget.helpers({
  hp: function() {
    let FP = FinancialProfile.findOne({userId: Meteor.userId()});

    return (FP.honeypoints == undefined ? 0 : FP.honeypoints)
  }
});

