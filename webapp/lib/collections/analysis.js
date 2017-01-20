Analysis = new Mongo.Collection('analysis');

// Deny all client-side updates on the Analysis collection
// Best practice from: http://guide.meteor.com/security.html
Analysis.deny({
  insert() { return true },
  update() { return true },
  remove() { return true },
});


Analysis.helpers({

  tradeoff: function(c1,c2) {
    return this[c1].tom[c2];
  },

  overInDays: function(cell) {
    const A = Allocations.findOne({userId: Meteor.userId()});
    const allocation = A[cell].target;
    const allocationPerDay = allocation/30;
    const spent = this.cellSpend[cell].t30.amount;

    const over = spent - allocation

    if (over > 0) {
      const overDays = parseFloat(over/allocationPerDay).toFixed(0)
      console.log(overDays)
      return untilPhrase(overDays)
    } else {
      return "ok to spend!"
    }

  },


  cellSpendCummulative: function(cell,tf) {

    if (tf == 't7') {
      return this.cellSpend[cell].t7.amount
    } else if (tf == 't30') {
      return this.cellSpend[cell].t30.amount
    } else if (tf == 't60') {
      return this.cellSpend[cell].t30.amount + this.cellSpend[cell].t60.amount
    } else if (tf == 't90') {
      return this.cellSpend[cell].t30.amount + this.cellSpend[cell].t60.amount + this.cellSpend[cell].t90.amount
    } else if (tf == 't120') {
      return this.cellSpend[cell].t30.amount + this.cellSpend[cell].t60.amount + this.cellSpend[cell].t90.amount + this.cellSpend[cell].t120.amount
    } else if (tf == 't365') {
      return this.cellSpend[cell].t365.amount
    } else {
      console.log('ERROR --- unknown timeframe!')
    }

  },

  cellCountCummulative: function(cell,tf) {

    if (tf == 't7') {
      return this.cellSpend[cell].t7.count
    } else if (tf == 't30') {
      return this.cellSpend[cell].t30.count
    } else if (tf == 't60') {
      return this.cellSpend[cell].t30.count + this.cellSpend[cell].t60.count
    } else if (tf == 't90') {
      return this.cellSpend[cell].t30.count + this.cellSpend[cell].t60.count + this.cellSpend[cell].t90.count
    } else if (tf == 't120') {
      return this.cellSpend[cell].t30.count + this.cellSpend[cell].t60.count + this.cellSpend[cell].t90.count + this.cellSpend[cell].t120.count
    } else if (tf == 't365') {
      return this.cellSpend[cell].t365.count
    } else {
      console.log('ERROR --- unknown timeframe!')
    }

  },


  cellActualPerDay: function(cell,tf) {
    let An = Analysis.findOne({userId: Meteor.userId()});

    if (tf == 't7') {
      return this.cellSpend[cell].t7.amount / 7
    } else if (tf == 't30') {
      return this.cellSpend[cell].t30.amount / 30
    } else if (tf == 't60') {
      return (this.cellSpend[cell].t30.amount + this.cellSpend[cell].t60.amount)/60
    } else if (tf == 't90') {
      return (this.cellSpend[cell].t30.amount + this.cellSpend[cell].t60.amount + this.cellSpend[cell].t90.amount)/90
    } else if (tf == 't120') {
      return (this.cellSpend[cell].t30.amount + this.cellSpend[cell].t60.amount + this.cellSpend[cell].t90.amount + this.cellSpend[cell].t120.amount)/120
    } else if (tf == 't365') {
      return this.cellSpend[cell].t365.amount/365
    } else {
      console.log('ERROR --- unknown timeframe!')
    }

  },

  cellAveragePurchase: function(cell,tf) {
    let An = Analysis.findOne({userId: Meteor.userId()});

    if (tf == 't7') {
      return this.cellSpend[cell].t7.average
    } else if (tf == 't30') {
      return this.cellSpend[cell].t30.average
    } else if (tf == 't60') {
      return (this.cellSpend[cell].t30.amount + this.cellSpend[cell].t60.amount)/(this.cellSpend[cell].t30.count + this.cellSpend[cell].t60.count)
    } else if (tf == 't90') {
      return (this.cellSpend[cell].t30.amount + this.cellSpend[cell].t60.amount + this.cellSpend[cell].t90.amount)/(this.cellSpend[cell].t30.count + this.cellSpend[cell].t60.count + this.cellSpend[cell].t90.count)
    } else if (tf == 't120') {
      return (this.cellSpend[cell].t30.amount + this.cellSpend[cell].t60.amount + this.cellSpend[cell].t90.amount + this.cellSpend[cell].t120.amount)/(this.cellSpend[cell].t30.count + this.cellSpend[cell].t60.count + this.cellSpend[cell].t90.count + this.cellSpend[cell].t120.count)
    } else if (tf == 't365') {
      return this.cellSpend[cell].t365.average
    } else {
      console.log('ERROR --- unknown timeframe!')
    }

  },
  

  totalLast30: function() {
    let spend = this.totalSpend.t30.amount;
    return "$"+parseFloat(spend).toFixed(0);
  },

  totalLast60: function() {
    let spend = this.totalSpend.t60.amount;
    return "$"+parseFloat(spend).toFixed(0);
  },

  totalLast90: function() {
    let spend = this.totalSpend.t90.amount;
    return "$"+parseFloat(spend).toFixed(0);
  },

  cummulativeTotal: function(tf) {

    if (tf == 't7') {
      return this.totalSpend.t7.amount
    } else if (tf == 't30') {
      return this.totalSpend.t30.amount
    } else if (tf == 't60') {
      return this.totalSpend.t30.amount + this.totalSpend.t60.amount
    } else if (tf == 't90') {
      return this.totalSpend.t30.amount + this.totalSpend.t60.amount + this.totalSpend.t90.amount
    } else if (tf == 't120') {
      return this.totalSpend.t30.amount + this.totalSpend.t60.amount + this.totalSpend.t90.amount + this.totalSpend.t120.amount
    } else if (tf == 't365') {
      return this.totalSpend.t365.amount
    } else {
      console.log('ERROR --- unknown timeframe!')
    }

  }

});

// see: meteor add matb33:collection-hooks
Analysis.before.insert(function (userId, doc) {
  doc.createdAt = new Date();
  doc.userId = userId;
});

Analysis.before.update(function (userId, doc) {
  doc.updatedAt = new Date();
});

