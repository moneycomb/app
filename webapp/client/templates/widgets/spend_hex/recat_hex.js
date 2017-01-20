/*****************************************************************************/
/* SpendHex: Event Handlers */
/*****************************************************************************/
Template.SpendHex.events({
  'click .SpendHex': function(e,t) {
    const selected = e.currentTarget.id;
    const x = selected.split("-");
    const transactionId = x[0];
    const newCell = x[1];
    // console.log(`would recategorize ${x[0]} as ${newCell}`);
    Transactions.update({_id: transactionId}, {$set: {cell: newCell}});
    // now lets do it bulk style...

    let T = Transactions.findOne({_id: transactionId});
    Meteor.call('transactionsRecatByName',T.name,newCell,null,function(err,result){
      console.log(result);

      // if we've made bulk changes,let the use know..
      if (result.numUpdated > 1) {
        var bulkphrase = `(including ${result.numUpdated} others)`;
      } else {
        var bulkphrase = "";
      }

      console.log("updating spend statistics...");
      Meteor.call('updateSpendStatistics');
      sAlert.success(`${T.name}  recategorized as ${MoneyComb.singlecellname(newCell)} ${bulkphrase}`);
    })
  },

  'mouseover .SpendHex': function(e,t) {
    var selector = e.currentTarget.id;
    var x = selector.split("-");
    var cell = x[1];
    t.recatLabel.set(MoneyComb.singlecellname(cell));
    t.recatCell.set(cell);
  },

  'mouseleave .SpendHex': function(e,t) {

    let selector = e.currentTarget.id;
    var x = selector.split("-");
    var cell = x[1];
    t.recatLabel.set(MoneyComb.singlecellname(this.cell));
    t.recatCell.set('u');
  }

});

/*****************************************************************************/
/* SpendHex: Helpers */
/*****************************************************************************/
Template.SpendHex.helpers({
  curColor() {
    let fillcolors = {eo: '#9e9e9e',ds: '#9e9e9e',r: '#9e9e9e',t: '#9e9e9e',e: '#9e9e9e',s: '#9e9e9e'};
    fillcolors[this.cell] = MoneyComb.singleCellColor(this.cell);

    return fillcolors;
  },

  recatLabel: function() {
    return Template.instance().recatLabel.get();
  },

  recatIColor: function (cell) {
    return ((Template.instance().recatCell.get() == cell) || this.cell == cell) ? MoneyComb.singleCellColor(cell) : "#848484"
  }

});

/*****************************************************************************/
/* SpendHex: Lifecycle Hooks */
/*****************************************************************************/
Template.SpendHex.onCreated(function () {
  this.recatLabel = new ReactiveVar(MoneyComb.singlecellname(this.data.cell));
  this.recatCell = new ReactiveVar('o');
});

Template.SpendHex.onRendered(function () {
});

Template.SpendHex.onDestroyed(function () {
});
