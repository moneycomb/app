/*****************************************************************************/
/* CategoryPreference: Event Handlers */
/*****************************************************************************/
Template.CategoryPreference.events({
  'click .next-step': function() {
    var template = Template.instance();
    var next = Number(template.data.step)+1;

    if (next === 7) {
      nextstep="/profile/confirm";
    } else {
      nextstep ="/profile/step/"+next;
    }

    Router.go(nextstep)

  }
});

/*****************************************************************************/
/* CategoryPreference: Helpers */
/*****************************************************************************/
Template.CategoryPreference.helpers({

  category: function() {
    var template = Template.instance();
    var step = Number(template.data.step);

    var p = Cells.findOne({number:step});
    return p;

  }

});

/*****************************************************************************/
/* CategoryPreference: Lifecycle Hooks */
/*****************************************************************************/
Template.CategoryPreference.onCreated(function () {

  // Subscribe to subscriptions at the Template level
  var self = this;
  self.autorun(function() {
    self.subscribe('cells');
    self.subscribe('mprofiles');
  });

});

Template.CategoryPreference.onRendered(function () {

});

Template.CategoryPreference.onDestroyed(function () {
});
