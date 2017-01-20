/*****************************************************************************/
/* SpendSetter: Event Handlers */
/*****************************************************************************/
Template.SpendSetter.events({

  'click .add-to': function (e, t) {

    e.preventDefault();

    let locked = t.lockedStatus.get(this.abbrev);
    // console.log("Locked=" + locked)

    if (!locked) {

      // there is still one corner case to detect immediately:
      // all the other cells are locked AND total is locked..
      var lockedStatus = _.values(t.lockedStatus.keys);
      var X = _.filter(lockedStatus, function(status){ return status == 'true'; })
      var numLocked = X.length
      if (t.totalLocked.get() && numLocked == 5) {
        console.warn("corner case...do nothing: total locked, 5 cat locked")
        return
      }

      var SV = Session.get("adjustedTarget");
      let curTarget = parseFloat(SV[this.abbrev]).toFixed(2);

      let newTarget = Number(MoneyComb.NearestUpper(curTarget, 25));

      SV[this.abbrev] = newTarget;
      Session.set('adjustedTarget', SV);

      // ALLOCATION START
      var amountToRemove = Number(curTarget - newTarget);
      var amountToAdd = Number(newTarget - curTarget);

      let totalLocked = t.totalLocked.get();
      // console.log("TL=" + totalLocked)

      if (totalLocked == true) {
        // The total is locked.. we need to re-allocate amount remaining unlocked.
        // Corner case: unless all the others are LOCKED! (see above)

        let lockedStatus = t.lockedStatus.keys;
        let SV = Session.get("adjustedTarget");

        // RE_ALLOCATION FUNCTION
        var newAllocations = MoneyComb.reAllocate(SV, lockedStatus, this.abbrev, amountToRemove);

        // console.log("NEW ALLOCATION:");
        // console.log(newAllocations);
        Session.set('adjustedTarget', newAllocations);


      } else {
        // Total is unlocked. So we just add it to the total
        let newTotalTarget = Number(Session.get("adjustedTotal")) + amountToAdd;
        // console.log(amountToAdd);
        // console.log(Session.get("adjustedTotal"));
        // console.log(newTotalTarget);
        Session.set("adjustedTotal", Number(newTotalTarget));
      }

      // END of reallocation


    } else {
      // The category clicked on is locked. So we essentially ignore the event
      // console.log("Cell is locked!!!");

    }

  },

  'click .subtract-from': function (e, t) {

    let locked = t.lockedStatus.get(this.abbrev);

    if (!locked) {

      var SV = Session.get("adjustedTarget");
      let curTarget = parseFloat(SV[this.abbrev]).toFixed(2);

      let newTarget = Number(MoneyComb.NearestLower(curTarget, 25));

      SV[this.abbrev] = newTarget;
      Session.set('adjustedTarget', SV);


      // ALLOCATION START
      let amountToAdd = Number(curTarget - newTarget);

      let totalLocked = t.totalLocked.get();
      // console.log("TL=" + totalLocked)

      if (totalLocked == true) {

        // The total is locked.. we need to re-allocate amount remaining unlocked.

        let lockedStatus = t.lockedStatus.keys;
        let SV = Session.get("adjustedTarget");

        // RE_ALLOCATION FUNCTION
        var newAllocations = MoneyComb.reAllocate(SV, lockedStatus, this.abbrev, amountToAdd);

        // console.log("NEW ALLOCATION:");
        // console.log(newAllocations);
        Session.set('adjustedTarget', newAllocations);

      } else {
        // Total is unlocked. So we just subtract it from the total
        let newTotalTarget = Number(Session.get("adjustedTotal")) - amountToAdd;
        Session.set("adjustedTotal", Number(newTotalTarget));
      }


    } else {
      // The category clicked on is locked. So we essentially ignore the event
      console.log("locked");
    }

  },

  'click .total-add': function (e, t) {

    let locked = t.totalLocked.get();

    if (!locked) {

      // Get and set new Total Target
      let curTarget = Session.get("adjustedTotal");
      let newTarget = MoneyComb.NearestUpper(curTarget, 100);
      Session.set("adjustedTotal", newTarget);


      // now the re-allocation - to be distributed
      let amountToAllocate = newTarget - curTarget;

      let lockedStatus = t.lockedStatus.keys;
      var SV = Session.get("adjustedTarget");

      // RE_ALLOCATION FUNCTION
      var newAllocations = MoneyComb.reAllocate(SV, lockedStatus, 'total', amountToAllocate);
      Session.set('adjustedTarget', newAllocations);

    } else {
      // Total is locked but clicked on. Ignore event.
      console.log("total is locked");
    }


  },

  'click .total-subtract': function (e, t) {

    let locked = t.totalLocked.get();

    if (!locked) {

      // Get and set new Total Target
      let curTarget = Session.get("adjustedTotal");
      let newTarget = MoneyComb.NearestLower(curTarget, 100);
      Session.set("adjustedTotal", newTarget);

      // now the re-allocation - to be distributed
      let amountToAllocate = newTarget - curTarget;

      let lockedStatus = t.lockedStatus.keys;
      var SV = Session.get("adjustedTarget");

      // RE_ALLOCATION FUNCTION
      var newAllocations = MoneyComb.reAllocate(SV, lockedStatus, 'total', amountToAllocate);
      Session.set('adjustedTarget', newAllocations);

    } else {
      // Total is locked but clicked on. Ignore event.
      console.log("total is locked");
    }

  },


  'click .lock-cell': function (e, t) {
    var locked = t.lockedStatus.get(this.abbrev);
    t.lockedStatus.set(this.abbrev, !locked);
  },


  'click .lock-total': function (e, t) {

    var locked = t.totalLocked.get();
    t.totalLocked.set(!locked);

  },


  'click .confirm-button': function (e, t) {

    const newTotal = Session.get('adjustedTotal');
    const newTarget = Session.get('adjustedTarget');

    var A = Allocations.findOne({userId: Meteor.userId()});
    
    _.each(newTarget, function (v, k) {
      A[k]['target'] = v
      A[k]['percent'] = Number(parseFloat(v / newTotal).toFixed(2))
    });

    
    Allocations.update(A._id, {$set: A}, function (err, numdocs) {
      if (err) {
        console.error(err);
      } else {
        console.log(numdocs + " were updated");
      }
    });

    console.log("Allocation updated and saved...");
    sAlert.info("New Plan: $" + parseFloat(newTotal).toFixed(0) + " per month", {timeout: 1500});
    // Meteor.call('logActivity','info','New targets set','Ok. now stick to the plan!')
    mixpanel.track("SpendSetter Save");

  },

  'click .reset-button': function (e, t) {
    
    let A = Allocations.findOne({userId: Meteor.userId()});

    let adjustedTarget = {
      'eo': A.eo.amount,
      'ds': A.ds.amount,
      'r': A.r.amount,
      't': A.t.amount,
      'e': A.e.amount,
      's': A.s.amount
    }

    Session.set('adjustedTarget', adjustedTarget);

    var totalCurrent = parseFloat(A.targetMoneyPot()).toFixed(2);
    Session.set('adjustedTotal', totalCurrent);

  }


});

/*****************************************************************************/
/* SpendSetter: Helpers */
/*****************************************************************************/
Template.SpendSetter.helpers({


  disabled: function () {

    var locked = Template.instance().lockedStatus.get(this.abbrev);

    return (locked ? "disabled" : "");
  },

  disabledTotal: function () {

    var locked = Template.instance().totalLocked.get();
    return (locked ? "disabled" : "");
  },


  lockedStatus: function () {

    var locked = Template.instance().lockedStatus.get(this.abbrev);

    return (locked ? "lock" : "unlock");
  },

  calcCellName: function () {

    var locked = Template.instance().lockedStatus.get(this.abbrev);

    return (locked ? this.name : this.name);
  },

  calcCellImg: function () {

    var locked = Template.instance().lockedStatus.get(this.abbrev);

    return (locked ? "locked" : this.abbrev);
  },

  calcTotalName: function () {

    var locked = Template.instance().totalLocked.get();

    return (locked ? "Total Spending" : "Total Spending");
  },

  calcTotalImg: function () {

    var locked = Template.instance().totalLocked.get();

    return (locked ? "locked" : "hp");
  },

  totallockedStatus: function () {
    var locked = Template.instance().totalLocked.get();
    return (locked ? "lock" : "unlock");
  },

  lockedStatusColor: function () {
    var locked = Template.instance().lockedStatus.get(this.abbrev);
    return (locked ? "disabled" : MoneyComb.singleCellColor(this.abbrev));
  },


  totallockedStatusColor: function () {
    var locked = Template.instance().totalLocked.get();
    return (locked ? "disabled" : "grey");
  },


  lockedplus: function () {
    let locked = Template.instance().lockedStatus.get(this.abbrev);
    return (locked ? "lock" : "plus");
  },

  lockedminus: function () {
    let locked = Template.instance().lockedStatus.get(this.abbrev);
    return (locked ? "lock" : "minus");
  },

  totallockedplus: function () {
    let locked = Template.instance().totalLocked.get();
    return (locked ? "lock" : "plus");
  },

  totallockedminus: function () {
    let locked = Template.instance().totalLocked.get();
    return (locked ? "lock" : "minus");
  },

  calcColor: function () {
    let locked = Template.instance().lockedStatus.get(this.abbrev);
    return (locked ? "#9E9E9E" : MoneyComb.singleCellColor(this.abbrev));
  },

  calcColorTotal: function () {
    var locked = Template.instance().totalLocked.get();
    return (locked ? "#9E9E9E" : "#848484");
  },

  cells: function () {
    return Cells.find();
  },

  actualTotal30Average: function () {
    let An = Analysis.findOne({userId: Meteor.userId()});
    let spend = (An.totalSpend.t90.amount + An.totalSpend.t60.amount + An.totalSpend.t30.amount)/3;

    return "$"+parseFloat(spend).toFixed(0);
  },

  actual60: function () {
    let An = Analysis.findOne({userId: Meteor.userId()});
    return An.totalLast60();
  },

  actual90: function () {
    let An = Analysis.findOne({userId: Meteor.userId()});
    return An.totalLast90();
  },

  target: function () {
    var cell = this;

    var SV = Session.get("adjustedTarget");
    var targetAmt = parseFloat(SV[this.abbrev]).toFixed(0);
    return targetAmt;
  },

  recommended: function () {
    var alloc = Allocations.findOne({userId: Meteor.userId()});
    var targetAmt = parseFloat(alloc[this.abbrev].amount).toFixed(0);
    return "$"+parseFloat(targetAmt).toFixed(0);
  },

  USAverage: function () {

    let FP = FinancialProfile.findOne({userId: Meteor.userId()});
    var gross_income = FP.gross_income();

    // pct of GI based on income
    if (gross_income < 30000) {
      var pctOfGross = .60
    } else if (gross_income < 60000) {
      var pctOfGross = .41
    } else if (gross_income < 140000) {
      var pctOfGross = .29
    } else {
      var pctOfGross = .25
    }


    const allocation_amts = {
      eo: 0.20,
      ds: 0.12,
      r: 0.07,
      t: 0.08,
      e: 0.075,
      s: 0.455
    };

    var usAmt = parseFloat((allocation_amts[this.abbrev] * pctOfGross * gross_income/365)*30 ).toFixed(0);

    return "$"+parseFloat(usAmt).toFixed(0);
  },

  recommendedTotal: function () {
    var alloc = Allocations.findOne({userId: Meteor.userId()});
    return "$"+parseFloat(alloc.targetRecommendedMoneyPot()).toFixed(0);

  },

  targetweight: function () {
    var SV = Session.get("adjustedTarget");

    if (this.abbrev == "eo") {
      var targetAmt = parseFloat(SV[this.abbrev]) * (30 / 7);
    } else if (this.abbrev == "t") {
      var targetAmt = parseFloat(SV[this.abbrev]) / 12;
    } else {
      var targetAmt = parseFloat(SV[this.abbrev]);
    }

    var adjustedTotal = Session.get("adjustedTotal");
    var retval = parseFloat((targetAmt / adjustedTotal) * 100).toFixed(0);
    return retval;
  },

  other: function () {

    let FP = FinancialProfile.findOne({userId: Meteor.userId()});
    console.log(FP);
    var gi = FP.grossincome() / 12;
    var adjustedTotal = Session.get("adjustedTotal");
    console.log(gi);
    console.log(adjustedTotal);
    return (gi - adjustedTotal);

  },

  pctOfGross: function () {
    let FP = FinancialProfile.findOne({userId: Meteor.userId()});
    let GI = FP.gross_income();
    let SV = Session.get("adjustedTotal") / 30 * 365;

    return parseFloat((SV / GI) * 100).toFixed(0);

  },

  total: function () {

    var adjustedTotal = Session.get("adjustedTotal");
    return parseFloat(adjustedTotal).toFixed(0);

  },

  average: function () {
    var cell = this;
    var actual = parseFloat(Meteor.user().profile.actual_spend[cell.abbrev]).toFixed(0);

    return actual;
  },

  totalTarget: function () {
    return parseFloat(Session.get("adjustedTotal")).toFixed(0);
  }

});

/*****************************************************************************/
/* SpendSetter: Lifecycle Hooks */
/*****************************************************************************/
Template.SpendSetter.onCreated(function () {

  if (!Meteor.userId()) {
    Router.go('/login')
  }

  this.lockedStatus = new ReactiveDict();
  this.lockedStatus.set('eo', false);
  this.lockedStatus.set('ds', false);
  this.lockedStatus.set('r', false);
  this.lockedStatus.set('t', false);
  this.lockedStatus.set('e', false);
  this.lockedStatus.set('s', false);

  //this.totalAdjustedTarget = new ReactiveVar();
  this.totalLocked = new ReactiveVar();
  this.totalLocked.set(false);
  //this.totalAdjustedTarget.set(totalCurrentTarget);
  // Inialize the session variable with the current settings

});

Template.SpendSetter.onRendered(function () {

  mixpanel.track("Enter SpendSetter");

  var alloc = Allocations.findOne({userId: Meteor.userId()});
  if (alloc == undefined) {
    console.log("EXCEPTION: Allocation for user is blank. Should NOT happen")
  }

  var totalCurrentTarget = parseFloat(alloc.targetMoneyPot()).toFixed(2);
  Session.set('adjustedTotal', totalCurrentTarget);

  let adjustedTarget = {
    'eo': alloc.eo.target,
    'ds': alloc.ds.target,
    'r': alloc.r.target,
    't': alloc.t.target,
    'e': alloc.e.target,
    's': alloc.s.target
  }
  Session.set('adjustedTarget', adjustedTarget);
});

Template.SpendSetter.onDestroyed(function () {
  mixpanel.track("Leave SpendSetter");
});
