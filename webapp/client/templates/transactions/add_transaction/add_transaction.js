/*****************************************************************************/
/* AddTransaction: Event Handlers */
/*****************************************************************************/
Template.AddTransaction.events({

  'mouseover .recathex': function(e,t) {
    var selector = e.currentTarget.id;
    var x = selector.split("-");
    var cell = x[1];
    t.hoverCell.set(cell);
  },

  'mouseleave .recathex': function(e,t) {

    let selector = e.currentTarget.id;
    var x = selector.split("-");
    var cell = x[1];
    t.hoverCell.set('u');
  },

  'click .recathex': function(e,t) {
    const selected = e.currentTarget.id;
    const x = selected.split("-");
    const newCell = x[1];
    t.spendCell.set(newCell);


  },

  'click .action-clear': function (e,t) {

    t.spendAmount.set(0);

  },

  'click .action-spend': function(e,t) {
    console.log(t);
    console.log(e);
    const amount = t.spendAmount.get();
    const cell = t.spendCell.get();
    let name = String($('#description').val()).trim();
    if (name == '' ) {
      name = `${MoneyComb.singlecellname(cell)} spending`;
    }
    const transaction = {
      name,
      amount,
      cell
    }

    // reset spend amount to zero in case of multiple entries
    t.spendAmount.set(0);

    Meteor.call('addTransaction',transaction, function() {
      sAlert.info(`Spent $${amount} - ${name}`);
      Meteor.call('updateSpendStatistics');
    });

  },


  'click .action-add': function (e,t) {

    console.log(e)
    const value = Number(e.currentTarget.id);

    t.spendAmount.set(t.spendAmount.get() + value);

  },

  'click .action-cell': function (e,t) {

    console.log(e)
    const value = String(e.currentTarget.id);

    t.spendCell.set(value);

  }

});

/*****************************************************************************/
/* AddTransaction: Helpers */
/*****************************************************************************/
Template.AddTransaction.helpers({
  today: function() {
    return new Date();
  },

  cells() {
    return Cells.find();
  },

  spendAmount() {
    return Template.instance().spendAmount.get();

  },
  spendCell() {
    return Template.instance().spendCell.get();

  },

  curCellSpendSpeed(cell) {

    let tf = 't30';
    if (cell == 't') { tf = 't365';}

    return calcSpendSpeed(cell,tf, 0, null);
  },

  afterCellSpendSpeed(cell,amount) {
    let tf = 't30';
    if (cell == 't') { tf = 't365';}
      console.log(amount);
    return calcSpendSpeed(cell,tf, Number(amount) ,null);
  },


  currentSpendSpeed: function() {
    let A = Allocations.findOne({userId: Meteor.userId()});
    let An = Analysis.findOne({userId: Meteor.userId()});

    let spent = An.totalSpend.t30.amount;
    let target = A.targetMoneyPot();
    let SS = parseFloat(spent/target*100).toFixed(0);
    return SS;
  },

  newSpendSpeed: function() {
    let A = Allocations.findOne({userId: Meteor.userId()});
    let An = Analysis.findOne({userId: Meteor.userId()});

    let spent = An.totalSpend.t30.amount + Template.instance().spendAmount.get();

    let target = A.targetMoneyPot();
    let SS = parseFloat(spent/target*100).toFixed(0);
    return SS;
  },

  cellImg(cell) {

    if (_.contains(['eo','ds','r','t','e','s','o','bf'],cell)) {
      return cell;
    } else {
      return 'u';
    }
  },

  today() {
    return moment().format("MM/DD/YY");
  },

  curColor() {
    let fillcolors = {eo: '#9e9e9e',ds: '#9e9e9e',r: '#9e9e9e',t: '#9e9e9e',e: '#9e9e9e',s: '#9e9e9e'};
    fillcolors[this.cell] = MoneyComb.singleCellColor(this.cell);

    return fillcolors;
  },

  spendLabel: function() {
    return MoneyComb.singlecellname(Template.instance().spendCell.get());
  },

  recatIColor: function (cell) {
    return ((Template.instance().hoverCell.get() == cell) || this.hoverCell == cell) ? MoneyComb.singleCellColor(cell) : "#848484"
  }



});

/*****************************************************************************/
/* AddTransaction: Lifecycle Hooks */
/*****************************************************************************/
Template.AddTransaction.onCreated(function () {
  this.spendAmount = new ReactiveVar(0);
  this.spendCell = new ReactiveVar("o");
  this.hoverCell = new ReactiveVar("o");
  this.spendLabel = new ReactiveVar(MoneyComb.singlecellname("o"));
});

Template.AddTransaction.onRendered(function () {
});

Template.AddTransaction.onDestroyed(function () {
});
