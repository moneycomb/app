/*****************************************************************************/
/* DebtsItem: Event Handlers */
/*****************************************************************************/
Template.DebtsItem.events({
  'click .action-edit': function (e,t) {
    Session.set("EDITDEBT",true);
  },

  'submit form': function (e,t) {
    console.log('adding debt');
  }
});

/*****************************************************************************/
/* DebtsItem: Helpers */
/*****************************************************************************/
Template.DebtsItem.helpers({
  editDebt: function() {
    return Session.get("EDITDEBT");
  }

});

/*****************************************************************************/
/* DebtsItem: Lifecycle Hooks */
/*****************************************************************************/
Template.DebtsItem.onCreated(function () {
});

Template.DebtsItem.onRendered(function () {
});

Template.DebtsItem.onDestroyed(function () {
});
