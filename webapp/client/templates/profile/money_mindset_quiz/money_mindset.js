/*****************************************************************************/
/* MoneyMindsetQuiz: Event Handlers */
/*****************************************************************************/
Template.MoneyMindsetQuiz.events({
  'click #advance': function () {

    let numQ = Onboarding.find().count();
    let curStep = Number(Session.get("onboarding-step"));

    if (curStep === numQ) {
      Router.go('/quiz/results');
    } else {
      $('#quiz')
        .progress('increment');
      Session.set("onboarding-step", curStep + 1);
    }
  },

  'click #backward': function () {
    $('#quiz')
      .progress('decrement');
    Session.set("onboarding-step", Session.get("onboarding-step") - 1);
  },

  'click #to-explain': function () {

    Router.go('/discover/results');
  },

  'click .quiz-answer': function (e, t) {

    const numQ = Onboarding.find().count();
    let curQuestion = Number(Session.get("onboarding-step"));
    let quiz_results = Session.get("quiz_results");
    let choice = Number(e.currentTarget.id);

    quiz_results[curQuestion] = choice;
    Session.set("quiz_results",quiz_results);

    // see : https://github.com/daneden/animate.css
    /*
    let animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    $('#' + choice).addClass('animated rubberBand')
      .one(animationEnd, function () {
        $(this).removeClass('animated rubberBand');
      });
*/
    // auto-advance if we are not the end of the questions
    if (curQuestion <= numQ) {
      Session.set("onboarding-step", curQuestion + 1);
    }

  },

});

/*****************************************************************************/
/* MoneyMindsetQuiz: Helpers */
/*****************************************************************************/
Template.MoneyMindsetQuiz.helpers({
  button_color: function () {
    let numQ = Onboarding.find().count();
    if (Session.get("onboarding-step") != numQ) {
      return "teal";
    } else {
      return "disabled";
    }
  },

  button_text: function () {
    let numQ = Onboarding.find().count();
    if (Session.get("onboarding-step") != numQ) {
      return "Next";
    } else {
      return "Done! See Your Results";
    }
  },

  totalQ: function () {
    return Onboarding.find().count();
  },

  progressString: function () {
    const totalQ = Onboarding.find().count();
    const currentQ = Session.get("onboarding-step");
    return "Question " + currentQ + ' of ' + totalQ;
  },

  not_first_question: function () {
    return (Session.get("onboarding-step") != 1);
  },

  step: function () {
    return Session.get("onboarding-step");
  },

  currentAnswerColor() {
    // return personaColors(this.number-1)
    return "#26a69a";
  },

  complete: function () {
    let current = Session.get("onboarding-step");
    let total = Onboarding.find().count();
    return (current > total);
  },

  currentAnswer() {
    qnum = Number(Session.get("onboarding-step"));

    let quiz_results = Session.get("quiz_results");

    return (this.number === quiz_results[qnum] ? "#00897b" : "#4db6ac");

  },

  onboardingQ: function () {
    let step = Number(Session.get("onboarding-step"));
    return Onboarding.findOne({number: step});
  },

  onboardingChoices: function () {
    let step = Number(Session.get("onboarding-step"));
    const choicesInOrder = Onboarding.findOne({number: step}).choices;
    const choicesShuffled = _.shuffle(choicesInOrder);
    return choicesShuffled;
  }

});

/*****************************************************************************/
/* MoneyMindsetQuiz: Lifecycle Hooks */
/*****************************************************************************/
Template.MoneyMindsetQuiz.onCreated(function () {

  Session.set("onboarding-step", 1);
  Session.set("quizmode", true);
  Session.set("quiz_results", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  // ensure we are logged out..corner case but an existing user may want to take the quiz.
  if (Meteor.userId()) {
    Meteor.logout();
  }


  // Subscribe to subscriptions at the Template level
  var self = this;

  self.autorun(function () {
    self.subscribe('Onboarding.group', 3);

  });


});

Template.MoneyMindsetQuiz.onRendered(function () {

    mixpanel.track("Taking Quiz - Viewing Results");
});

Template.MoneyMindsetQuiz.onDestroyed(function () {
});
