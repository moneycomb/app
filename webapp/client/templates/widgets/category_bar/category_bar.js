/*****************************************************************************/
/* CategoryBar: Event Handlers */
/*****************************************************************************/
Template.CategoryBar.events({
});

/*****************************************************************************/
/* CategoryBar: Helpers */
/*****************************************************************************/
Template.CategoryBar.helpers({

  left_width() {
    var x = ((this.target - this.spent)/this.target) * 270;
    return x;
  },

  used_width() {
    var x = (this.amount / this.target) * 270;
    return x;
  },

  used_start() {
    var x = (((this.target-this.spent-this.amount)/this.target)*270)+25;
    return x;
  }
});

/*****************************************************************************/
/* CategoryBar: Lifecycle Hooks */
/*****************************************************************************/
Template.CategoryBar.onCreated(function () {
});

Template.CategoryBar.onRendered(function () {
});

Template.CategoryBar.onDestroyed(function () {
});
