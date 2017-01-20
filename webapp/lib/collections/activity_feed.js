ActivityFeed = new Mongo.Collection('activityfeed');

// Security Rules - deny all. This collection is for all intents R/O

if (Meteor.isServer) {
  ActivityFeed.deny({
    insert() { return true },
    update() { return true },
    remove() { return true },
  });

}

