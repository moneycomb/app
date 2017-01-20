
/*****************************************************************************/
/* CellsDetail: Event Handlers */
/*****************************************************************************/
Template.CellsDetail.events({
  'click .sort-amount': function() {
    console.log('sort by amount');

  },
  'click .sort-date': function() {
    console.log('sort by date');
  },
  'click .sort-rating': function() {
    console.log('sort by rating');
  },

  'click .change-timeframe': function (e,t) {
    const selected = e.currentTarget.id;
    t.timeframe.set(selected);
    Session.set("global_timeframe",selected);
  },

  'click .load-more': function (e,t) {
    const newAmountToLoad = t.numLoaded.get() + 10;
    t.numLoaded.set(newAmountToLoad);

  }

});

/*****************************************************************************/
/* CellsDetail: Helpers */
/*****************************************************************************/
Template.CellsDetail.helpers({

  places: function () {
    return MyPurchasePlaces.find({cell: this.abbrev});
  },

  statusString: function() {

    let A = Allocations.findOne({userId: Meteor.userId()});
    let An = Analysis.findOne({userId: Meteor.userId()});
    let periodIndex = Template.instance().timeframe.get()

    const targetPerDay = "$"+parseFloat(A[this.abbrev].target/30).toFixed(0)+" per day";
    const tActualPerDay = "$"+parseFloat(An.cellActualPerDay(this.abbrev,periodIndex)).toFixed(0)+" per day";

    return "Target: "+targetPerDay+"/ Actual: "+ tActualPerDay;
  },

  featured: function() {
    const SS =  SpendSuggestions.find({cell: this.abbrev, featured: true},{fields:{_id:1}}).fetch();
    const featuredIds = _.pluck(SS,'_id');
    const choice = _.sample(featuredIds);

    return SpendSuggestions.findOne({_id: choice});
  },

  
  spendSpeed: function() {
    let A = Allocations.findOne({userId: Meteor.userId()});
    let An = Analysis.findOne({userId: Meteor.userId()});

    let P = Template.instance().timeframe.get()
    let numDays = Number(Template.instance().timeframe.get().substring(1));  // t30 --> 30

    let spent = An.cellSpendCummulative(this.abbrev,P)
    let target = A[this.abbrev].target/30* numDays;

    let SS = parseFloat(spent/target*100).toFixed(0);
    return SS;

  },

  selector: function () {
    console.log("selector helper. abbrev is %s",this.abbrev)
    return {cell: this.abbrev}
  },

  timeframe: function() {
    return Template.instance().timeframe.get()
  },

  
  hasmore: function () {
    return Template.instance().transactions().count() >= Template.instance().limit.get();
  },

  allocation: function () {
    return Allocations.findOne({userId: Meteor.userId()});
  },

  fullanalysis: function () {
    return Analysis.findOne({userId: Meteor.userId()});
  },

  analysis: function () {
    let An = Analysis.findOne({userId: Meteor.userId()});
    return An.cellSpend[this.abbrev];
  },

/*
  cellColor: function() {
    return MoneyComb.singleCellColor(this.abbrev);
  },
*/

  periodString: function () {
    const current = Template.instance().timeframe.get()
    return "last "+current.substring(1)+" days";
  },

  targetBudget: function() {

    let A = Allocations.findOne({userId: Meteor.userId()});
    let numDays = Number(Template.instance().timeframe.get().substring(1));  // t30 --> 30
    let target = A[this.abbrev].target/30* numDays;

    console.log("TARGET BUDGET=" + target);

    return parseFloat(target).toFixed(0);
  },

  targetPerDay: function() {
    let A = Allocations.findOne({userId: Meteor.userId()});

    return "$"+parseFloat(A[this.abbrev].target/30).toFixed(0);
  },

  tActualPerDay: function () {
    let An = Analysis.findOne({userId: Meteor.userId()});
    let periodIndex = Template.instance().timeframe.get()
    return "$"+parseFloat(An.cellActualPerDay(this.abbrev,periodIndex)).toFixed(0)
  },

  tAveragePurchase: function () {
    let An = Analysis.findOne({userId: Meteor.userId()});
    let periodIndex = Template.instance().timeframe.get()
    return "$"+parseFloat(An.cellAveragePurchase(this.abbrev,periodIndex)).toFixed(0)
  },

  lighterColor: function() {
    return MoneyComb.LightenDarkenColor(this.color,-20);
  },

  spentThisPeriod: function() {
    let An = Analysis.findOne({userId: Meteor.userId()});
    let periodIndex = Template.instance().timeframe.get()

    return parseFloat(An.cellSpendCummulative(this.abbrev,periodIndex)).toFixed(0);
  },

  transactionsThisPeriod: function() {
    let An = Analysis.findOne({userId: Meteor.userId()});
    let periodIndex = Template.instance().timeframe.get()
    return parseFloat(An.cellCountCummulative(this.abbrev,periodIndex)).toFixed(0);

  },

  tPeriodInDays: function() {
    return Number(Template.instance().timeframe.get().substring(1));
  },


  adjustedTarget: function() {
    let A = Allocations.findOne({userId: Meteor.userId()});
    // this is the adjusted target for the next X days taking into
    // account the fact they may have under or overspent
    let regularTarget = parseFloat(A[this.abbrev].target).toFixed(0);
  },

  periodStart: function() {
    let numDays = Number(Template.instance().timeframe.get().substring(1));
    return moment().subtract(numDays,'d').format("YYYY-MM-DD");
  },

  periodEnd: function() {
    return moment().format("YYYY-MM-DD");
  },

  spendSeries: function() {


    var spendSeries = {}

    let An = Analysis.findOne({userId: Meteor.userId()});
    var SS = An.spendSeries[this.abbrev];

    let now = moment();

    const currentTF = Template.instance().timeframe.get()

    let lookBack = Number(currentTF.substring(1))-1
    let startOfPeriod = moment(now).subtract(lookBack,'d')
    let future = moment(now).add(this.periodInDays(),'d')

    // Build cummulative spend graph
    var sum = 0;
    for (i = moment(startOfPeriod); i <= now; i.add(1,"d")) {
      var dateIndex = i.format("YYYY-MM-DD")
      if (_.has(SS,dateIndex)) {
        sum += SS[dateIndex]
      }
      spendSeries[dateIndex] = sum
    }

    return _.values(spendSeries)

  },

  tfColor: function(tf) {
    const current = Template.instance().timeframe.get()
    return (tf ==  current ? "white" : "#424242")
  },

  tfbgColor: function(tf) {
    const current = Template.instance().timeframe.get()
    return (tf ==  current ? MoneyComb.singleCellColor(this.abbrev) : "#848484")
  },


  timesOverLastMonth: function () {

    var now = moment();
    var thirtyDaysAgo = moment().subtract(30, 'd');
    var startOfYear = moment().startOf('year');
    var startOfMonth = moment().startOf('month');
    var startOfQuarter = moment().startOf('quarter');

    return Transactions.find({cell: this.abbrev, date: {$gt: startOfYear.format()}}).count();

  },

  tOverUnderColor: function() {
    let A = Allocations.findOne({userId: Meteor.userId()});
    let An = Analysis.findOne({userId: Meteor.userId()});

    let periodIndex = Template.instance().timeframe.get()
    let numDays = Number(Template.instance().timeframe.get().substring(1));  // t30 --> 30

    let target = Number((A[this.abbrev].target / 30)* numDays);
    let spend = An.cellSpendCummulative(this.abbrev,periodIndex)

    return (spend <= target ? MoneyComb.singleCellColor(this.abbrev) : "#ff4081");

  },

  tIsUnder: function() {
    let A = Allocations.findOne({userId: Meteor.userId()});
    let An = Analysis.findOne({userId: Meteor.userId()});

    let periodIndex = Template.instance().timeframe.get()
    let numDays = Number(Template.instance().timeframe.get().substring(1));  // t30 --> 30

    let target = (A[this.abbrev].target/30)* numDays;

    let spend = An.cellSpendCummulative(this.abbrev,periodIndex)

    return (spend <= target ? true : false);

  },

  subcells: function () {
    console.log("looking for subcells for %s", this.abbrev)
    const SC = SubCells.find({parent: this.abbrev})
    return SC
  },

  tOverUnderLabel: function() {
    let A = Allocations.findOne({userId: Meteor.userId()});
    let An = Analysis.findOne({userId: Meteor.userId()});

    let periodIndex = Template.instance().timeframe.get()
    let numDays = Number(Template.instance().timeframe.get().substring(1));  // t30 --> 30

    let target = Number((A[this.abbrev].target / 30)* numDays);
    let spend = An.cellSpendCummulative(this.abbrev,periodIndex)

    return (spend <= target ? "UNDER" : "OVER");

  },

  transactions() {
    console.log(`Now I am getting ${this.abbrev}`);
    let numLoaded = Template.instance().numLoaded.get();
    Meteor.subscribe('Transactions.last30days',this.abbrev);

    return Transactions.find({userId: Meteor.userId(), cell: this.abbrev},{sort: { date: -1}, limit: numLoaded});
  },

  tOverUnderAmount: function() {
    let A = Allocations.findOne({userId: Meteor.userId()});
    let An = Analysis.findOne({userId: Meteor.userId()});

    let periodIndex = Template.instance().timeframe.get()
    let numDays = Number(Template.instance().timeframe.get().substring(1));  // t30 --> 30


    let target = Number((A[this.abbrev].target / 30)* numDays);
    let spend = An.cellSpend[this.abbrev][periodIndex].amount;

    return parseFloat(Math.abs(target-spend)).toFixed(0);

  },


});

/*****************************************************************************/
/* CellsDetail: Lifecycle Hooks */
/*****************************************************************************/
Template.CellsDetail.onCreated(function () {

  // Go to home page if we are not logged in
  if (! Meteor.userId() ) { Router.go('/login')};

  var self = this;

  // initialize the reactive variables
  self.numLoaded = new ReactiveVar(10);
  self.timeframe = new ReactiveVar('t30');
  Session.set("global_timeframe",'t30');

  // Subscribe to subscriptions at the Template level

  self.autorun(function () {
    console.log(`Subscribing for ${self.data.abbrev}`);

    self.subscribe('SpendSuggestions.featured');
    self.subscribe('Transactions.last30days',self.data.abbrev);
    // self.subscribe('account_transactions', self.data.cell, {sort:{date: -1}, limit: loaded});
    self.subscribe('MyPurchasePlaces',self.data.abbrev,5);
  });

});

Template.CellsDetail.onRendered(function () {

});

Template.CellsDetail.onDestroyed(function () {
});
