SpendPlaces = new Mongo.Collection('spend_places');

if (Meteor.isServer) {
  SpendPlaces.deny({
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

Categorization = SimpleSchema({
  category_id: {
    type: String,
    label: "Category ID",
    max: 16,
  },
  cell: {
    type: String,
    label: "Cell",
    defaultValue: null,
    max: 4,
  },
  count: {
    type: Number,
    label: "Count",
    defaultValue: 0
  }

})

SpendPlacesSchema = SimpleSchema({

  name: {
    type: String,
    label: "Spend Place Name",
    max: 100,
  },

  categorization: {
    type: [Categorization],
    label: "Categorization"
  },

})
