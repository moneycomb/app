/*****************************************************************************/
/* AllocationsTable: Event Handlers */
/*****************************************************************************/
Template.AllocationsTable.events({
});

/*****************************************************************************/
/* AllocationsTable: Helpers */
/*****************************************************************************/
Template.AllocationsTable.helpers({
  here: function() {

    var summary = '';

    var SV = Session.get("adjustedTarget");
    _.each(SV, function(i) {

      summary = summary + ":"+String(i);

    });

    return summary;

  }
});

/*****************************************************************************/
/* AllocationsTable: Lifecycle Hooks */
/*****************************************************************************/
Template.AllocationsTable.onCreated(function () {
});

Template.AllocationsTable.onRendered(function () {
});

Template.AllocationsTable.onDestroyed(function () {
});
