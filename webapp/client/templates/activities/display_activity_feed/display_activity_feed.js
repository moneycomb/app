/*****************************************************************************/
/* DisplayActivityFeed: Event Handlers */
/*****************************************************************************/
Template.DisplayActivityFeed.events({
});

/*****************************************************************************/
/* DisplayActivityFeed: Helpers */
/*****************************************************************************/
Template.DisplayActivityFeed.helpers({
  activityfeed: function() {
    return ActivityFeed.find({userId: Meteor.userId()},{sort: {date: -1},limit: 5});
  },



});

/*****************************************************************************/
/* DisplayActivityFeed: Lifecycle Hooks */
/*****************************************************************************/
Template.DisplayActivityFeed.onCreated(function () {
  // Subscribe to subscriptions at the Template level
  var self = this;

  self.autorun(function () {
    self.subscribe('activityfeed');
  });
});


Template.DisplayActivityFeed.onRendered(function () {
});

Template.DisplayActivityFeed.onDestroyed(function () {
});
