Meteor.startup(function () {
  MyPurchasePlaces._ensureIndex({ "name": 1});
  MyPurchasePlaces._ensureIndex({ "cell": 1});
  MyPurchasePlaces._ensureIndex({ "multiple": 1});
});

// Transaction Publications
Meteor.publish('MyPurchasePlaces', function (cell,limit) {

  //default limit if none set
  var dl = limit || 10;

  check(cell, String);
  
  return MyPurchasePlaces.find({userId: this.userId, cell: cell},{sort: {total: -1}, limit: dl});
});

