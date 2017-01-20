/*****************************************************************************/
/* ActionPanel: Event Handlers */
/*****************************************************************************/
Template.ActionPanel.events({
  'click .action-ss': function () {
    console.log("Spend Suggestion");
  },

  'click .action-sn': function () {
    console.log("Something New");
  },

  'click .action-mm': function () {
    console.log("Money Meditation");
  },

  'click .action-na': function () {
    console.log("Needs Attention");
  },

  'click .action-ia': function () {
    console.log("Improve Allocation");
  },

  'click .action-sn': function () {
    console.log("Something New");
  },

  'click .action-stat': function () {
    console.log("Spend Stat");
    Router.go("/analysis");

  },


});

/*****************************************************************************/
/* ActionPanel: Helpers */
/*****************************************************************************/
Template.ActionPanel.helpers({




});

/*****************************************************************************/
/* ActionPanel: Lifecycle Hooks */
/*****************************************************************************/
Template.ActionPanel.onCreated(function () {
});

Template.ActionPanel.onRendered(function () {
});

Template.ActionPanel.onDestroyed(function () {
});
