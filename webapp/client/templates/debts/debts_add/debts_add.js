/*****************************************************************************/
/* DebtsAdd: Event Handlers */
/*****************************************************************************/
Template.DebtsAdd.events({
  'click .action-add': function (e,t) {
    console.log("here!");
    Session.set("ADDDEBT",true);
  },

  'submit form': function (e,t) {
    console.log('adding debt');
  }
});

/*****************************************************************************/
/* DebtsAdd: Helpers */
/*****************************************************************************/
Template.DebtsAdd.helpers({
  addDebt: function() {
    return Session.get("ADDDEBT");
  }

});

/*****************************************************************************/
/* DebtsAdd: Lifecycle Hooks */
/*****************************************************************************/
Template.DebtsAdd.onCreated(function () {
});

Template.DebtsAdd.onRendered(function () {
});

Template.DebtsAdd.onDestroyed(function () {
});
