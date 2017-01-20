import CellTargetSlider from '../../../components/CellTargetSlider';

var DatePicker = require('react-datepicker');
var moment = require('moment');

require('react-datepicker/dist/react-datepicker.css');

/*****************************************************************************/
/* WizardWelcome: Event Handlers */
/*****************************************************************************/
Template.WizardWelcome.events({
    'click .action-adjust-target': function (e, t) {
        // Get the current value and set it as the total spend target
       Router.go('/spendsetter/wizard/overall');

    },

    'click .action-accept-target': function (e, t) {
        Router.go('/spendsetter/wizard/saveq');
    },

    
    'click .action-set-savegoal': function (e, t) {
        Router.go('/spendsetter/wizard/save');
    }
});

/*****************************************************************************/
/* WizardWelcome: Helpers */
/*****************************************************************************/
Template.WizardWelcome.helpers({

});

/*****************************************************************************/
/* WizardWelcome: Lifecycle Hooks */
/*****************************************************************************/
Template.WizardWelcome.onCreated(function () {

    if (!Meteor.userId()) {
        Router.go('/login')
    }

});

Template.WizardWelcome.onRendered(function () {
    mixpanel.track("Spend Wizard - Start");
});

Template.WizardWelcome.onDestroyed(function () {
});
