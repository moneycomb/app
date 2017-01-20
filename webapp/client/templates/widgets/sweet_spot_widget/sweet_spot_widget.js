/*****************************************************************************/
/* SweetSpotWidget: Event Handlers */
/*****************************************************************************/
Template.SweetSpotWidget.events({
});

/*****************************************************************************/
/* SweetSpotWidget: Helpers */
/*****************************************************************************/
Template.SweetSpotWidget.helpers({
  markerPosition: function() {
    const max = 382,
      min = 54,
      maxUtility = 150

    const rangeWidth = max - min

    console.log("Range = " + rangeWidth)

    let pct = this.value/maxUtility;
    let pos = pct *  rangeWidth;

    return Number(min+pos)
  }
});

/*****************************************************************************/
/* SweetSpotWidget: Lifecycle Hooks */
/*****************************************************************************/
Template.SweetSpotWidget.onCreated(function () {
});

Template.SweetSpotWidget.onRendered(function () {
});

Template.SweetSpotWidget.onDestroyed(function () {
});
