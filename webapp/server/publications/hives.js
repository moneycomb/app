Meteor.publish('hives', function () {

  if (!this.userId) {
    return this.ready();
  }

  let FP = FinancialProfile.findOne({userId: this.userId});

  return Hives.find({name: FP.whichHive});

});