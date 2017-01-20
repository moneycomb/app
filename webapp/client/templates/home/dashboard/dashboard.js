/*****************************************************************************/
/* Dashboard: Event Handlers */
/*****************************************************************************/
Template.Dashboard.events({

  'click .select-row': function (e, t) {
    Router.go("/cells/" + e.currentTarget.id);
  },

  'click .action-stat': function () {
    console.log("Spend Stat");
    Router.go("/analysis");

  },


});

/*****************************************************************************/
/* Dashboard: Helpers */
/*****************************************************************************/
Template.Dashboard.helpers({


  mpSpendSpeed: function() {
    let A = Allocations.findOne({userId: Meteor.userId()});
    let An = Analysis.findOne({userId: Meteor.userId()});

    let spent = An.totalSpend.t30.amount;
    let target = A.targetMoneyPot();
    let SS = parseFloat(spent/target*100).toFixed(0);
    return SS;

  },



  mpSpend: function() {


    var spendSeries = {}

    let An = Analysis.findOne({userId: Meteor.userId()});
    var SS = An.totalSpendSeries;

    let now = moment();
    let startOfPeriod = moment(now).subtract(30,'d')
    let future = moment(now).add(30,'d')

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


  moneyCombOptions: function () {

    const default_teal = "#26a69a";
    const default_amber = "#FFA000";

    const default_stroke = "#ffa000";
    const default_background = "#ffa000";
    const default_bg_opacity = 1.0;
    const default_top = "";
    const default_bottom = "#26a69a";

    var cellColor={
      'eo': '#ffa000',
        'ds': '#ffca28',
        't':  '#80cbc4',
        'r': '#ffeb3b',
        'e': '#00695c',
        's': '#26a69a'
    };


    var options = {
      tf: 't30',
      hexfill: "#26a69a",
      width: 200,
      bh: 20,
      tp: 20,
      text2_y: 83,
      eo: {
        color: cellColor.eo,
        // text1: "$555",
        text2: "Eating Out",
        bg: default_background,
        bgopacity: default_bg_opacity,
        // icon: "display:none;"
        iconimage: "/images/white/eo.png",
      },

      ds: {
        color: cellColor.ds,
        //text1: "$123",
        text2: "Digital Services",
        bg: default_background,
        bgopacity: default_bg_opacity,
        //icon: "display:none;",
        iconimage: "/images/white/ds.png",
      },

      r: {
        color: cellColor.r,
        //text1: "$123",
        text2: "Recharge",
        bg: default_background,
        bgopacity: default_bg_opacity,
        // icon: "display:none;",
        iconimage: "/images/white/r.png",
      },

      t: {
        color: cellColor.t,
        // text1: "$123",
        text2: "Travel",
        bg: default_background,
        bgopacity: default_bg_opacity,
        // icon: "display:none;",
        iconimage: "/images/white/t.png",
      },

      e: {
        color: cellColor.e,
        // text1: "$123",
        text2: "Entertainment",
        bg: default_background,
        bgopacity: default_bg_opacity,
        // icon: "display:none;",
        iconimage: "/images/white/e.png",
      },

      s: {
        color: cellColor.s,
        // text1: "$123",
        text2: "Shopping",
        bg: default_background,
        bgopacity: default_bg_opacity,
        // icon: "display:none;",
        iconimage: "/images/white/s.png",
      },


      center: {
        // text1: "$2500",
        color: "",
        stroke: default_amber,
        bg: "#424242",
        icon: "opacity: 1.0;",
        bgopacity: 1.0,
        fill: {
          opacity: 1.0,
          color: "#848484",
          // position: 6 + 41,
          position: 6 + 41,
          height: 41, /* 82 is the max */
          // icon: "display:none;"
        },


      }

    }


    return options;

  },

  actualT30Spend: function() {
    let An = Analysis.findOne({userId: Meteor.userId()});
    //let total = An.cellSpend.eo.t30.amount + An.cellSpend.ds.t30.amount + An.cellSpend.e.t30.amount
    //  + An.cellSpend.t.t30.amount + An.cellSpend.s.t30.amount  + An.cellSpend.r.t30.amount;
    return parseFloat(An.totalSpend.t30.amount).toFixed(0);
  },

  CColor: function() {
    return MoneyComb.singleCellColor(this.abbrev);
  },

  spent: function(cell) {

    let An = Analysis.findOne({userId: Meteor.userId()});
    let spent = An.cellSpend[cell].t30.amount;

    return parseFloat(spent).toFixed(0);

  },

  spent60: function(cell) {

    let An = Analysis.findOne({userId: Meteor.userId()});
    let spent = An.cellSpend[cell].t60.amount;

    return parseFloat(spent).toFixed(0);

  },

  spent90: function(cell) {

    let An = Analysis.findOne({userId: Meteor.userId()});
    let spent = An.cellSpend[cell].t90.amount;

    return parseFloat(spent).toFixed(0);

  },

  color: function(cell) {

    return "#848484";

  },

  target: function(cell) {

    let A = Allocations.findOne({userId: Meteor.userId()})

    return parseFloat(A[cell].target).toFixed();

  },

  remaining: function(cell) {
    let A = Allocations.findOne({userId: Meteor.userId()})
    let An = Analysis.findOne({userId: Meteor.userId()})
    var remaining = parseFloat(A[cell].target - An.cellSpend[cell].t30.amount).toFixed(0);
    return (remaining<0 ? " OVER $" + Math.abs(remaining) : " UNDER $" + remaining);
  },

  noAccounts: function () {
    let num = FinAccounts.find({userId: Meteor.userId()}).count();
    return (num == 0);
  },

  totalremaining: function() {
    var remaining = Number(Meteor.user().overunder());
    return Math.abs(remaining);
  },

  totalOverUnderColor: function(cell) {
    var remaining = Number(Meteor.user().overunder());
    return (remaining<0 ? "#FF4081" : "#9e9e9e");
  },

  targetMoneyPot: function() {

    let A = Allocations.findOne({userId: Meteor.userId()});
    return A.targetMoneyPot();

  },

  flag: function(cell) {
    let A = Allocations.findOne({userId: Meteor.userId()})
    let An = Analysis.findOne({userId: Meteor.userId()})
    var remaining = parseFloat(A[cell].target - An.cellSpend[cell].t30.amount).toFixed(0);

    return (remaining <0 ? true : false);
  },


  statuscolor: function(cell) {
    var remaining = Number(Meteor.user().overunder());

    return (remaining <0 ? "#ff4081" : "#848484");
  },

  headerLabel: function() {
    var remaining = Number(Meteor.user().overunder());

    return (remaining <0 ? "OVER" : "UNDER");
  },


  label_color: function(cell) {
    let c = Cells.findOne({abbrev: cell});
    return c.color;
  },

  cells: function() {
    return Cells.find();
  },

  sDate: function() {
    var now = moment();
    return  moment(now).subtract(30,'d').format("YYYY-MM-DD");
    analysis.floating_period.end = now.format("YYYY-MM-DD");
  },

  eDate: function() {
    var now = moment();
    return now.format("YYYY-MM-DD");
  },

  tcount: function() {
    let An = Analysis.findOne({userId: Meteor.userId()})
    return An.totalSpend.t30.count;
  },

  average: function() {
    let An = Analysis.findOne({userId: Meteor.userId()})
    return "$"+parseFloat(An.totalSpend.t30.average).toFixed(0);
  },

  targetPD: function() {
    let A = Allocations.findOne({userId: Meteor.userId()})
    return "$"+parseFloat(A.targetMoneyPot()/30).toFixed(0);
  },

  actualPD: function() {
    let An = Analysis.findOne({userId: Meteor.userId()})
    return "$"+parseFloat(An.totalSpend.t30.amount/30).toFixed(0);
  },





});

/*****************************************************************************/
/* Dashboard: Lifecycle Hooks */
/*****************************************************************************/
Template.Dashboard.onCreated(function () {

  if (! Meteor.userId() ) { Router.go('/login')};
  
  // If we don't have any accounts OR a financial profile...we should not be here!
  // Let's timestamp the login
  /*
  let num = FinAccounts.find({userId: Meteor.userId()}).count();
  if (num == 0) {
    Router.go('/ob/step2');
  }
*/

  var now = moment(Session.get('NOW'));

  // Mix Panel user identification
  mixpanel.identify(Meteor.userId());
  /*mixpanel.people.set({
    "$email": "",    // only special properties need the $
    "$last_login": new Date(),         // properties can be dates...
    "gender": Meteor.user().profile.gender,                    // feel free to define your own properties
    "age": Meteor.user().profile.age,                    // feel free to define your own properties
  });*/






});

Template.Dashboard.onRendered(function () {

});

Template.Dashboard.onDestroyed(function () {
});
