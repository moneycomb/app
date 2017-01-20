/*****************************************************************************/
/* Moneycomb: Event Handlers */
/*****************************************************************************/
Template.Moneycomb.events({
  "click .select-cell": function (e, t) {
    var selected = e.currentTarget.id;

    Router.go(`/cells/${selected}`);
  },

  "click .select-core": function (e,t) {
    Router.go('/transactions/other')
  }

});

/*****************************************************************************/
/* Moneycomb: Helpers */
/*****************************************************************************/
Template.Moneycomb.helpers({


  fillcolor: function () {
    //let rv = MoneyComb.flagcolor();
    let rv = MoneyComb.cellcolor();
    return rv;
  },

  strokecolor: function () {
    // let rv = MoneyComb.flagcolor();
    let rv = MoneyComb.cellcolor();
    // let rv = MoneyComb.unicellcolor("#26a69a");

    return rv;
  },

  botcolor: function () {
    // let rv = MoneyComb.flagcolor();
    let rv = MoneyComb.cellcolor();
    // let rv = MoneyComb.unicellcolor("#26a69a");
    return rv;
  },

  statuscolor: function () {
    //let rv = MoneyComb.flagcolor();
    // let rv = MoneyComb.cellcolor();
    // let rv = MoneyComb.unicellcolor("#26a69a");
    let rv = MoneyComb.unicellcolor("");
    return rv;
  },

  topcolor: function () {
    let rv = MoneyComb.flagcolor(this.tf);
    // let rv = MoneyComb.cellcolor();
    //let rv = MoneyComb.unicellcolor("");
    return rv;
  },


  moneypotSpend: function() {

    var x = parseFloat(Meteor.user().actualMoneyPot()).toFixed(0);
    console.log(x);

    return x;
  },

  totalremaining: function() {
    var remaining = Number(Meteor.user().overunder());
    return (remaining<0 ? "$" + Math.abs(remaining) : "$" + remaining);
  },

  overunder: function() {
    var remaining = Number(Meteor.user().overunder());
    return (remaining<0 ? "OVER" : "UNDER");
  },

  overundercolor: function() {
    var remaining = Number(Meteor.user().overunder());
    return (remaining<0 ? "" : "");
  },

});

/*****************************************************************************/
/* Moneycomb: Lifecycle Hooks */
/*****************************************************************************/
Template.Moneycomb.onCreated(function () {
  
});

Template.Moneycomb.onRendered(function () {

});

Template.Moneycomb.onDestroyed(function () {
});
