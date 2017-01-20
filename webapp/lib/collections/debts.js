Debts = new Mongo.Collection('debts');

// Security Rules - deny all. This collection is for all intents R/O
Debts.deny({
  insert() { return true },
  update() { return true },
  remove() { return true },
});


// Schema

DebtsSchema = new SimpleSchema({
  userId: {
    type: String,
    label: "UserId",
  },


  name: {
    type: String,
    label: "Name",
    max: 30
  },

  type: {
    type: String,
    label: "Debt Type",
    allowedValues: ['auto', 'creditcard', 'education', 'mortgage', 'other'],
    defaultValue: 'creditcard',
  },

  balance: {
    type: Number,
    label: "Balance",
    defaultValue: 0,
  },

  limit: {
    type: Number,
    label: "Limit",
    defaultValue: 0,
  },

  interest_rate: {
    type: Number,
    defaultValue: 10,
    decimal: true
  },

  current_payment: {
    type: Number,
    defaultValue: 0
  },

  payoff_date: {
    type: Date,
    optional: true
  }

});

Debts.attachSchema(DebtsSchema);


Debts.helpers({

  icon: function () {
    const icons = {
      'auto': 'car icon',
      'creditcard': 'credit-card icon',
      'education': 'graduation-cap icon',
      'mortgage': 'home icon',
      'other': 'bank icon'
    };
    return icons[this.type];

  }
});


