Meteor.publish('tags', function () {
  return Tags.find({}, {sort: {"group": 1}});
});
