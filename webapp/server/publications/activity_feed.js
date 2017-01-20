Meteor.publish('activityfeed', function () {

  if (!this.userId) {
    return this.ready();
  }

  return ActivityFeed.find({userId: this.userId},{sort:{date: 1}});

});