// Debts Publications
Meteor.publish('goals', function () {
  if (!this.userId) {
    return this.ready();
  }
  return Goals.find({userId: this.userId});
});

