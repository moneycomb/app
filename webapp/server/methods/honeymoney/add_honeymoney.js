Meteor.methods({

  addHoneyMoney: function (quantity) {
    this.unblock();

    check(quantity, Number);

    console.log(`adding honeymoney - ${quantity}`);

    let FP = FinancialProfile.findOne({userId: Meteor.userId()});
    if (FP.honeypoints == undefined) {
      var startHM = 0;
    } else {
      var startHM = Number(FP.honeypoints)
    }

    let newHM = startHM + quantity;
    let added = FinancialProfile.update({userId: Meteor.userId()}, {$set: {honeypoints: newHM}})
    //Meteor.call('logActivity', 'hm', "Honey Money!","You've earned " + quantity + " honeymoney!");

}

});

