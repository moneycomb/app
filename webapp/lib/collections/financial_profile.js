FinancialProfile = new Mongo.Collection('financialprofile');

FinancialProfile.allow({
  insert: function (userId, doc) {
    return doc && doc.userId === userId;
  },
  update: function (userId, doc) {
    return doc && doc.userId === userId;
  },
  remove() {
    return false;
  }
});


FinancialProfileSchema = new SimpleSchema({

  userId: {
    type: String,
    label: "User ID",
    optional: true,
    autoform: {
      type: "hidden"
    }
  },

  'age': {
    type: Number,
    label: "Age",
    min: 18,
    max: 100,
  },

  'gender': {
    type: String,
    label: "Gender",
    allowedValues: ['male', 'female'],
    defaultValue: 'female',
  },

  'zipcode': {
    type: String,
    label: "US Zip Code",
    regEx: SimpleSchema.RegEx.ZipCode,

  },

  'status': {
    type: String,
    label: "Status",
    allowedValues: ['single', 'married'],
    defaultValue: 'single',
    max: 7,
  },

  'income': {
    type: Number,
    label: "Income",
  },

  'pay_period': {
    type: Number,
    label: "Pay Period",
    allowedValues: [1, 12, 26, 52, 2000],
    defaultValue: 1
  },

  'honeypoints': {
    type: Number,
    defaultValue: 0
  },

  'autohive': {
    type: String,
    defaultValue: '*****',
    optional: true
  }

});

FinancialProfile.attachSchema(FinancialProfileSchema);


// see: meteor add matb33:collection-hooks
FinancialProfile.before.insert(function (userId, doc) {

  doc.createdAt = new Date();

});

// Collection Hooks - update
FinancialProfile.before.update(function (userId, doc) {
  doc.updatedAt = new Date();
});


FinancialProfile.helpers({
  gross_income: function () {
    return this.income * this.pay_period;
  },

  income_decile: function () {
    var gross_income = this.income * this.pay_period;

    let decile_limits = [0, 11165, 18362, 26784, 35682, 46615, 59549, 75977, 99623, 140196];
    for (var i = 9; i >= 0; i--) {
      if (gross_income > decile_limits[i]) {
        console.log("decile = " + i);
        return i + 1
      }
    }

    return "ERROR"

  },

  whichHive: function () {

    // first income
    if (this.income < 30000) {
      var Income = 1
    } else if (this.income < 60000) {
      var Income = 2
    } else if (this.income < 140000) {
      var Income = 3
    } else {
      var Income = 4
    }

    //status
    var Status = this.status.substring(0, 1);

    // age
    if (this.age < 30) {
      var Age = 2
    } else if (this.age < 40) {
      var Age = 3
    } else if (this.age < 50) {
      var Age = 4
    } else if (this.age < 60) {
      var Age = 5
    } else if (this.age < 70) {
      var Age = 6
    } else {
      var Age = 7
    }

    //status
    var Gender = this.gender.substring(0, 1);

    // MMS
    var MMS = "*"

    return Income + Status + Age + Gender + MMS
  }


});

