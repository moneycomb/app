/*****************************************************************************/
/* StatSquare: Event Handlers */
/*****************************************************************************/
Template.StatSquare.events({
});

/*****************************************************************************/
/* StatSquare: Helpers */
/*****************************************************************************/
Template.StatSquare.helpers({
  headerColor: function() {
    if (this.hdrcolor) {
      return this.hdrcolor;
    } else {
      return MoneyComb.LightenDarkenColor(this.bgcolor, -30);
    }
  },

  thisLabel: function() {
    return (this.label == "" ? "." : this.label);
  }
});

/*****************************************************************************/
/* StatSquare: Lifecycle Hooks */
/*****************************************************************************/
Template.StatSquare.onCreated(function () {
});

Template.StatSquare.onRendered(function () {
});

Template.StatSquare.onDestroyed(function () {
});
