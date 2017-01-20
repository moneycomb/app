/*****************************************************************************/
/* ManageHome: Event Handlers */
/*****************************************************************************/
Template.ManageHome.events({
});

/*****************************************************************************/
/* ManageHome: Helpers */
/*****************************************************************************/
Template.ManageHome.helpers({

  tags: function() {
    return Tags.find()
  },

  subcells: function() {
    return SubCells.find()
  },

});

/*****************************************************************************/
/* ManageHome: Lifecycle Hooks */
/*****************************************************************************/
Template.ManageHome.onCreated(function () {
  // Subscribe to subscriptions at the Template level
  var self = this;
  self.autorun(function() {
    self.subscribe('subcells');
    self.subscribe('tags');
  });
});

Template.ManageHome.onRendered(function () {
});

Template.ManageHome.onDestroyed(function () {
});
