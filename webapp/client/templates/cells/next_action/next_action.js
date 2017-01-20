/*****************************************************************************/
/* NextAction: Event Handlers */
/*****************************************************************************/
Template.NextAction.events({
  'click .view-ideas': function(e,t) {
    Meteor.call('logActivity','congrats','You clicked a button!',e.currentTarget.id);
  }
});

/*****************************************************************************/
/* NextAction: Helpers */
/*****************************************************************************/
Template.NextAction.helpers({
});

/*****************************************************************************/
/* NextAction: Lifecycle Hooks */
/*****************************************************************************/
Template.NextAction.onCreated(function () {
});

Template.NextAction.onRendered(function () {
});

Template.NextAction.onDestroyed(function () {
});
