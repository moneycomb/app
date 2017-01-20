/*****************************************************************************/
/* ShowCell: Event Handlers */
/*****************************************************************************/
Template.ShowCell.events({
  'click .action-help-spendcard': function (e, t) {

    $('.ui.modal.help-evaluate')
      .modal('show')
  }

});

/*****************************************************************************/
/* ShowCell: Helpers */
/*****************************************************************************/
Template.ShowCell.helpers({
  query: function() {
    return 'yo!';
  },

  transactions: function() {
    return Transactions.find({},{limit: 10})
  },

  subcells: function() {
    return SubCells.find({parent: this.cell})
  },

  parentCell: function () {
    return Template.instance().data.cell
  },

  subCellDetails: function (subcell,tf) {
    const An = Analysis.findOne({userId: Meteor.userId()})
    console.log(An.subcellSpend[subcell])
    return An.subcellSpend[subcell][tf]
  },

  places: function() {
    return MyPurchasePlaces.find({},{sort: {count:-1}, limit: 10})
  }

});

/*****************************************************************************/
/* ShowCell: Lifecycle Hooks */
/*****************************************************************************/
Template.ShowCell.onCreated(function () {
  console.log(this);
});

Template.ShowCell.onRendered(function () {
  // Subscribe to subscriptions at the Template level
  var self = this;
  console.log(self);
  self.autorun(function() {
    self.subscribe('MyPurchasePlaces',Meteor.userId(),self.data.cell);
  });
});

Template.ShowCell.onDestroyed(function () {
});
