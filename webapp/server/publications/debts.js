// Debts Publications
Meteor.publish('debts', function () {
  if (!this.userId) {
    return this.ready();
  }
  return Debts.find({userId: this.userId});
});
