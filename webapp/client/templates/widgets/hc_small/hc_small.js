/*****************************************************************************/
/* HcSmall: Event Handlers */
/*****************************************************************************/
Template.HcSmall.events({
});

/*****************************************************************************/
/* HcSmall: Helpers */
/*****************************************************************************/
Template.HcSmall.helpers({
  fill: function() {

    f = {};

    var template = Template.instance();
    var current = template.data.current;

    for (var i=1; i<=7; i++) {
      if (i < current) {
        f["c"+i] = "#216995";   // done - blue
      } else if (i === current) {
        f["c"+i] = "#ED562E";   // doing - orange
      } else {
        f["c"+i] = "#D8D8D8"; // to be done - gray
      }
    }
    return f
  }
});

/*****************************************************************************/
/* HcSmall: Lifecycle Hooks */
/*****************************************************************************/
Template.HcSmall.onCreated(function () {

  console.log(this.data.current);

});

Template.HcSmall.onRendered(function () {
});

Template.HcSmall.onDestroyed(function () {
});
