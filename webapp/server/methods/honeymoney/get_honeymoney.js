Meteor.methods({

  getHoneyMoney: function () {
    
    let FP = FinancialProfile.findOne({userId: Meteor.userId()});
    var honeyMoney = FP.honeypoints ? Number(FP.honeypoints) : 0;

    return honeyMoney;
}

});
