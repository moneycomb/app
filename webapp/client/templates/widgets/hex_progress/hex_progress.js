/*****************************************************************************/
/* HexProgress: Event Handlers */
/*****************************************************************************/
Template.HexProgress.events({
});

/*****************************************************************************/
/* HexProgress: Helpers */
/*****************************************************************************/
Template.HexProgress.helpers({
  level: function () {
    return this.level
  },

  bar: function () {

    var level = this.level/100;

    if (level<0) {
      level = 0;
    }
    if (level>1.0) {
      level = 1.0;
    }

    /* Varied shades
    if (level>0.9) {
      var barColor = "#ffa000";
    } else if (level>0.8) {
      var barColor = "#ffc107";
    } else {
      var barColor = "#ffd54f";
    }
    */

    var barColor = "#ffa000";

    var minY=17;
    var maxHeight=191;
    var range = maxHeight - minY;
    var scaled = level*range;
    var startY = maxHeight-scaled;
    var height = scaled +  minY;


    return {y:startY, height: height, color: barColor};

  }
});

/*****************************************************************************/
/* HexProgress: Lifecycle Hooks */
/*****************************************************************************/
Template.HexProgress.onCreated(function () {
});

Template.HexProgress.onRendered(function () {
});

Template.HexProgress.onDestroyed(function () {
});
