/*****************************************************************************/
/* DebtsList: Event Handlers */
/*****************************************************************************/
Template.DebtsList.events({
  'click .action-profile': function (e,t) {
    Router.go("/myprofile");
  }
});

/*****************************************************************************/
/* DebtsList: Helpers */
/*****************************************************************************/
Template.DebtsList.helpers({
  debts: function() {
    return Debts.find();
  }
});

/*****************************************************************************/
/* DebtsList: Lifecycle Hooks */
/*****************************************************************************/
Template.DebtsList.onCreated(function () {
  // Subscribe to subscriptions at the Template level
  var self = this;
  self.autorun(function() {
    self.subscribe('debts');
  });
});

Template.DebtsList.onRendered(function () {
});

Template.DebtsList.onDestroyed(function () {
});
