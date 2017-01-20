/*****************************************************************************/
/* SpendSuggestionCard: Event Handlers */
/*****************************************************************************/
Template.SpendSuggestionCard.events({
});

/*****************************************************************************/
/* SpendSuggestionCard: Helpers */
/*****************************************************************************/
Template.SpendSuggestionCard.helpers({
  cellName: function (abbrev) {
    return cellsString(abbrev)
  }

});

/*****************************************************************************/
/* SpendSuggestionCard: Lifecycle Hooks */
/*****************************************************************************/
Template.SpendSuggestionCard.onCreated(function () {
});

Template.SpendSuggestionCard.onRendered(function () {
  $('.special.card .image').dimmer({
    on: 'hover'
  });

  $('.popup-help').popup()
});

Template.SpendSuggestionCard.onDestroyed(function () {
});
