Meteor.publish('moneymindset', function () {
  if (!this.userId) {
    return this.ready();
  }
  return MoneyMindset.find({userId: this.userId});

});
