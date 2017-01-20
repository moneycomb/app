Meteor.publish('cells', function () {
  return Cells.find({}, {sort: {"number": 1}});
});
