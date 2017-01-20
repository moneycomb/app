/*****************************************************************************/
/* ManageSubcells: Event Handlers */
/*****************************************************************************/
Template.ManageSubcells.events({
});

/*****************************************************************************/
/* ManageSubcells: Helpers */
/*****************************************************************************/
Template.ManageSubcells.helpers({
  subcells: function(cell) {
    return SubCells.find({parent: cell});
  }
});

/*****************************************************************************/
/* ManageSubcells: Lifecycle Hooks */
/*****************************************************************************/
Template.ManageSubcells.onCreated(function () {
  // Subscribe to subscriptions at the Template level
  var self = this;
  self.autorun(function() {
    self.subscribe('subcells');
  });
});

Template.ManageSubcells.onRendered(function () {
});

Template.ManageSubcells.onDestroyed(function () {
});
