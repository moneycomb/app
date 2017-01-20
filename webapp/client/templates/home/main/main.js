/*****************************************************************************/
/* Main: Event Handlers */
/*****************************************************************************/
import SatisfactionChart from '../../../components/SatisfactionChart';

Template.Main.events({
    'click .change-timeframe': function (e, t) {
        const selected = e.currentTarget.id;
        t.timeframe.set(selected);
    },

    'click .action-help-ss': function (e, t) {

        $('.ui.modal.help-ss')
            .modal('show')
    },

    'click .action-help-evaluate': function (e, t) {

        $('.ui.modal.help-evaluate')
            .modal('show')
    },

    'click .action-help-mms': function (e, t) {

        $('.ui.modal.help-mms')
            .modal('show')
    },

    'click .flylabel': function (e, t) {
        $('.flylabel')
            .transition('vertical flip')
        ;
        $('.flylabel2')
            .transition('vertical flip')
        ;
    },

    'click .action-help-ssl': function(e,t) {

        $('.ui.modal.help-ssl')
            .modal('show')
    },

    'click .action-help-mc': function (e, t) {

        $('.ui.modal.help-mc')
            .modal('show')
    },

    'click .action-sync-all': function (e, t) {

        mixpanel.track("Clicked Get Recent Spending");
        t.getRecentSpending.set('refresh loading');

        Meteor.call('plaidSyncAllAccounts', function (err, result) {

            if (err) console.log(err);
            if (result.amount != 0) {
                sAlert.info("$" + parseFloat(result.amount).toFixed(0) + " in new spending (" + result.new + " transactions)");
            } else {
                sAlert.info("No new spending purchases");
            }

            Meteor.call('updateSpendStatistics');
            t.getRecentSpending.set('refresh');

        });
    }

});

/*****************************************************************************/
/* Main: Helpers */
/*****************************************************************************/
Template.Main.helpers({

    SatisfactionChart() {
        return SatisfactionChart;
    },

    mpSpendSpeed: function() {
        let A = Allocations.findOne({userId: Meteor.userId()});
        let An = Analysis.findOne({userId: Meteor.userId()});

        let eoSS = An.cellSpend.eo.t30.amount / A.eo.target;
        let dsSS = An.cellSpend.ds.t30.amount / A.ds.target;
        let rSS = An.cellSpend.r.t30.amount / A.r.target;
        let eSS = An.cellSpend.e.t30.amount / A.e.target;
        let sSS = An.cellSpend.s.t30.amount / A.s.target;
        let tSS = An.cellSpend.t.t365.amount / ((A.t.target / 30)  * 365);

        console.log(`eo=${eoSS}  ds=${dsSS} r=${rSS} t=${tSS} e=${eSS} s=${sSS}`);
        let avg = (eoSS + dsSS + rSS + eSS + sSS + tSS)/6;
        console.log(`avg=${avg}`)

        let spent = An.totalSpend.t30.amount;
        let target = A.targetMoneyPot();

        let oldSS = parseFloat(spent/target*100).toFixed(0);

        let SS = parseFloat(((eoSS + dsSS + rSS + eSS + sSS + tSS)/6)*100).toFixed(0);

        console.log(`Old SS = ${oldSS} and new SS = ${SS}`);

        return SS;

    },

    remainingColor: function(cell) {
        let A = Allocations.findOne({userId: Meteor.userId()})
        let An = Analysis.findOne({userId: Meteor.userId()})

        if (cell === 't') {
            var remaining = parseFloat((A[cell].target/30)*365 - An.cellSpend[cell].t365.amount).toFixed(0);

        } else {
            var remaining = parseFloat(A[cell].target - An.cellSpend[cell].t30.amount).toFixed(0);
        }

        return (remaining<0 ? "#ff4081" : "#5fb7e5");
    },

    remaining: function(cell) {
        let A = Allocations.findOne({userId: Meteor.userId()})
        let An = Analysis.findOne({userId: Meteor.userId()})
        var remaining = parseFloat(A[cell].target - An.cellSpend[cell].t30.amount).toFixed(0);
        return (remaining<0 ? Math.abs(remaining) : remaining);
    },
    
    randomFeatured: function () {
        const SS = SpendSuggestions.find({featured: true}, {fields: {_id: 1}}).fetch();
        const featuredIds = _.pluck(SS, '_id');
        const choice = _.sample(featuredIds);

        return SpendSuggestions.findOne({_id: choice});

    },

    welcomemsg: function () {
        return `Welcome ${Meteor.user().profile.first_name}`
    },

    haveQuizResults: function () {
        const quizresults = MoneyMindset.find({userId: Meteor.userId()}).count();

        return ( quizresults != 0 );
    },

    hp: function() {
        let FP = FinancialProfile.findOne({userId: Meteor.userId()});
        return (FP.honeypoints == undefined ? 0 : FP.honeypoints)
    },

    noLinkedAccounts() {
        const haveAccounts = FinAccounts.find().count();
        console.log(`Does the user have NO accounts =${haveAccounts}`);

        return (haveAccounts == 0);
    },

    planIsNotSet: function () {
        let planIsNotSet = Meteor.user().profile.planIsSet;
        return ((planIsNotSet == undefined || planIsNotSet == false) ? true : false);
    },

    categorization: function () {
        let A = Analysis.findOne({userId: Meteor.userId()})
        return A.categorization
    },

    tfColor: function (tf) {
        const current = Template.instance().timeframe.get()
        return (tf === current ? "#ffffff" : "#848484")
    },

    tfbgColor: function (tf) {
        const current = Template.instance().timeframe.get()
        return (tf === current ? "#26a69a" : "#9e9e9e")
    },

    periodString: function (tf) {
        const period = Template.instance().timeframe.get();
        let days = Number(period.substring(1));
        return "last " + days + " days";
    },

    currentTimeFrame: function (tf) {
        return Template.instance().timeframe.get();
    },

    primaryaspect: function () {
        return MoneyMindset.findOne({userId: Meteor.userId()}).primaryAspect()
    },


    getRecentSpending: function () {
        return Template.instance().getRecentSpending.get()
    },

    lastSyncedString: function () {

        const syncdate = moment(Meteor.user().profile.lastSynced).fromNow();
        return "Spending transactions last updated " + syncdate;
    },


    planPctOfGross: function () {
        let A = Allocations.findOne({userId: Meteor.userId()});
        let Plan = A.targetMoneyPot();
        let FP = FinancialProfile.findOne({userId: Meteor.userId()});
        let GI30Day = (FP.gross_income() / 365) * 30;

        let X = parseFloat(Plan / GI30Day).toFixed(2);
        console.log("X=" + X);

        return X;
    },

    planHeaderString: function () {

        let A = Allocations.findOne({userId: Meteor.userId()});
        let Plan = A.targetMoneyPot();
        let FP = FinancialProfile.findOne({userId: Meteor.userId()});
        let GI30Day = (FP.gross_income() / 365) * 30;

        let PCT = parseFloat(Plan / GI30Day * 100).toFixed(0);

        return "My Plan - " + PCT + "% of Income";
    },

    totalOverUnder: function () {
        let An = Analysis.findOne({userId: Meteor.userId()});
        let A = Allocations.findOne({userId: Meteor.userId()});

        let P = Template.instance().timeframe.get()
        let days = Number(P.substring(1));  // "t30" ---> "30"

        let spent = An.cummulativeTotal(P);
        let target = A.targetMoneyPot() / 30 * days;

        return Math.abs(target - spent)
    },

    cells: function() {
        return Cells.find();
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

    last10Trans() {
        let T = Transactions.find({userId: Meteor.userId()},{$sort: {date: -1}});
        return T
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


    totalOverUnderColor: function (cell) {
        let An = Analysis.findOne({userId: Meteor.userId()});
        let A = Allocations.findOne({userId: Meteor.userId()});

        let P = Template.instance().timeframe.get()
        let days = Number(P.substring(1));  // "t30" ---> "30"

        let spent = An.cummulativeTotal(P);
        let target = A.targetMoneyPot() / 30 * days;

        const remaining = target - spent;

        return (remaining < 0 ? "#FF4081" : "#9e9e9e");
    },

    totalTarget: function (cell) {
        let A = Allocations.findOne({userId: Meteor.userId()});

        let P = Template.instance().timeframe.get()
        let days = Number(P.substring(1));  // "t30" ---> "30"
        let target = A.targetMoneyPot() / 30 * days;

        return (parseFloat(target).toFixed(0));
    },

    totalOverUnderLabel: function (cell) {
        let An = Analysis.findOne({userId: Meteor.userId()});
        let A = Allocations.findOne({userId: Meteor.userId()});

        let P = Template.instance().timeframe.get()
        let days = Number(P.substring(1));  // "t30" ---> "30"

        let spent = An.cummulativeTotal(P);
        let target = A.targetMoneyPot() / 30 * days;

        const remaining = target - spent;

        return (remaining < 0 ? "OVER" : "UNDER");
    },

    numToReview() {
        const An = Analysis.findOne({userId: Meteor.userId()});
        return Session.get("itemsToReview");
    },

    haveReviewItems() {
      Meteor.call('haveTransactionsToReview', function(error,result) {
        if (!error) {
          Session.set('itemsToReview',result)
        }
      });
      return (Session.get("itemsToReview")> 0);
    },

    haveMatchItems() {
        const An = Analysis.findOne({userId: Meteor.userId()});
        return (An.transactionCounts.matchCheck > 0);
    },

    spendToReview() {
        const T = Transactions.find({userId: Meteor.userId(), toReview: true}).fetch();

        let totalToReview = 0;
        _.each(T, function (transaction) {
            totalToReview += Math.abs(transaction.amount);
        });

        return parseFloat(totalToReview).toFixed(0);
    },

    moneyCombOptions: function () {

        const default_teal = "#26a69a";
        const default_amber = "#FFA000";

        const default_stroke = "#ffa000";
        const default_background = "#ffa000";
        const default_bg_opacity = 1.0;
        const default_top = "";
        const default_bottom = "#26a69a";

        var cellColor = {
            'eo': '#ffa000',
            'ds': '#ffca28',
            't': '#80cbc4',
            'r': '#ffeb3b',
            'e': '#00695c',
            's': '#26a69a'
        };


        var options = {
            tf: Template.instance().timeframe.get(),
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
                text1: "$2500",
                color: "#ffffff",
                stroke: default_amber,
                bg: "#424242",
                icon: "opacity: 1.0;",
                bgopacity: 1.0,
                fill: {
                    opacity: 0.0,
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
});

/*****************************************************************************/
/* Main: Lifecycle Hooks */
/*****************************************************************************/
Template.Main.onCreated(function () {

    if (!Meteor.userId()) {
        Router.go('/login')
    };

    const now = moment().toDate();
    Session.set("last_activity", now);

    this.timeframe = new ReactiveVar('t30');
    this.getRecentSpending = new ReactiveVar('refresh');

    const last_synced = Session.get("last_synced");

    this.subscribe('SpendSuggestions.featured');

    var self = this;
    self.autorun(function () {
        self.subscribe('Transactions.LAST10');
        self.subscribe('accounts');
    });
});

Template.Main.onRendered(function () {

  $('.message .close')
    .on('click', function () {
      $(this)
        .closest('.message')
        .transition('fade');
  });

  Meteor.call('updateSpendStatistics', function (error, result) {
    Meteor.call('updateMyPurchasePlaces', Meteor.userId());
  });

});
