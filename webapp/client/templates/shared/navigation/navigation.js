Template.Navigation.onCreated(function() {

});


Template.Navigation.onRendered(function () {

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
Template.Navigation.events({
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
    $('.cellsdd').dropdown({action: 'hide'});
    console.log("EVENT HERE");
    /*Route.go('/'+selected); */

  },

  'click #sidebarcloser': function(e,t) {
    console.log('close sidebar');
    $('.mysidebar')
      .sidebar('hide')
    ;
  }

});

Template.Navigation.helpers({

  cells: function () {
    return Cells.find();
  },

  hp: function() {
    let FP = FinancialProfile.findOne({userId: Meteor.userId()});
    return (FP.honeypoints == undefined ? 0 : FP.honeypoints)
  },
  
})




