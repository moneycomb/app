Template.BasicNavigation.onCreated(function() {

});


Template.BasicNavigation.onRendered(function () {

  //$(".button-collapse").sideNav(
  //  {
      //menuWidth: 300, // Default is 240
      //edge: 'right', // Choose the horizontal origin
      //closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
  //  }
  //);

  //$('.ui.labeled.icon.sidebar')
  //  .sidebar('toggle')
  //;

  //$(document).ready(function(){
  //  $('.ui.dropdown').dropdown();
  //});
  /*$('.ui.labeled.icon.sidebar')
    .sidebar('toggle')
  ;*/

});

/*****************************************************************************/
/* Security: Helpers */
/*****************************************************************************/
Template.BasicNavigation.helpers({

  version: function() {
    return Meteor.settings.public.version;
  }
});




