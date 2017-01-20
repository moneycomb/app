Meteor.publish('allocation', function () {

  if (!this.userId) {

    return this.ready();
  }
  return Allocations.find({userId: this.userId});
});