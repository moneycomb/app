// this file is just a stub file for Meteors built in users collection

Meteor.users.allow({
  insert: function (userId, doc) {
    return true;
  },

  update: function (userId, doc, fieldNames, modifier) {
    return userId === doc.userId;
  },
});


MCUserSchema = new SimpleSchema({
  'profile.first_name': {
    type: String,
    label: "First Name",
    max: 15,
  },

  'profile.last_name': {
    type: String,
    label: "Last Name",
    max: 25,
  },

  'profile.email_address': {
    type: SimpleSchema.RegEx.Email,
    label: "Email address",
  },

  'profile.mobile_number': {
    type: SimpleSchema.RegEx.Phone,
    label: "Mobile Number",
    optional: true
  },

});

// Meteor.users.profile.attachSchema(UsersSchema);


// see: meteor add matb33:collection-hooks
Meteor.users.before.insert(function (userId, doc) {
  doc.createdAt = new Date();
  _.extend(doc.profile,{createdAt: new Date()});
});

// Collection Hooks - update
Meteor.users.before.update(function (userId, doc) {
  doc.profile.updatedAt = new Date();
});


Meteor.users.helpers({

  autohive: function () {

    var g = this.profile.gender.charAt(0);
    var s = this.profile.status.charAt(0);


    // stub for cost of living

    var col = 1;

    // income tier


    var i = MoneyComb.income_tier(this.profile.income * this.profile.pay_period);

    // stub for moneytype
    var mt = 1;

    return s + g + i + col + mt;

  },

  hasAccounts: function() {
    let numAccounts = FinAccounts.find({userId: this.userId}).count();
    return (numAccounts != 0);
  },

  hasNoAccounts: function() {
    let numAccounts = FinAccounts.find({userId: this.userId}).count();
    return (numAccounts == 0);
  },

  gravatar: function () {

    const options = {
      default: "http://demo.moneycomb.co/images/mcuser.png",
    }

    return Gravatar.imageUrl(this.primaryemail(),options);
  },


  primaryemail: function () {
    return this.emails[0].address;
  },

  grossincome: function () {

    let profile = FinancialProfile.findOne({userId: Meteor.userId()});

    return profile.income * profile.pay_period;
  },

  hourlyIncome: function () {

    let profile = FinancialProfile.findOne({userId: this.id});
    let gross = profile.income * profile.pay_period;
    // need to factor in vacation days. for now lets assume 2 weeks
    const annual_work_hours = 50 * 40;
    return parseFloat(gross / annual_work_hours).toFixed(2);
  },

  percentCategorized: function() {
    let An = Analysis.findOne({userId: this._id});

  },



  status: function (tf) {
    var xstatus = {};

    let A = Allocations.findOne({userId: this._id});
    let An = Analysis.findOne({userId: this._id});
    
    xstatus['eo'] = (A['eo'].target < An.cellSpend.eo[tf].amount);
    xstatus['ds'] = (A['ds'].target < An.cellSpend.ds[tf].amount);
    xstatus['e'] = (A['e'].target < An.cellSpend.e[tf].amount);
    xstatus['t'] = (A['t'].target < An.cellSpend.t[tf].amount);
    xstatus['r'] = (A['r'].target < An.cellSpend.r[tf].amount);
    xstatus['s'] = (A['s'].target < An.cellSpend.s[tf].amount);

    return xstatus;

  },


  actualMoneyPot: function () {

    let An = Analysis.findOne({userId: this._id});
    let total = An.cummulativeTotal('t30');

    return parseFloat(total).toFixed(0);

  },


  overunder: function () {
    let A = Allocations.findOne({userId: this._id});
    return A.targetMoneyPot() - this.actualMoneyPot();
  },


});

