/*****************************************************************************/
/* TransactionsHome: Event Handlers */
/*****************************************************************************/
Template.TransactionsHome.events({
  'click .action-review': function (e,t) {
    Router.go("/transactions/uncategorized");
  },

  'click .action-hidden': function (e,t) {
    Router.go("/transactions/hidden");
  },

  'click .action-income': function (e,t) {
    Router.go("/income");
  },

  'click .action-recurring': function (e,t) {
    Router.go("/transactions/recurring");
  },

  'click .action-evaluatehome': function (e,t) {
    Router.go("/transactions");
  },

  'click .action-home': function (e,t) {
    let query = { 'cell': 'h'};
    Session.set('transactionQuery',query);
    Session.set('queryDescription','Home Transactions');
  },

  'click .action-new': function (e,t) {
    let query = { 'isNew': true};
    Session.set('transactionQuery',query);
    Session.set('queryDescription','New Transactions');
  },

  'click .action-ignored': function (e,t) {
    let query = { 'ignore': true};
    Session.set('transactionQuery',query);
    Session.set('queryDescription','Ignored Transactions');
  },

  'click .action-all': function (e,t) {
    let query = {};
    Session.set('transactionQuery',query);
    Session.set('queryDescription','All Transactions');
  },

  'click .action-unknown': function (e,t) {
    let query = {cell: null, ignore: false};
    Session.set('transactionQuery',query);
    Session.set('queryDescription','Unknown Transactions');
  },

  'click .view-subcat': function (e,t) {
    let query = {cell: e.currentTarget.id, ignore: false};
    Session.set('transactionQuery',query);
    Session.set('queryDescription','Subcat Transactions');
  },

  /*
  'click .action-other': function (e,t) {
    let query = {'cell': {'$nin': {'eo','ds','r','t','e','s'}}};
    Session.set('transactionQuery',query);
  },*/

  'click .action-review': function (e,t) {
    let query = { 'toReview': true};
    Session.set('transactionQuery',query);
  },

  'click .action-recent': function (e,t) {

    var startDate = moment().subtract(7, 'days').toDate();
    let query = { 'date': {$gte: startDate}};
    Session.set('transactionQuery',query);
  },

  'click .action-cell-categories': function (e,t) {
    let cell = String(e.currentTarget.id).split("-")[1];
    console.log(cell)
    let C = Cells.findOne({abbrev: cell});

    let query = { 'cell': cell};
    Session.set('transactionQuery',query);
    Session.set('queryDescription', C.name +' Transactions');
  }


});

/*****************************************************************************/
/* TransactionsHome: Helpers */
/*****************************************************************************/
Template.TransactionsHome.helpers({

  haveNew: function() {
    let num = Transactions.find({isNew:true}).count();
    return (num>0);
  },

  haveIgnored: function() {
    let A = Analysis.findOne({userId: Meteor.userId()});
    return (A.categorization.ignored >0)
  },

  haveUnknown: function() {
    let A = Analysis.findOne({userId: Meteor.userId()});
    return (A.categorization.uncategorized > 0);
  },

  numUnknown: function() {
    let A = Analysis.findOne({userId: Meteor.userId()});
    let numUn = A.categorization.uncategorized;
    console.log(numUn);

    return numUn;
  },

  numIsNew: function() {
    let num = Transactions.find({isNew:true}).count();
    return (num>0 ? num : null);
  },

  description: function() {
    return Session.get('queryDescription');
  },

  numToReview: function() {
    let num = Transactions.find({toReview:true}).count();
    return (num>0 ? num : '0');
  },

  numIgnored: function() {
    let A = Analysis.findOne({userId: Meteor.userId()});
    return A.categorization.ignored
  },

  numRecent: function() {
    let num = Transactions.find({ignore:true}).count();
    return (num>0 ? num : '');
  },

  numFees: function() {
    let num = Transactions.find({cell:'bf'}).count();
    return (num>0 ? num : '0');
  },

  numIncome: function() {
    let num = Transactions.find({cell:'i'}).count();
    return (num>0 ? num : '0');
  },

  numHome: function() {
    let num = Transactions.find({cell:'h'}).count();
    return (num>0 ? num : '0');
  },

  numMedical: function() {
    let num = Transactions.find({cell:'med'}).count();
    return (num>0 ? num : '0');
  },

  cells: function() {
    let cells = Cells.find();
    return cells;
  },

  // for cell "row"

  thisImage: function() {
    let tIconImage = MoneyComb.singleIconImage(this.abbrev);
    return '/images/white/' + tIconImage + '.png';
  },

  cellCount: function(cell) {
    let count = Transactions.find({cell: cell}).count();
  },

  selector: function() {
    return {ignore: false, cell: 'h'}
  }


});

/*****************************************************************************/
/* TransactionsHome: Lifecycle Hooks */
/*****************************************************************************/
Template.TransactionsHome.onCreated(function () {
  if (! Meteor.userId() ) { Router.go('/login')};
  var self = this;
  self.autorun(function () {
    // self.subscribe('allocation');
  });

  // Session.set('queryDescription','New Transactions');


});

Template.TransactionsHome.onRendered(function () {
  $('.menu .item')
    .tab()
  ;
});

Template.TransactionsHome.onDestroyed(function () {
});
