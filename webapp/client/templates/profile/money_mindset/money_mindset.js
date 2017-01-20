/*****************************************************************************/
/* MoneyMindset: Event Handlers */
/*****************************************************************************/
Template.MoneyMindset.events({
  'click #advance': function () {

    let numQ = Onboarding.find().count();
    let curStep = Number(Session.get("onboarding-step"));

    if (curStep === numQ) {
      Router.go('/profile/confirm');
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

    Router.go('/mindset/explain');
  },

  'click .quiz-answer': function (e, t) {

    let CurrentMMS = MoneyMindset.findOne({userId: Meteor.userId()});
    if (CurrentMMS == undefined) {
      var quiz_results = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    } else {
      var quiz_results = CurrentMMS.quiz_results;
    }

    var question = Number(Session.get("onboarding-step"));
    var choice = Number(e.currentTarget.id);

    quiz_results[question] = choice;

    if (CurrentMMS == undefined) {
      MoneyMindset.insert({'userId': Meteor.userId(), 'quiz_results': quiz_results});
    } else {
      MoneyMindset.update({_id: CurrentMMS._id}, {$set: {quiz_results: quiz_results}});
    }

    $('#quiz')
      .progress('increment');

    var numQ = Onboarding.find().count();

    // see : https://github.com/daneden/animate.css
    let animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    $('#' + choice).addClass('animated rubberBand')
      .one(animationEnd, function () {
        $(this).removeClass('animated rubberBand');
      });
  },


  'click .action-profile': function (e, t) {
    Router.go("/myprofile");
  }

});

/*****************************************************************************/
/* MoneyMindset: Helpers */
/*****************************************************************************/
Template.MoneyMindset.helpers({
  button_color: function () {
    let numQ = Onboarding.find().count();
    if (Session.get("onboarding-step") != numQ) {
      return "teal";
    } else {
      return "disabled";
    }
  },

  prev_button_color: function () {
    let numQ = Onboarding.find().count();
    if (Session.get("onboarding-step") != 1) {
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

  last_question: function () {
    let current = Session.get("onboarding-step");
    let total = Onboarding.find().count();
    return (current === total);
  },

  currentAnswer() {
    qnum = Number(Session.get("onboarding-step"));
    let CurrentMMS = MoneyMindset.findOne({userId: Meteor.userId()});

    if (CurrentMMS == undefined) return "#9e9e9e";  // hmm...should not happen but no Quiz object??

    return (this.number === CurrentMMS.quiz_results[qnum] ? "#00897b" : "#4db6ac");

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
/* MoneyMindset: Lifecycle Hooks */
/*****************************************************************************/
Template.MoneyMindset.onCreated(function () {

  Session.set("onboarding-step", 1);

  // Subscribe to subscriptions at the Template level
  var self = this;

  self.autorun(function () {
    self.subscribe('Onboarding.group', 3);
    self.subscribe('moneymindset');
  });


});

Template.MoneyMindset.onRendered(function () {

  $('#advance')
    .progress({
      label: 'ratio',
      text: {
        active: 'Question {value} of {total}',
        success: 'Complete!',
        ratio: 'Question {value} of {total}'
      }
    })
  ;

});

Template.MoneyMindset.onDestroyed(function () {
});
