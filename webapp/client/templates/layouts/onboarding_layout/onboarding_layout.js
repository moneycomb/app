Template.OnboardingLayout.helpers({
});

Template.OnboardingLayout.events({
  
});



/*****************************************************************************/
/* OnboardingLayout: Lifecycle Hooks */
/*****************************************************************************/
Template.OnboardingLayout.onCreated(function () {

  // Subscribe to subscriptions at the Template level
  var self = this;
  self.autorun(function() {
    self.subscribe('allocation');
    self.subscribe('financialprofile');
    self.subscribe('analysis');
    self.subscribe('hives');
    self.subscribe('cells');
    self.subscribe('moneymindset');
    self.subscribe('subcells');
  });

});

Template.OnboardingLayout.onRendered(function () {
});

Template.OnboardingLayout.onDestroyed(function () {
});