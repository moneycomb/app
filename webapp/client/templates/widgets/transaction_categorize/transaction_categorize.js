/*****************************************************************************/
/* TransactionCategorize: Event Handlers */
/*****************************************************************************/
Template.TransactionCategorize.events({
  'click .cell-item': function (e, t) {

    var transactionId = this.data.tid;

    var cell = this.abbrev;

    sAlert.info("Recategorized as " + this.name, {timeout: 1000});

    // put in the cell
    Transactions.update({_id: transactionId}, {$set: {cell: cell}});
  },

});

/*****************************************************************************/
/* TransactionCategorize: Helpers */
/*****************************************************************************/
Template.TransactionCategorize.helpers({

  cells: function () {
    return Cells.find({}, {sort: {group: 1}});
  },

});

/*****************************************************************************/
/* TransactionCategorize: Lifecycle Hooks */
/*****************************************************************************/
Template.TransactionCategorize.onCreated(function () {
});

Template.TransactionCategorize.onRendered(function () {
});

Template.TransactionCategorize.onDestroyed(function () {
});
