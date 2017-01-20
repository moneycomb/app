/*****************************************************************************/
/* SegmentHeader: Event Handlers */
/*****************************************************************************/
Template.SegmentHeader.events({
});

/*****************************************************************************/
/* SegmentHeader: Helpers */
/*****************************************************************************/
Template.SegmentHeader.helpers({
  calcColor: function() {
    return (this.color == undefined ? '#848484' : this.color)
  }
});

/*****************************************************************************/
/* SegmentHeader: Lifecycle Hooks */
/*****************************************************************************/
Template.SegmentHeader.onCreated(function () {
});

Template.SegmentHeader.onRendered(function () {
});

Template.SegmentHeader.onDestroyed(function () {
});
