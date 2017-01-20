import CellTargetSlider from '../../../components/CellTargetSlider';

/*****************************************************************************/
/* WizardOverall: Event Handlers */
/*****************************************************************************/
Template.WizardOverall.events({

    'click .action-set-cells': function (e, t) {

        //Session.set("savingsTarget", 0);


        Session.set("newTarget",Number(Session.get("value")));
        Session.set("newSpendTarget", Number(Session.get("newTarget")));

        //Session.set("value",1000);
        //Session.set("step",50);
        //Session.set("maxvalue",10000);


        Router.go('/spendsetter/wizard/set');
    }
});

/*****************************************************************************/
/* WizardOverall: Helpers */
/*****************************************************************************/
Template.WizardOverall.helpers({

    CellTargetSlider: function() {
        return CellTargetSlider;
    },


    fpinfo() {

        const FP = FinancialProfile.findOne({userId: Meteor.userId()});
        const gi = FP.gross_income();
        const gi_30 = parseFloat((gi/365)*30).toFixed(0)
        const lowpct = .20;
        const highpct = 0.40;
        const low = parseFloat(gi_30*lowpct).toFixed(0);
        const high = parseFloat(gi_30*highpct).toFixed(0);

        return {
            gi: gi,
            gi_30: gi_30,
            low: low,
            high: high,
            lowpct: lowpct,
            highpct: highpct
        }

    },

    maxtarget(cell) {
        const A = Allocations.findOne({userId: Meteor.userId()});
        return parseFloat(A[cell].amount*2).toFixed(0);
    },

    value() {
        return Number(Session.get("value"));
    },

    newTarget() {
        return Number(Session.get("newTarget"));
    },

    targettotal() {
        const A = Allocations.findOne({userId: Meteor.userId()});

        return parseFloat(Number(A.targetMoneyPot())).toFixed(0);
    },

    targetupperbound() {
        console.log('here here!')

        const basedOnSpend = 3* Number(Session.get("newTarget"));

        const FP = FinancialProfile.findOne({userId: Meteor.userId()});
        const gi = FP.gross_income();
        const gi_30 = parseFloat((gi/365)*30).toFixed(0)
        const basedOnGI = parseFloat(gi_30*0.35).toFixed(0);
      
        return (_.max([basedOnSpend, basedOnGI]));
    },

    currentspend() {
        const An =  Analysis.findOne({userId: Meteor.userId()});

        const averageSpend = parseFloat(An.totalSpend.t30.amount).toFixed(0);

        Session.set("newTarget",averageSpend);
        Session.set("total",averageSpend);
        Session.set("value",averageSpend);

        return averageSpend;
    },

});

/*****************************************************************************/
/* WizardOverall: Lifecycle Hooks */
/*****************************************************************************/
Template.WizardOverall.onCreated(function () {

    if (!Meteor.userId()) {
        Router.go('/login')
    }
    // Set up session variables
    Session.set("allocated",0);

});

Template.WizardOverall.onRendered(function () {
    mixpanel.track("Spend Wizard - Make spend total adjustments");
});

