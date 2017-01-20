/*****************************************************************************/
/* TransactionItem: Event Handlers */
/*****************************************************************************/
Template.TransactionItem.events({
  'click [name=isChecked]': function (e, tmpl) {
    var id = this._id;
    var isChecked = tmpl.find('input').checked;

    Transactions.update({_id: id}, {
      $set: {
        isChecked: isChecked
      }
    });
  },

  'click .podselect': function (e, tmpl) {

    var transactionId = tmpl.data._id;
    var podId = this._id;
    console.log("I am going to put " + transactionId + " into this pod: " + this.name);

    // put into the pod
    Transactions.update({_id: transactionId}, {$set: {pod: podId, isReviewed: true}});
  },

  'click .ignore-button': function (e, tmpl) {
    if (this.ignore === true) {
      ignoreTransaction = false;
    } else {
      ignoreTransaction = true;
    }

    Transactions.update({_id: this._id}, {$set: {ignore: ignoreTransaction, isReviewed: true}});
  },

  'click .select-row': function (e, t) {

    Router.go("/transaction/" + t.data._id);
  }

});

/*****************************************************************************/
/* TransactionItem: Helpers */
/*****************************************************************************/
Template.TransactionItem.helpers({

  roundedAmount: function () {
    return Math.round(this.amount);
  },

  calcColor: function () {

    if (this.amount < 0) {
      return "#43a047";
    } else {
      var analysis = Session.get("ANALYSIS");
      var spent_to_date = analysis[this.cell][this.date];
      var remaining = parseFloat(Meteor.user().profile.target[this.cell].amount - spent_to_date).toFixed(2);

      return ( remaining < 0 ? "#4db6ac" : "#ffa000");
    }

  },


  target_for_cell: function () {

    return Meteor.user().profile.target[this.cell].amount;

  },

  remaining_for_cell: function () {

    var analysis = Session.get("ANALYSIS");
    var spent_to_date = analysis[this.cell][this.date];

    return parseFloat(Meteor.user().profile.target[this.cell].amount - spent_to_date).toFixed(2);
  },

  moment: function () {
    return moment(this.date).fromNow();
  },

  prettyDate: function () {
    return moment(this.date).format("dddd, MMM DD, YYYY");
  },

  totalspent: function () {

    var spent = Session.get("ANALYSIS");
    return spent[this.cell][this.date];

  },



  cellinfo: function () {

    var cell = this.cell;
    if (cell != null) {
      var cellinfo = Cells.findOne({abbrev: cell});
      return cellinfo;
    } else {
      return "unknown";
    }
  },

  bgcolor: function () {
    if (this.cell === "") {
      return "#ffc400"
    } else {
      return "#26a69a"
    }
  },


  cells: function () {
    return Cells.find({}, {sort: {group: 1}});
  },


});

/*****************************************************************************/
/* TransactionItem: Lifecycle Hooks */
/*****************************************************************************/
Template.TransactionItem.onCreated(function () {
});

Template.TransactionItem.onRendered(function () {
});

Template.TransactionItem.onDestroyed(function () {
});
