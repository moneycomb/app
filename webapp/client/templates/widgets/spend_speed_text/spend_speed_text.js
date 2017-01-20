/*****************************************************************************/
/* SpendSpeedText: Event Handlers */
/*****************************************************************************/
Template.SpendSpeedText.events({
});

/*****************************************************************************/
/* SpendSpeedText: Helpers */
/*****************************************************************************/
Template.SpendSpeedText.helpers({
  color: function() {
    if (this.speed<=50) {
      return "#5fb7e5"; /*blue */
    } else if (this.speed<=100) {
      return "#ffd54f";
    } else if (this.speed<=150) {
      return "#ffc107";
    } else {
      return "#ff4081"
    }
  }
});

/*****************************************************************************/
/* SpendSpeedText: Lifecycle Hooks */
/*****************************************************************************/
Template.SpendSpeedText.onCreated(function () {
});

Template.SpendSpeedText.onRendered(function () {
});

Template.SpendSpeedText.onDestroyed(function () {
});
