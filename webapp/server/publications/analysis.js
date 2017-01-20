// Analysis Publications
Meteor.publish('analysis', function () {
  if (!this.userId) {
    console.error('the user is unknown and is trying to get analysis....');
    return this.ready();
  }
  return Analysis.find({userId: this.userId});
});