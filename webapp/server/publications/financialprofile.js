// Financial Profile publications
Meteor.publish('financialprofile', function () {
  return FinancialProfile.find({userId: this.userId});
});
