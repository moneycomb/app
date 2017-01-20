/*****************************************************************************/
/* TransactionsDetail: Event Handlers */
/*****************************************************************************/
Template.TransactionsDetail.events({

  'click .cell-item': function (e, tmpl) {

    var transactionId = tmpl.data._id;
    var cell = this.abbrev;

    sAlert.info("Recategorized as " + this.name, {timeout: 1000});

    // put in the cell
    Transactions.update({_id: transactionId}, {$set: {cell: cell}});
  },

  'click .action-hide': function (e, t) {

    var transactionId = t.data._id;
    Transactions.update({_id: transactionId}, {$set: {ignore: true}});

  },

  'click .action-unhide': function (e, t) {

    var transactionId = t.data._id;
    Transactions.update({_id: transactionId}, {$set: {ignore: false}});

  },

  'click .action-edit': function (e,t) {

    Session.set("EDITMODE",true);
  },

  'click .action-cancel': function (e,t) {

    Session.set("EDITMODE",false);
    Session.set("ADJUSTMODE",false);

  },

  'submit .action-change': function (e, t) {
    e.preventDefault();
    var name = e.target.name.value;
    var transactionId = t.data.transaction._id;
    console.log(name);
    Transactions.update({_id: transactionId}, {$set: {name: name}});
    Session.set("EDITMODE",false);

  },

  'click .action-adjust': function (e, t) {

    Session.set("ADJUSTMODE",true);

    console.log(e);
    console.log(t);
    // Transactions.update({_id: transactionId}, {$set: {name: false}});

  },

  'click .action-rate': function(e,t) {

    let transactionId = t.data._id;
    let rating = e.currentTarget.id;

    Transactions.update({_id: transactionId}, {$set: {rating: rating}});

  },

  'submit .action-change-adjust': function (e, t) {
    e.preventDefault();

    var original_amount = 100;
    var amount = e.target.amount.value;
    var transactionId = t.data.transaction._id;
    Transactions.update({_id: transactionId}, {$set: {amount: amount, original_amount: original_amount}});
    Session.set("ADJUSTMODE",false);


    // Transactions.update({_id: transactionId}, {$set: {name: false}});

  },


});

/*****************************************************************************/
/* TransactionsDetail: Helpers */
/*****************************************************************************/
Template.TransactionsDetail.helpers({

  transaction(id) {
    return Transactions.findOne({_id: this.T._id})
  },

  thisImage: function() {
    let tIconImage = MoneyComb.singleIconImage(this.transaction.cell);
    return '/images/white/' + tIconImage + '.png';
  },

  hideunhide: function () {
    return (this.ignore == true ? "action-unhide" : "action-hide");
  },

  hideunhideicon: function () {
    return (this.ignore == true ? "unhide" : "hide");
  },

  hideunhidetext: function () {
    return (this.ignore == true ? "Unhide" : "Hide");
  },

  isHidden: function () {
    return (this.ignore == true);
  },
  
  prettyDate: function (date) {
    return moment(date).format("dddd, MMM DD, YYYY");
  },
  
  amountWithCommas: function () {
    return this.amount.toFixed(2);
  },

  cellabbrev: function () {
    var cell = Cells.findOne({abbrev: this.cell});
    return cell.abbrev;
  },

  cellIconColor: function () {
    var cell = Cells.findOne({abbrev: this.cell});
    return cell.colorm;
  },

  cellImage: function () {
    var cell = Cells.findOne({abbrev: this.cell});
    return cell.abbrev;
  }

});

/*****************************************************************************/
/* TransactionsDetail: Lifecycle Hooks */
/*****************************************************************************/
Template.TransactionsDetail.onCreated(function () {

  console.log(this.data);

});

Template.TransactionsDetail.onRendered(function () {
  
});

Template.TransactionsDetail.onDestroyed(function () {
});
