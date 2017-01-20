Cells = new Mongo.Collection('cells');

// Deny all client-side updates on the Cells collection
// Best practice from: http://guide.meteor.com/security.html
Cells.deny({
  insert() { return true },
  update() { return true },
  remove() { return true },
});


Meteor.startup(function() {

  if (Meteor.isServer) {

    if (Cells.find().count() === 0) {

      cellIcons = [];
      cellButtons = [];

      var cells = JSON.parse(Assets.getText('cells.json'));

      _.each(cells, function (cell) {
        Cells.insert(cell);
        cellIcons[cell.number] = cell.icon;
        cellButtons[cell.number] = cell.button;
      });

      console.log(Cells.find().count() + ' cells loaded in DB');

    }
    ;


  }

});

Cells.helpers({

  cellColor: function() {
    return MoneyComb.singleCellColor(this.abbrev);
  },

  periodInDays: function() {

    var dayslookup = {
      'day': 1,
      'week': 7,
      'month': 30,
      'quarter': 92,
      'year': 365
    };

    return dayslookup[this.period];

  },

  overUnderColor: function() {
    let A = Allocations.findOne({userId: Meteor.userId()});
    let An = Analysis.findOne({userId: Meteor.userId()});

    let periodIndex = "t"+this.perioddays;

    let target = Number((A[this.abbrev].target / 30)* this.perioddays);
    let spend = An.cellSpend[this.abbrev][periodIndex].amount;

    /* return (spend <= target ? MoneyComb.singleCellColor(this.abbrev) : "#ff4081"); */

    return (spend <= target ? "#5fb7e5" : "#ff4081");

  },

  overUnderLabel: function() {
    let A = Allocations.findOne({userId: Meteor.userId()});
    let An = Analysis.findOne({userId: Meteor.userId()});

    let periodIndex = "t"+this.perioddays;

    let target = Number((A[this.abbrev].target / 30)* this.perioddays);
    let spend = An.cellSpend[this.abbrev][periodIndex].amount;

    return (spend <= target ? "UNDER" : "OVER");

  },

  overUnderAmount: function() {
    let A = Allocations.findOne({userId: Meteor.userId()});
    let An = Analysis.findOne({userId: Meteor.userId()});

    let periodIndex = "t"+this.perioddays;
    console.log("periodIndex = "+periodIndex);

    let target = Number((A[this.abbrev].target / 30)* this.perioddays);
    let spend = An.cellSpend[this.abbrev][periodIndex].amount;

    console.log("t,s=",target,spend);

    return parseFloat(Math.abs(target-spend)).toFixed(0);

  },

  avgPerPurchase: function() {
    let An = Analysis.findOne({userId: Meteor.userId()});
    let periodIndex = "t"+this.perioddays;

    let spend = An.cellSpend[this.abbrev][periodIndex].average;

    return "$"+parseFloat(spend).toFixed(0);

  },

  actualPerDay: function() {
    let An = Analysis.findOne({userId: Meteor.userId()});
    let periodIndex = "t"+this.perioddays;

    let spend = An.cellSpend[this.abbrev][periodIndex].amount;
    let days = Number(this.perioddays);

    return "$"+parseFloat(spend/days).toFixed(0);
  },

  countLast30: function() {
    let An = Analysis.findOne({userId: Meteor.userId()});
    return An.cellSpend[this.abbrev].t30.count;
  },

  actualLast30: function() {
    let An = Analysis.findOne({userId: Meteor.userId()});
    let spend = An.cellSpend[this.abbrev].t30.amount;
    return "$"+parseFloat(spend).toFixed(0);
  },

  actualLast60: function() {
    let An = Analysis.findOne({userId: Meteor.userId()});
    let spend = An.cellSpend[this.abbrev].t60.amount;
    return "$"+parseFloat(spend).toFixed(0);
  },

  actualLast90: function() {
    let An = Analysis.findOne({userId: Meteor.userId()});
    let spend = An.cellSpend[this.abbrev].t90.amount;
    return "$"+parseFloat(spend).toFixed(0);
  },

  actualLast365: function() {
    let An = Analysis.findOne({userId: Meteor.userId()});
    let spend = An.cellSpend[this.abbrev].t365.amount;
    return "$"+parseFloat(spend).toFixed(0);
  },

  actual30avg: function() {
    let An = Analysis.findOne({userId: Meteor.userId()});
    let spend = (An.cellSpend[this.abbrev].t90.amount + An.cellSpend[this.abbrev].t60.amount + An.cellSpend[this.abbrev].t30.amount)/3;
    return "$"+parseFloat(spend).toFixed(0);
  },

  isUnder: function() {
    let A = Allocations.findOne({userId: Meteor.userId()});
    let An = Analysis.findOne({userId: Meteor.userId()});

    let periodIndex = "t"+this.perioddays;

    let target = (A[this.abbrev].target/30)* this.perioddays;
    console.log('target='+target);

    let spend = An.cellSpend[this.abbrev][periodIndex].amount;

    return (spend <= target ? true : false);

  },

  calcColor: function() {
    return MoneyComb.singleCellColor(this.abbrev)
  },

  periodSpentString: function() {

    var dayslookup = {
      'day': 1,
      'week': 7,
      'month': 30,
      'quarter': 92,
      'year': 365
    };

    return "last "+dayslookup[this.period]+" days";

  },

  periodTargetString: function() {

    var dayslookup = {
      'day': 1,
      'week': 7,
      'month': 30,
      'quarter': 92,
      'year': 365
    };

    return "per "+dayslookup[this.period]+" days";

  },

  periodsInYear: function() {

    var dayslookup = {
      'day': 365,
      'week': 52,
      'month': 12,
      'quarter': 4,
      'year': 1
    };
    return dayslookup[this.period];
  },


  targetInWorkHours: function() {

    let hourlywage = Meteor.user().hourlyIncome();
    let target = Meteor.user().profile.target[this.abbrev].amount
    return parseFloat(target/hourlywage).toFixed(2);

  },






});

