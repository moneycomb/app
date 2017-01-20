/*****************************************************************************/
/* MyActivities: Event Handlers */
/*****************************************************************************/
Template.MyActivities.events({
});

/*****************************************************************************/
/* MyActivities: Helpers */
/*****************************************************************************/
Template.MyActivities.helpers({
  activities: function() {
    return ActivityFeed.find({userId: Meteor.userId()},{sort: {date: -1}, limit: 10});
  }
});

/*****************************************************************************/
/* MyActivities: Lifecycle Hooks */
/*****************************************************************************/
Template.MyActivities.onCreated(function () {
  // Subscribe to subscriptions at the Template level
  var self = this;

  self.autorun(function() {
    self.subscribe('activityfeed');
  });
});

Template.MyActivities.onRendered(function () {
});

Template.MyActivities.onDestroyed(function () {
});
