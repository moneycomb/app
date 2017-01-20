import AllocationPlan from '../../../components/AllocationPlan';


/*****************************************************************************/
/* WizardSummarvalue: Event Handlers */
/*****************************************************************************/
Template.WizardSummary.events({

  'click .save-and-proceed': function(e,t) {


    const newAllocationPlan = Session.get("newAllocationPlan");
    const newTotal = Number(newAllocationPlan.eo + newAllocationPlan.ds + newAllocationPlan.r + newAllocationPlan.t + newAllocationPlan.e + newAllocationPlan.s);

    const A = Allocations.findOne({userId: Meteor.userId()});

    A.eo.target = newAllocationPlan.eo;
    A.ds.target = newAllocationPlan.ds;
    A.r.target = newAllocationPlan.r;
    A.t.target = newAllocationPlan.t;
    A.e.target = newAllocationPlan.e;
    A.s.target = newAllocationPlan.s;


    console.log(A);
    Allocations.update(A._id, {$set: A}, function (err, numdocs) {
      if (err) {
        console.error(err);
      } else {
        console.log(numdocs + " were updated");
      }
    });

    //See if a plan was NOT set prior. IF so, award +100 HM
    let planIsNotSet = Meteor.user().profile.planIsSet;
    if ( planIsNotSet == undefined || planIsNotSet == false) {
      //a plan was not set

    }

    let profile = Meteor.user().profile;
    profile['planIsSet'] = true;
    Meteor.users.update({_id: Meteor.userId()}, {$set: {profile: profile}});

    Router.go('/dashboard');
    sAlert.info(`New Plan: $${parseFloat(newTotal).toFixed(0)} per month`, {timeout: 1500});

  }

});

/*****************************************************************************/
/* WizardSummarvalue: Helpers */
/*****************************************************************************/
Template.WizardSummary.helpers({

  AllocationPlan() {
    return AllocationPlan;

  },


  newTotal() {
    const newAllocationPlan = Session.get("newAllocationPlan");
    return Number(newAllocationPlan.eo + newAllocationPlan.ds + newAllocationPlan.r + newAllocationPlan.t + newAllocationPlan.e  + newAllocationPlan.s);
  },

  allocations()
  {
    const A = Allocations.findOne({userId: Meteor.userId()});

    const NSP = Session.get("newAllocationPlan");

    return ([{name: "Eating Out", value: NSP.eo},
      {name: "Digital Services", value: NSP.ds},
      {name: "Recharge", value: NSP.r},
      {name: "Travel", value: NSP.t},
      {name: "Entertainment", value: NSP.e},
      {name: "Shopping", value: NSP.s}]);
  }
  ,

  analysis()
  {
    return Analysis.findOne({userId: Meteor.userId()})
  }

});

/*****************************************************************************/
/* WizardSummarvalue: Lifecycle Hooks */
/*****************************************************************************/
Template.WizardSummary.onCreated(function () {

  if (!Meteor.userId()) {
    Router.go('/login')
  }

});

Template.WizardSummary.onRendered(function () {
  mixpanel.track("Setup Wizard - Summary");
  // Record the fact the plan is set in the user's profile
  let profile = Meteor.user().profile;
  profile['planIsSet'] = true;
  Meteor.users.update({_id: Meteor.userId()}, {$set: {profile: profile}});
});

Template.WizardSummary.onDestroyed(function () {
});
