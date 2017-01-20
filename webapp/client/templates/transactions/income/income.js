/*****************************************************************************/
/* Income: Event Handlers */
/*****************************************************************************/
Template.Income.events({
});

/*****************************************************************************/
/* Income: Helpers */
/*****************************************************************************/
Template.Income.helpers({
});

/*****************************************************************************/
/* Income: Lifecycle Hooks */
/*****************************************************************************/
Template.Income.onCreated(function () {
  // Subscribe to subscriptions at the Template level
  var self = this;
  self.autorun(function () {
    self.subscribe('Transactions.cell','i');
  });

});

Template.Income.onRendered(function () {
});

Template.Income.onDestroyed(function () {
});
