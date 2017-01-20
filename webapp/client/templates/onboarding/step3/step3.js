import ProgressBar from 'react-progressbar';

/*****************************************************************************/
/* Step3: Event Handlers */
/*****************************************************************************/
Template.Step3.events({
});

/*****************************************************************************/
/* Step3: Helpers */
/*****************************************************************************/
Template.Step3.helpers({

  haveInsufficientCategorization: function() {
    // set 50% as the initial threshold...
    return ( Meteor.users().profile.transactions.pct_celled < 0.50 )
  },
  
  totalTransactions: function() {
    return Meteor.user().profile.transactions.total;
  },

  notcomplete: function () {
    const NUMITERATIONS = 10;
    const currentIteration = Meteor.user().profile.catprogress.length;

    return (currentIteration < NUMITERATIONS);

  },

  currentprogess: function() {

    const NUMITERATIONS = 10;

    const total = Meteor.user().profile.transactions.total;
    const increment = total / NUMITERATIONS;
    const currentIteration = Meteor.user().profile.catprogress.length;

    return parseFloat(currentIteration * increment).toFixed(0);

  },


  pctCategorized: function () {
    return parseFloat(Meteor.user().profile.transactions.pct_categorized *100).toFixed(0);
  },


  ProgressBar: function () {
    return ProgressBar;
  },


  lowInfo: function () {

    const CATEGORIZATION_THRESHOLD = 0.35;
    const TRANSACTIONS_THRESHOLD = 35;

    const pct = Meteor.user().profile.transactions.pct_categorized;
    const total = Meteor.user().profile.transactions.total;
    
    return ( pct < CATEGORIZATION_THRESHOLD || total < TRANSACTIONS_THRESHOLD);

  },


  currentprogessPct: function() {

    const NUMITERATIONS = 10;
    const currentIteration = Meteor.user().profile.catprogress.length;

    return parseFloat((currentIteration/NUMITERATIONS)*100).toFixed(0);

  },


});

/*****************************************************************************/
/* Step3: Lifecycle Hooks */
/*****************************************************************************/
Template.Step3.onCreated(function () {

  this.haveSufficientCategorization = new ReactiveVar(false);
  Meteor.call('transactionsCategorizationAnalysis');

  Meteor.call('categorizationUpdateProcess',2500,10,5);

});

Template.Step3.onRendered(function () {
  


  mixpanel.track("Sign Up - Step 3");

});

Template.Step3.onDestroyed(function () {

});
