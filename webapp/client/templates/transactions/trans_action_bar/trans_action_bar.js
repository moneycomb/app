/*****************************************************************************/
/* TransActionBar: Event Handlers */
/*****************************************************************************/
Template.TransActionBar.events({
});

/*****************************************************************************/
/* TransActionBar: Helpers */
/*****************************************************************************/
Template.TransActionBar.helpers({
  diracolor: function() {
    return (this.sortBy == "ascending" ? "#cccccc" : this.bgcolor);
  },
  dirdcolor: function() {
    return (this.sortBy == "descending" ? "#cccccc" : this.bgcolor);
  },

  timeFrame: function() {
    const lookUp = {
      'tf-7': 'last 7 days',
      'tf-30': 'last 30 days',
      'tf-60': 'last 60 days',
      'tf-90': 'last 90 days',
      'tf-365': 'last 365 days',
    }

    let x = this.filterTimeFrame;
    return lookUp[x];
  },

});

/*****************************************************************************/
/* TransActionBar: Lifecycle Hooks */
/*****************************************************************************/
Template.TransActionBar.onCreated(function () {
});

Template.TransActionBar.onRendered(function () {
  $('.ui.dropdown')
    .dropdown()
  ;
});

Template.TransActionBar.onDestroyed(function () {
});
