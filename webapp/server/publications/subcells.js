Meteor.publish('subcells', function () {
  return SubCells.find({}, {sort: {"name": 1}});
});

Meteor.publish('subcells.bycell', function (cell) {

  // check(cell, String)

  return SubCells.find({parent: cell}, {sort: {"name": 1}});
});
