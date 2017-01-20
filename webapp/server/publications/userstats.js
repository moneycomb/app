Meteor.publish('userstats', function () {
  return UserStats.find();
});
