Template.MoneyMindsetKey.events({
})

Template.MoneyMindsetKey.helpers({

  personas: function() {
    return Personas.find()
  }

})


Template.MoneyMindsetKey.onCreated(function() {
  // Subscribe to subscriptions at the Template level
  var self = this;

  self.autorun(function () {
    self.subscribe('personas');
  });

});


