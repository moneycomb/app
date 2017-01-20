Tags = new Mongo.Collection('tags');


if (Meteor.isServer) {
  Tags.deny({
    insert: function (userId, doc) {
      return true;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return true;
    },

    remove: function (userId, doc) {
      return true;
    }
  });
}


TagsSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Name",
    defaultValue: null,
    max: 40
  },

  group: {
    type: Number,
    label: "Group",
  },

  userId: {
    type: String,
    max: 20,
    optional: true
  }

});

Meteor.startup(function() {

  if (Meteor.isServer) {

    if (Tags.find().count() === 0) {

      var tags = JSON.parse(Assets.getText('tags.json'));

      _.each(tags, function (tag) {
        Tags.insert(tag);
      });

      console.log(Tags.find().count() + ' tags loaded in DB');
    }

  }

});

Tags.helpers({


});

