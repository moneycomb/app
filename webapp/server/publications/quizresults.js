Meteor.publish('quizresults', function () {
  return QuizResults.find({}, {sort: {"number": 1}});
});
