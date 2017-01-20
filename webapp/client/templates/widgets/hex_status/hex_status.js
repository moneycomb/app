/*****************************************************************************/
/* HexStatus: Event Handlers */
/*****************************************************************************/
Template.HexStatus.events({
});

/*****************************************************************************/
/* HexStatus: Helpers */
/*****************************************************************************/
Template.HexStatus.helpers({
  level: function () {
    return this.level
  },

  bar: function () {


    // #417505 - green
    // #D0021B - red
    // #206995 - blue

    var level = this.level/100;

    if (level<0) {
      level = 0;
    }
    if (level>1.0) {
      level = 1.0;
    }

    if (level>0.9) {
      var barColor = "#D0021B";
    } else if (level>0.8) {
      var barColor = "#F8E71C";
    } else {
      var barColor = "#417505";
    }




    var minY=11.5602651;
    var maxHeight=106.004588;
    var range = maxHeight - minY;
    var scaled = level*range;
    var startY = maxHeight-scaled;
    var height = scaled +  minY;


    return {y:startY, height: height, color: barColor};

  }
});

/*****************************************************************************/
/* HexStatus: Lifecycle Hooks */
/*****************************************************************************/
Template.HexStatus.onCreated(function () {
});

Template.HexStatus.onRendered(function () {
});

Template.HexStatus.onDestroyed(function () {
});
