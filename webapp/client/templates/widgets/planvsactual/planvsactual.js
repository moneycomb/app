import PlanVersusActualChart from '../../../components/PlanVersusActualChart';


/*****************************************************************************/
/* PlanVsActual: Event Handlers */
/*****************************************************************************/
Template.PlanVsActual.events({
});

/*****************************************************************************/
/* PlanVsActual: Helpers */
/*****************************************************************************/
Template.PlanVsActual.helpers({
  PlanVersusActualChart: function () {
    return PlanVersusActualChart;
  },
  
  colors() {
    return MoneyComb.cellcolor();
  },

  plan() {

    const Al = Allocations.findOne({userId: Meteor.userId()});

    /****   LATER!!!!
    //let P = "t"+period;
    let P = tf;
    let days = Number(tf.substring(1));  // "t30" ---> "30"

    let spent = An.cellSpendCummulative(cell,tf)
    let target = A[cell].target/30*days;

    // corner case: if target is set to 0, spend speed is 100...
    if (target == 0) {
      var SS = -1;
    } else {
      var SS = parseFloat(spent/target*100).toFixed(0);
    }
    let P = Template.instance().timeframe.get()
    let days = Number(P.substring(1));  // "t30" ---> "30"

    let spent = An.cummulativeTotal(P);
    let target = A.targetMoneyPot() / 30 * days;

    *******/


    return {
      "eo": parseFloat(Al.eo.target).toFixed(0),
      "ds": parseFloat(Al.ds.target).toFixed(0),
      "r": parseFloat(Al.r.target).toFixed(0),
      "t": parseFloat(Al.t.target).toFixed(0),
      "e": parseFloat(Al.e.target).toFixed(0),
      "s": parseFloat(Al.s.target).toFixed(0),
      "total": Al.targetMoneyPot()
    };
  },

  actual() {

    const An = Analysis.findOne({userId: Meteor.userId()});

    const totalspend30 = parseFloat(An.totalSpend.t30.amount).toFixed(0);

    return {
      "eo": parseFloat(An.cellSpend.eo.t30.amount).toFixed(0),
      "ds": parseFloat(An.cellSpend.ds.t30.amount).toFixed(0),
      "r": parseFloat(An.cellSpend.r.t30.amount).toFixed(0),
      "t": parseFloat(An.cellSpend.t.t30.amount).toFixed(0),
      "e": parseFloat(An.cellSpend.e.t30.amount).toFixed(0),
      "s": parseFloat(An.cellSpend.s.t30.amount).toFixed(0),
      "total": totalspend30
    };
  },


});

/*****************************************************************************/
/* PlanVsActual: Lifecycle Hooks */
/*****************************************************************************/
Template.PlanVsActual.onCreated(function () {
});

Template.PlanVsActual.onRendered(function () {
  $('.pointing.menu .item').tab();
  $('.shape').shape();
});

Template.PlanVsActual.onDestroyed(function () {
});
