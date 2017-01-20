Template.LoginNavigation.onCreated(function() {

});


Template.LoginNavigation.onRendered(function () {

  $('.mysidebar').first()
    .sidebar('attach events', '.closeme', 'hide')
  ;

  $('.ui.dropdown')
    .dropdown()
  ;

  
});

/*****************************************************************************/
/* Security: Helpers */
/*****************************************************************************/
Template.LoginNavigation.events({
  'click .action-sidebar': function(e,t) {
    console.log('here.......');
    $('.mysidebar')
      .sidebar('toggle')
    ;
  },

  'click .closeme': function(e,t) {
    const selected = e.currentTarget.id;
    console.log('Route to /' + selected);
    $('.mysidebar')
      .sidebar('hide');
    Route.go('/'+selected);

  },

  'click #sidebarcloser': function(e,t) {
    console.log('close sidebar');
    $('.mysidebar')
      .sidebar('hide')
    ;
  }

});

Template.LoginNavigation.helpers({

  cells: function () {
    return Cells.find();
  }
  
})




