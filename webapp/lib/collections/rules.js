Rules = new Mongo.Collection('rules');

// Security Rules - deny all. This collection is for all intents R/O
Rules.deny({
  insert() { return true },
  update() { return true },
  remove() { return true },
});

RulesSchema = new SimpleSchema({
  description: {
    type: String,
    label: "Name of Rule",
    max: 80,
    optional: true
  },

  action: {
    type: String,
    label: "Action",
    allowedValues: ['mark_reviewed','ignore','flag_for_review','categorize','activity'],
    defaultValue: 'categorize'
  },

  target_cell: {
    type: String,
    label: "Cell",
    optional: true

  },

  createdAt: {
    type: Date,
    label: "Created At",
    autoValue: function() {
      return new Date();
    },
    autoform: {
      type: 'hidden'
    }
  },

  // criteria fields. this will be ANDED together by default

  category_id: {
    type: String,
    label: "Category ID",
    optional: true
  },

  category: {
    type: String,
    label: "Category Name",
    optional: true,
    max: 80
  },

  amount: {
    type: Number,
    label: "Amount",
    decimal: true,
    optional: true

  },

  age: {
    type: Number,
    label: "Age (in days)",
    optional: true
  }


});

Rules.attachSchema(RulesSchema);

