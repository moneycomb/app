MyPurchasePlaces = new Mongo.Collection('my_purchase_places');

// Security Rules - deny all. This collection is for all intents R/O
MyPurchasePlaces.deny({
  insert() { return true },
  update() { return true },
  remove() { return true },
});


myPurchasePlacesSchema = SimpleSchema({

  name: {
    type: String,
    label: "Name",
    max:80
  },

  userId: {
    type: String,
    label: "User ID",
    max:20
  },

  cell: {
    type: String,
    label: "Cell",
    defaultValue: '',
    max: 5,
    optional: true
  },

  count: {
    type: Number,
    decimal: false,
    label: "Count",
    defaultValue: 0,
  },

  amount: {
    type: Number,
    decimal: true,
    label: "Total Amount",
    defaultValue: 0,
  },

  transactions: {
    type: [String],
    label: "Transaction Ids",
    optional: true
  },

  multiple: {
    type: Boolean,
    label: "Multiple Flag",
    defaultValue: false,
    optional: true
  },

  recurring: {
    type: Boolean,
    label: "Recurring Flag",
    defaultValue: false,
    optional: true
  },

  firstPurchase: {
    type: Date,
    label: "First Purchase Date",
    optional: true
  },

  lastPurchase: {
    type: Date,
    label: "Last Purchase Date",
    optional: true
  },

})


// MyPurchasePlaces.attachSchema(myPurchasePlacesSchema);

