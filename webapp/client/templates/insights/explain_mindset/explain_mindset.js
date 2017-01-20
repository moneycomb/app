/*****************************************************************************/
/* ExplainMindset: Event Handlers */
/*****************************************************************************/
Template.ExplainMindset.events({
  
  
});

/*****************************************************************************/
/* ExplainMindset: Helpers */
/*****************************************************************************/
Template.ExplainMindset.helpers({
  primaryaspect: function() {
    return MoneyMindset.findOne({userId: Meteor.userId()}).primaryAspect()
  },

  personas: function () {
    return Personas.find();
  },

  quizmode: function () {
    const mode = Session.get("quizmode");

    return ( mode == undefined ? false : mode);
    
  },

  primeDescription: function() {
    const { aspect1 } = MoneyMindset.findOne({userId: Meteor.userId()}).primaryAspect();
    console.log("aspect1:"+ aspect1);
    const primeAspect = Personas.findOne({name: aspect1});
    return primeAspect.description;
  },

  secondaryDescription: function() {
    const { aspect2 } = MoneyMindset.findOne({userId: Meteor.userId()}).primaryAspect();
    const secondaryAspect = Personas.findOne({name: aspect2});
    return secondaryAspect.description;
  },
  
});

/*****************************************************************************/
/* ExplainMindset: Lifecycle Hooks */
/*****************************************************************************/
Template.ExplainMindset.onCreated(function () {
  // Subscribe to subscriptions at the Template level
  var self = this;
  self.autorun(function() {
    self.subscribe('moneymindset');
    self.subscribe('personas');
  });

});


Template.ExplainMindset.onRendered(function () {


});

Template.ExplainMindset.onDestroyed(function () {
});
