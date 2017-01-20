import CProgressBar from '../../../components/ProgressBar';

/*****************************************************************************/
/* CellStatusLine: Event Handlers */
/*****************************************************************************/
Template.CellStatusLine.events({
});

/*****************************************************************************/
/* CellStatusLine: Helpers */
/*****************************************************************************/
Template.CellStatusLine.helpers({

  CProgressBar() {
    return CProgressBar;
  },

  CalcSpent() {
    if (this.abbrev == "t") {
      let An = Analysis.findOne({userId: Meteor.userId()});
      return parseFloat(An.cellSpend.t.t365.amount).toFixed(0);
    } else {
      return this.spent
    }
  },

  CalcTarget() {
    if (this.abbrev == "t") {
      let A = Allocations.findOne({userId: Meteor.userId()});
      return parseFloat((A.t.target/30)*365).toFixed(0);
    } else {
      return this.target
    }

  },

  CalcOverUnder() {
    if (this.abbrev == "t") {
      let A = Allocations.findOne({userId: Meteor.userId()});
      let An = Analysis.findOne({userId: Meteor.userId()});
      const spent =  parseFloat(An.cellSpend.t.t365.amount).toFixed(0);
      const target = parseFloat((A.t.target/30)*365).toFixed(0);
      const ou = target - spent;
      if (ou < 0 ) {
        return Math.abs(parseFloat(target-spent).toFixed(0));
      } else {
        return Math.abs(parseFloat(target-spent).toFixed(0));
      }

    } else {
      return this.overunder;
    }

  },

  CalcOverUnderText() {
    if (this.abbrev == "t") {
      let A = Allocations.findOne({userId: Meteor.userId()});
      let An = Analysis.findOne({userId: Meteor.userId()});
      const spent =  parseFloat(An.cellSpend.t.t365.amount).toFixed(0);
      const target = parseFloat((A.t.target/30)*365).toFixed(0);
      const ou = target - spent;
      if (ou < 0 ) {
        return `OVER`;
      } else {
        return `UNDER`;
      }

    } else {
      return this.overunder;
    }

  },


  periodStr() {
    if (abbrev == 't') {
      return "over last 365 days"
    } else {
      return "over last 30 days"
    }
  },

  isOver() {
    return (this.ouColor == "#ff4081")
  }
});

/*****************************************************************************/
/* CellStatusLine: Lifecycle Hooks */
/*****************************************************************************/
Template.CellStatusLine.onCreated(function () {
});

Template.CellStatusLine.onRendered(function () {
});

Template.CellStatusLine.onDestroyed(function () {
});
