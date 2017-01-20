/*****************************************************************************/
/* SubCellSelector: Event Handlers */
/*****************************************************************************/
Template.SubCellSelector.events({
  
  'mouseover .subcat-icon': function(e,t) {
    var selector = e.currentTarget.id;
    var x = selector.split("-");
    var cell = x[2];
    var hoverColor = MoneyComb.singleCellColor(cell);
    $('#'+selector).css('background-color',hoverColor);
    t.recatLabel.set(MoneyComb.singlecellname(cell));
  },

  'mouseleave .subcat-icon': function(e,t) {

    let selector = e.currentTarget.id;
    var x = selector.split("-");
    var cell = x[2];
    let hoverColor = MoneyComb.singleCellColor(cell)
    $('#'+selector).css('background-color','#848484');
    t.recatLabel.set('Subcategorize');
  },

  'click .subcat-icon': function(e,t) {
    let transactionId = t.data.tid;

    let T = Transactions.findOne({_id: transactionId});

    // if the user clicked on the same category, let's take than to mean they want to subcategorize
    let currentSubCell = T.subcell;
    let selector = e.currentTarget.id;
    var x = selector.split("-");
    var newSubCell = x[2];


    if (currentSubCell === newSubCell) {
      // Sub categorize!
      console.log('No change...')
      $('#recat2-'+ transactionId).hide();
    } else {
      // Sub-categorize
      $('#recat2-'+ transactionId).hide();
      $('#recat-'+ transactionId).hide();
      Transactions.update({_id: transactionId}, {$set: {cell: T.cell, subcell: newSubCell}});
      // now lets do it bulk style...
      Meteor.call('transactionsRecatByName',T.name,T.cell,newSubCell,function(err,result){
        Meteor.call('updateSpendStatistics');
      })
    }

  }

});

/*****************************************************************************/
/* SubCellSelector: Helpers */
/*****************************************************************************/
Template.SubCellSelector.helpers({

  subcellColor: function() {
    return MoneyComb.singleCellColor(this.cell)
  },

  subcells: function() {
    return SubCells.find({parent: this.cell});
  },

  recatLabel: function() {
    return Template.instance().recatLabel.get();
  },

  transId: function() {
    return Template.instance().data.tid;
  }
});

/*****************************************************************************/
/* SubCellSelector: Lifecycle Hooks */
/*****************************************************************************/
Template.SubCellSelector.onCreated(function () {
  this.recatLabel = new ReactiveVar('Sub Categorize');
  // Subscribe to subscriptions at the Template level
  var self = this;
  self.autorun(function() {
    self.subscribe('subcells.bycell',self.data.cell);
  });
});

Template.SubCellSelector.onRendered(function () {
});

Template.SubCellSelector.onDestroyed(function () {
});
