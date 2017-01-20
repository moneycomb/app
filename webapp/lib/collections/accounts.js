FinAccounts = new Mongo.Collection('accounts');

// Acounts Security Settings. Only allow a user to see their own accounts

if (Meteor.isServer) {
  FinAccounts.allow({
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
FinAccounts.before.insert(function (userId, doc) {

  doc.createdAt = new Date();
  //doc.userId = userId;

});


FinAccounts.helpers({

  accountType: function() {

    if (this.type === "depository") {

      if (this.subtype === "checking") {
        return 'Checking';
      } else {
        return 'Savings';
      }

    } else {
      return 'Credit';
    }
  },

  isValidAccountType: function() {

    if (this.type === "depository") {
      return true
    } else if (this.type == "credit") {
      return true
    } else {
      return false
    }
  },

  accountImageIcon: function() {

    if (this.type === "depository") {

      if (this.subtype === "checking") {
        return 'checking-circ.png';
      } else {
        return 'savings-circ.png';
      }

    } else {
      return 'cc-circ.png';
    }
  },

  actualBalance: function() {
    return (this.type === "credit" ? this.balance.current : this.balance.current);
  },

  numTransactions: function() {
    let A = Analysis.findOne({userId: Meteor.userId()})
    return  ( A.account[this._id] != undefined ? A.account[this._id].count : "---" );
  },

  isCreditCard: function() {
    return (this.type == "credit")
  }

});

