/*****************************************************************************/
/* ExplainQuizResults: Event Handlers */
/*****************************************************************************/
Template.ExplainQuizResults.events({
  
  
});

/*****************************************************************************/
/* ExplainQuizResults: Helpers */
/*****************************************************************************/
Template.ExplainQuizResults.helpers({
  primaryaspect: function() {
    const quizId = Session.get("quizId");
    return QuizResults.findOne({_id: quizId}).primaryAspect()
  },

  personas: function () {
    return Personas.find();
  },

  quizmode: function () {
    const mode = Session.get("quizmode");

    return ( mode == undefined ? false : mode);
  },

  primeDescription: function() {
    const quizId = Session.get("quizId");
    const { aspect1 } = QuizResults.findOne({_id: quizId}).primaryAspect();
    console.log("aspect1:"+ aspect1);
    const primeAspect = Personas.findOne({name: aspect1});
    return primeAspect.description;
  },
  
  
});

/*****************************************************************************/
/* ExplainQuizResults: Lifecycle Hooks */
/*****************************************************************************/
Template.ExplainQuizResults.onCreated(function () {
  // Subscribe to subscriptions at the Template level

  // Save the quiz results into the collection
  const quizId = QuizResults.insert({quiz_results: Session.get("quiz_results") });
  Session.set("quizId", quizId);

  var self = this;
  self.autorun(function() {
    self.subscribe('quizresults');
    self.subscribe('personas');
  });

});


Template.ExplainQuizResults.onRendered(function () {

  mixpanel.track("Took Quiz - Viewing Results");
  
});

Template.ExplainQuizResults.onDestroyed(function () {
});
