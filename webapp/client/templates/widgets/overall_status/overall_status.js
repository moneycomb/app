/*****************************************************************************/
/* OverallStatus: Event Handlers */
/*****************************************************************************/
Template.OverallStatus.events({
  'click .action-help-ssl': function(e,t) {

    $('.ui.modal.help-ssl')
      .modal('show')
  }
  
  
});

/*****************************************************************************/
/* OverallStatus: Helpers */
/*****************************************************************************/
Template.OverallStatus.helpers({

  hasTarget: function (cell) {
    let A = Allocations.findOne({userId: Meteor.userId()});

    return (A[cell].target != 0);
  },

  speed: function(cell,tf) {
    let A = Allocations.findOne({userId: Meteor.userId()});
    let An = Analysis.findOne({userId: Meteor.userId()});


    //let P = "t"+period;
    let P = tf;
    let days = Number(tf.substring(1));  // "t30" ---> "30"

    let spent = An.cellSpendCummulative(cell,tf)
    let target = A[cell].target/30*days;

    // corner case: if target is set to 0, spend speed is 100...
    if (target == 0) {
      var SS = -1;
    } else {
      var SS = parseFloat(spent/target*100).toFixed(0);
    }
    return SS;
  }
});

/*****************************************************************************/
/* OverallStatus: Lifecycle Hooks */
/*****************************************************************************/
Template.OverallStatus.onCreated(function () {
  if (! Meteor.userId() ) { Router.go('/login')};
});

Template.OverallStatus.onRendered(function () {
  $('.cell-icon')
    .popup()
  ;

  $('#help-ssbar')
    .popup()
  ;

});

Template.OverallStatus.onDestroyed(function () {
});
