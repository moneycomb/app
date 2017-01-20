SpendSuggestions = new Mongo.Collection('spend_suggestions');


if (Meteor.isServer) {
  SpendSuggestions.allow({
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

SpendSuggestionsSchema = new SimpleSchema({
  title: {
    type: String,
    label: "Title",
    max: 50,
  },

  text: {
    type: String,
    label: "Description Text",
    max: 300,
  },

  science_text: {
    type: String,
    label: "Spend Science Text",
    max: 300,
  },

  image: {
    type: String,
    label: "Image",
    max: 50,
  },


  cell: {
    type: String,
    label: "Cell",
    allowedValues: ['eo','ds','r','t','e','s','all'],
    defaultValue: 'all'
  },

  subcell: {
    type: String,
    label: "Sub Cell",
    allowedValues: ['all','fuel','groc'],
    defaultValue: 'all'
  },

  featured: {
    type: Boolean,
    defaultValue: false
  },

  userContributed: {
    type: Boolean,
    defaultValue: false
  },

  userId: {
    type: String,
    defaultValue: '',
    optional: true,
  },


  numCommitted: {
    type: Number,
    defaultValue: 0
  },

  numDone: {
    type: Number,
    defaultValue: 0
  }

});

SpendSuggestions.attachSchema(SpendSuggestionsSchema);
