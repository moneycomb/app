/*****************************************************************************/
/* CellStatus: Event Handlers */
/*****************************************************************************/
Template.CellStatus.events({
  'click #cell-status': function() {
    $('#cell-status')
      .transition('scale')
    ;
  }
});

/*****************************************************************************/
/* CellStatus: Helpers */
/*****************************************************************************/
Template.CellStatus.helpers({
  status: function() {

    var retval={};
    var max_y = 30;
    var max_height = 206;
    var delta = max_height - max_y;

    if (this.remaining > 0) {
      // we have money left!
      retval.height = (this.remaining/this.budget)*delta;
      retval.start_y = max_y+(max_height - retval.height);
      retval.fill_color = "#ffa000";
      retval.font_color = "#F6A623";
      retval.stroke = "#ffa000";
    } else {
      // we are over budget already.
      retval.fill_color = "#b2dfdb";
      retval.height = max_height;
      retval.start_y = max_y;
      retval.font_color = "#4db6ac";
      retval.stroke = "#4db6ac";
    }

    return retval;

  },

  styledRemaining: function() {

    return (this.remaining <0 ? Math.abs(this.remaining) : this.remaining);
  }
});

/*****************************************************************************/
/* CellStatus: Lifecycle Hooks */
/*****************************************************************************/
Template.CellStatus.onCreated(function () {
});

Template.CellStatus.onRendered(function () {
  $('#cell-status')
    .transition({
      animation:'scale',
      duration: 4000
    });
  ;
});

Template.CellStatus.onDestroyed(function () {
});
