/*****************************************************************************/
/* Info: Event Handlers */
/*****************************************************************************/
Template.Info.events({
});

/*****************************************************************************/
/* Info: Helpers */
/*****************************************************************************/
Template.Info.helpers({
});

/*****************************************************************************/
/* Info: Lifecycle Hooks */
/*****************************************************************************/
Template.Info.onCreated(function () {
  // Subscribe to subscriptions at the Template level
  var self = this;
  self.autorun(function() {
    self.subscribe('financialprofile');
  });

});

Template.Info.onRendered(function () {

  $('.ui.modal.info')
    .modal({
      closable: false,
      blurring: false,
      transition: 'fly left',
      onDeny: function() {
        $('.ui.modal.info').modal('hide');
        window.location = "http://www.mymoneycomb.com";
      }
    })
    .modal('show')

  mixpanel.track("Sign Up - Info");
});

Template.Info.onDestroyed(function () {
});
