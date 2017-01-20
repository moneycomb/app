UserStats = new Mongo.Collection('userstats');

// Deny all client-side updates on the Cells collection
// Best practice from: http://guide.meteor.com/security.html

UserStats.deny({
  insert() { return true },
  update() { return true },
  remove() { return true },
});

UserStats.helpers({
  
});

