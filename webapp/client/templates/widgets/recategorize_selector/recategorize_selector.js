/*****************************************************************************/
/* RecategorizeSelector: Event Handlers */
/*****************************************************************************/
Template.RecategorizeSelector.events({

  'mouseover .cat-icon': function(e,t) {
    var selector = e.currentTarget.id;
    var x = selector.split("-");
    var cell = x[1];
    var hoverColor = MoneyComb.singleCellColor(cell);
    $('#'+selector).css('background-color',hoverColor);
    t.recatLabel.set(MoneyComb.singlecellname(cell));
  },

  'mouseleave .cat-icon': function(e,t) {

    let selector = e.currentTarget.id;
    var x = selector.split("-");
    var cell = x[1];

    if (t.data.cell == this.abbrev) { var RC = MoneyComb.singleCellColor(this.abbrev) } else { var RC ="#848484"}
    let hoverColor = MoneyComb.singleCellColor(cell)
    $('#'+selector).css('background-color',RC);
    t.recatLabel.set('Recategorize');
  },

  'click .cat-icon': function(e,t) {
    let transactionId = t.data.tid;

    let T = Transactions.findOne({_id: transactionId});

    // if the user clicked on the same category, let's take that to mean they want to subcategorize
    let currentCell = T.cell;
    let selector = e.currentTarget.id;
    var x = selector.split("-");
    var newCell = x[1];

    // console.log(transactionId,newCell);

    if (currentCell === newCell) {
      // Sub categorize!
      console.log('subcategorize!')
      $('#recat2-'+ transactionId).show();
    } else {
      // Re-categorize
      $('#recat-'+ transactionId).hide();
      $('#recat2-'+ transactionId).hide();
      Transactions.update({_id: transactionId}, {$set: {cell: newCell}});
      // now lets do it bulk style...
      Meteor.call('transactionsRecatByName',T.name,newCell,null,function(err,result){
        console.log("updating spend statistics...");
        Meteor.call('updateSpendStatistics');
      })
    }

  }
});

/*****************************************************************************/
/* RecategorizeSelector: Helpers */
/*****************************************************************************/
Template.RecategorizeSelector.helpers({
  cells: function() {
    return Cells.find();
  },

  recatLabel: function() {
    return Template.instance().recatLabel.get();
  },

  transId: function() {
    return Template.instance().data.tid;
  },

  recatIColor: function () {
    return (Template.instance().data.cell == this.abbrev) ? MoneyComb.singleCellColor(this.abbrev) : "#848484"
  }
});

/*****************************************************************************/
/* RecategorizeSelector: Lifecycle Hooks */
/*****************************************************************************/
Template.RecategorizeSelector.onCreated(function () {
  this.recatLabel = new ReactiveVar('Recategorize');
});

Template.RecategorizeSelector.onRendered(function () {
});

Template.RecategorizeSelector.onDestroyed(function () {
});
