/*****************************************************************************/
/* AllocationsHome: Event Handlers */
/*****************************************************************************/
Template.AllocationsHome.events({
  'click .action-help-spendsetter': function (e, t) {

    $('.ui.modal.help-spendsetter')
      .modal('show')
  }
});

/*****************************************************************************/
/* AllocationsHome: Helpers */
/*****************************************************************************/
Template.AllocationsHome.helpers({
});

/*****************************************************************************/
/* AllocationsHome: Lifecycle Hooks */
/*****************************************************************************/
Template.AllocationsHome.onCreated(function () {
});

Template.AllocationsHome.onRendered(function () {
});

Template.AllocationsHome.onDestroyed(function () {
});
