Template.MasterLayout.helpers({
});

Template.MasterLayout.events({

  'click [data-logout]': function(e,tmpl) {
    Meteor.logout();
  },

});



/*****************************************************************************/
/* MasterLayout: Lifecycle Hooks */
/*****************************************************************************/
Template.MasterLayout.onCreated(function () {

  // Subscribe to subscriptions at the Template level
  var self = this;
  self.autorun(function() {
    self.subscribe('allocation');
    self.subscribe('accounts');
    self.subscribe('financialprofile');
    self.subscribe('analysis');
    self.subscribe('hives');
    self.subscribe('cells');
    self.subscribe('moneymindset');
    self.subscribe('subcells');
    //self.theseTransactions = Meteor.subscribeWithPagination('transactions',12);
  });

});

Template.MasterLayout.onRendered(function () {
  /*
  $('.right.menu.open').on("click",function(e){
    e.preventDefault();
    $('.ui.vertical.menu').toggle();
  });

  $('.ui.dropdown').dropdown();

  */

  /*$('.mysidebar')
    .sidebar('push page')
    .sidebar('toggle')
  ;*/

});

Template.MasterLayout.onDestroyed(function () {
});