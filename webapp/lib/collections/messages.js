Messages = new Mongo.Collection('messages');

// Security Rules - deny all. This collection is for all intents R/O

if (Meteor.isServer) {
  Messages.deny({
    insert() { return true },
    update() { return true },
    remove() { return true },
  });

}



// Schema

MessagesSchema = new SimpleSchema({
  cell: {
    type: String,
    label: " Category Abbrev",
    defaultValue: null,
    max:2
  },

  type: {
    type: String,
    label: "CTA Type",
    allowedValues: ['info', 'trynew', 'meditation', 'statistic', 'quiz'],
    defaultValue: 'info',
  },

  points: {
    type: Number,
    label: "Honey Points",
    min: 0,
    max: 100,
    defaultValue: 0,
    optional: true
  },

  text: {
    type: String,
    min: 0,
    max: 180,
  }

});

Messages.attachSchema(MessagesSchema);


/*// Load Messages if the Database is empty
if (Messages.find().count() === 0) {

  var messages = JSON.parse(Assets.getText('messages.json'));

  _.each(messages, function (message) {
    Messages.insert(message);
  });

  console.log(Messages.find().count() + ' messages loaded in DB');

}
;*/

