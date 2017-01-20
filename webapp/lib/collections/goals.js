Goals = new Mongo.Collection('goals');

// Security Rules - deny all. This collection is for all intents R/O
Goals.allow({
  insert: function (userId, doc) {
    return doc && doc.userId === userId;
  },
  update: function (userId, doc) {
    return doc && doc.userId === userId;
  },
  remove(userId, doc) {
    return doc && doc.userId === userId;
  }
});

Goals.helpers({
  statement: function () {
    return `I am saving ${this.value} every ${this.period} for ${this.purpose}`
  }
});


