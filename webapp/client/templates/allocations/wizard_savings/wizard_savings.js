import Slider from 'react-rangeslider';
import AmountButton from '../../../components/AmountButton';
import CellTargetSlider from '../../../components/CellTargetSlider';
import GoalDatePicker from '../../../components/GoalDatePicker';
import GoalStatement from '../../../components/GoalStatement';

/*****************************************************************************/
/* WizardSavings: Event Handlers */
/*****************************************************************************/
Template.WizardSavings.events({

    'click .action-add-goal': function(e,t) {
        const value = Session.get("value");
        const period = t.goalPeriod.get();
        const purpose = t.goalName.get();
        const by = t.goalBy.get();

        const record = {
            userId: Meteor.userId(),
            value: value,
            period: period,
            by: by,
            purpose: purpose,
            createdOn: new Date()
        }

        console.log(record);
        Goals.insert(record);

        Session.set("savingsTarget", value);
        Session.set("newSpendTarget", Number(Session.get("newTarget") - value));

        Router.go("/spendsetter/wizard/set")


    },

    'click .set-amount': function (e, t) {

        const value = Number(e.currentTarget.id);

        Session.set("value",value);

        // set max value, capped at the total new target
        const newTarget = Number(Session.get("newTarget"));
        const maxV = 5*value;
        Session.set("maxvalue",_.min([maxV, newTarget]));

        if (value < 500 ) {
            Session.set("step",10);
        } else if (value < 6000) {
            Session.set("step",50);
        } else {
            Session.set("step",100);
        }
    },

    'click .set-period': function (e, t) {
        t.goalPeriod.set(String(e.currentTarget.id));
    },

    'click .set-goal': function (e, t) {
        t.goalName.set(String(e.currentTarget.id));
    },

});

/*****************************************************************************/
/* WizardSavings: Helpers */
/*****************************************************************************/
Template.WizardSavings.helpers({

    Slider: function() {
        return Slider;
    },

    CellTargetSlider: function() {
        return CellTargetSlider;
    },

    GoalStatement: function () {
        return GoalStatement;
    },

    AmountButton: function () {
        return AmountButton;
    },

    GoalDatePicker: function () {
        return GoalDatePicker;
    },

    goals: function () {
        return Goals.find({userId: Meteor.userId()})
    },
        currentcell: function (cell) {
        return Template.instance().currentCell.get();
    },

    title: function () {
        const currentstep=Template.instance().currentStep.get();
        const wizardsteps=Template.instance().wizardSteps.get();
        let prefix = "";

        if (currentstep == 0) {
            prefix = "First we'll ";
        } else {
            prefix = _.sample(["Now let's ","Next we'll ", "Onward! Now we'll "])
        }
        return prefix + "set your Spending Target for " + wizardsteps[currentstep];
    },

    cell: function (cell) {
        const abbrev = Template.instance().currentCell.get();
        return Cells.findOne({abbrev: abbrev});
    },
    
    currentStep: function () {
        return Template.instance().currentStep.get();
    },

    allocation() {
        return Allocations.findOne({userId: Meteor.userId()})
    },

    maxtarget(cell) {
        const A = Allocations.findOne({userId: Meteor.userId()});
        return parseFloat(A[cell].amount*2).toFixed(0);
    },

    value() {
        return Number(Session.get("value"));
    },

    left() {
        return Number(Session.get("newTarget")) - Number(Session.get("value"));
    },

    step() {
        return Number(Session.get("step"));
    },

    maxvalue() {
        return Number(Session.get("maxvalue"));
    },

    goalName() {
        return String(Template.instance().goalName.get());
    },

    goalPeriod() {
        return String(Template.instance().goalPeriod.get());
    },

    goalStatement() {
        return this.statement()
    },
    
    newTarget() {
        return Number(Session.get("newTarget"));
    },

    currentspend(cell) {
        const An =  Analysis.findOne({userId: Meteor.userId()})
        return An.cellSpend[cell].t30.amount;
    },

    analysis() {
        return Analysis.findOne({userId: Meteor.userId()})
    }

});

/*****************************************************************************/
/* WizardSavings: Lifecycle Hooks */
/*****************************************************************************/
Template.WizardSavings.onCreated(function () {

    if (!Meteor.userId()) {
        Router.go('/login')
    }

    // Subscribe to subscriptions at the Template level
    var self = this;

    self.autorun(function() {
        self.subscribe('goals');
    });


    Session.set("value",200);
    Session.set("step",10);
    Session.set("maxvalue",Session.get("newTarget"));
    this.goalPeriod = new ReactiveVar("year");
    this.goalName = new ReactiveVar("general savings");
    this.goalBy = new ReactiveVar();

});

Template.WizardSavings.onRendered(function () {
    mixpanel.track("Spend Wizard - Set Savings Goal");
});

Template.WizardSavings.onDestroyed(function () {
});
