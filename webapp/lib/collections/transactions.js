Transactions = new Mongo.Collection('transactions');

// Security Settings

if (Meteor.isServer) {
  Transactions.allow({
    insert: function (userId, doc) {
      return userId === doc.userId;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return userId === doc.userId;
    },

    remove: function (userId, doc) {
      return userId === doc.userId;
    }
  });

}

// see: meteor add matb33:collection-hooks
Transactions.before.insert(function (userId, doc) {

  doc.createdAt = new Date();
  //doc.userId = userId;

});

// Collection Hooks - update
Transactions.before.update(function (userId, doc) {
  doc.updatedAt = new Date();
});


// Collection Helpers
Transactions.helpers({
  isInflow: function () {
    return this.amount < 0;
  },

  transactionIcon() {

    if (this.cell == "" || this.cell == null) {
      return "help icon";
    } else if (this.cell == "i") {
      return "money icon";
    } else {
      return "flaticon-" + this.cell;
    }

  },

  transactionAccount() {
    let A = FinAccounts.findOne({_id: this.account})
    if (A != undefined) {
      return A.meta.name;
    } else {
      // this would be the case for the demo user with made up transactions
      return "Unknown Account";
    }
  },

  transactionIconColor() {

    if (_.contains(["eo", "ds", "e", "t", "r", "s","bf"], this.cell)) {
      return MoneyComb.singleCellColor(this.cell);
    } else if (this.cell == "i") {
      return "green";
    } else {
      return "#424242";
    }
  },

  hasLocation() {
    return (this.meta.location != undefined)
  },

  Location() {
    let locationString = '';

    var {city, state, zip} = this.meta.location;
    if (this.meta.location.city != undefined)
    if (city != undefined) {
      locationString = locationString + city + ',';
    }

    if (state != undefined) {
      locationString = locationString + state + ',';
    }

    if (zip != undefined) {
      locationString = locationString + zip;
    }
    return locationString

  },

  amountStringRounded() {
    return "$" + this.amount.toFixed(0);
  },

  textCategory() {
    return _.last(this.category)
  },

  roundedAmount: function () {
    return Math.round(this.amount);
  },

  // helpers for categorization analysis
  categorizationLevel: function () {
    // 0,1,2,3 -- the "depth" of categorization from plaid for this transaction

    console.log(this.category);
    
    const catLevelLength = this.category.length;   // length of the category array...3 levels possible

    if (catLevelLength == undefined) {
      return 0;
    } else {
      return catLevelLength;
    }

  },

  amountString() {
    var x = Number(this.amount).toFixed(2);
    return "$" + x;
  },

  amountInWorkHours: function () {
    let hourlywage = Meteor.user().hourlyIncome();
    return parseFloat(this.amount / hourlywage).toFixed(2);

  },

  accountName() {
    return "Account Name TBD"
  },

  humanDate() {
    return moment(this.date).fromNow();
  },

  prettyDate: function () {
    return moment(this.date).format("dddd, MMM DD, YYYY");
  },

  shortDate: function () {
    return moment(this.date).format("MM/DD/YYYY");
  },

  cleanName: function () {
    var cn = this.name.replace('AUTHORIZED ON ', '');
    var lower = cn.toLowerCase();
    return lower.replace(/(^| )(\w)/g, function (x) {
      return x.toUpperCase();
    });
  },

  

  target_for_cell: function () {

    if (_.contains(["eo", "ds", "r", "t", "e", "s"], this.cell)) {
      let A = Allocations.findOne({userId: Meteor.userId()});
      if (A === undefined) console.log('ERROR: A not defined!');
      return A[this.cell].target;
    } else {
      return null;
    }

  },

  remaining_for_cell: function () {

    Meteor.subscribe("allocation");
    let A = Allocations.findOne({userId: Meteor.userId()});

    var analysis = Session.get("ANALYSIS");
    var spent_to_date = analysis[this.cell][this.date];

    return parseFloat(A[this.cell].target - spent_to_date).toFixed(2);
  },


});


/*
 Transactions.attachSchema(new SimpleSchema({
 plaid_account: {
 type: String,
 label: "Account ID",
 max: 200
 },
 plaid_id: {
 type: String,
 label: "Plaid Transaction ID",
 },

 amount: {
 type: Number,
 label: "Amount",
 },

 date: {
 type: Date,
 label: "Date",
 },

 name: {
 type: String,
 label: "Description",
 },

 pending: {
 type: Boolean,
 label: "Pending?"
 },

 category: {
 type: [String],
 label: "Category",
 optional: true
 },

 category_id: {
 type: String,
 label: "Category ID",
 optional: true
 },

 reviewed: {
 type: Boolean,
 label: "Reviewed",
 },

 pod: {
 type: String,
 label: "Pod",
 optional: true
 }

 }));
 */

/* Sample Transaction From Plaid Below
 {
 "_account": "8j65EPj5nksyoN34eyJqSPNxo3YNKYFyjn1E9",
 "_id": "O3aAvX3A4OIPQKBAmPOJUQgjm5j8j6f8bRomd",
 "amount": 2.04,
 "date": "2015-10-06",
 "name": "Nordstrom",
 "meta": {
 "location": {
 "address": "6910  Fayetteville Rd  Ste 500",
 "city": "Durham",
 "coordinates": {
 "lat": 35.902027,
 "lon": -78.939734
 },
 "state": "NC",
 "store_number": "0751",
 "zip": "27713"
 }
 },
 "pending": false,
 "type": {
 "primary": "place"
 },
 "category": [
 "Shops",
 "Department Stores"
 ],
 "category_id": "19018000",
 "score": {
 "location": {
 "address": 1,
 "city": 1,
 "state": 1,
 "zip": 1
 },
 "name": 1
 }

 */

