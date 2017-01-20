import Slider from 'react-rangeslider';
import AmountButton from '../../../components/AmountButton';
import CellTargetSlider from '../../../components/CellTargetSlider';
import GoalDatePicker from '../../../components/GoalDatePicker';
import GoalStatement from '../../../components/GoalStatement';

/*****************************************************************************/
/* WizardSavingsQ: Event Handlers */
/*****************************************************************************/
Template.WizardSavingsQ.events({
    'click .action-yes': function (e, t) {
        Router.go('/spendsetter/wizard/save');
    },


    'click .action-no': function (e, t) {
        Session.set("savingsTarget", 0);
        Session.set("newSpendTarget", Number(Session.get("newTarget")));
        Router.go('/spendsetter/wizard/set');
    }
});

/*****************************************************************************/
/* WizardSavingsQ: Helpers */
/*****************************************************************************/
Template.WizardSavingsQ.helpers({


});

/*****************************************************************************/
/* WizardSavingsQ: Lifecycle Hooks */
/*****************************************************************************/
Template.WizardSavingsQ.onCreated(function () {

    if (!Meteor.userId()) {
        Router.go('/login')
    }

    // Subscribe to subscriptions at the Template level
    var self = this;

    self.autorun(function() {
        self.subscribe('goals');
    });



    Session.set("value",1000);
    Session.set("step",50);
    Session.set("maxvalue",10000);
    this.goalPeriod = new ReactiveVar("month");
    this.goalName = new ReactiveVar("general savings");

});

Template.WizardSavingsQ.onRendered(function () {
    mixpanel.track("Spend Wizard - Set Savings Goal");
});

Template.WizardSavingsQ.onDestroyed(function () {
});
