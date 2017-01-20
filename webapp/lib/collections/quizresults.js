QuizResults = new Mongo.Collection('quizresults');

QuizResults.allow({
  insert: function(userId, doc){
    return true;
  },
  update: function(userId, doc){
    return false;
  },
  remove() { return false;}
});

/*
QuizResultsSchema = new SimpleSchema({
  
  quiz_results: {
    type: [Number],
    label: "MMS Quiz Answers",
  },
});

QuizResults.attachSchema(QuizResultsSchema);
*/


// see: meteor add matb33:collection-hooks
QuizResults.before.insert(function (userId, doc) {
  doc.createdAt = new Date();
});


QuizResults.helpers({

  answerHisto: function(number) {

    let count=0;
    let answers = this.quiz_results;
    _.each(answers, function(a) {
      if (a === number) {
        count++;
      }
    });
    return count;
  },

  analyze: function() {

    const aspects = ['Cutting Edge', 'The Warrior', 'The Guru', 'Trendsetter', 'The Good Life']

    var answerCount = [0,0,0,0,0,0];
    // get quiz results either from session var or user level
    let answers = []
    if (Session.get("quiz_results") != undefined) {
      answers = Session.get("quiz_results");
    } else {
      answers = this.quiz_results;
    }


    _.each(answers, function(a) {
      answerCount[a]++
    });

    if (answerCount[0] != 0) {
      console.warn('MMS Quiz incomplete: %d questions not answered',answerCount[0])
      answerCount[0] = 0
    }

    console.log(answerCount)


    var totalQ = 0

    for ( var i=0; i < answerCount.length ; i++) {
      totalQ += answerCount[i];
    }
    
    console.log("total Q is %d",totalQ);

    let aspectPct = _.map(answerCount, function(num) {
      return parseFloat(num / totalQ).toFixed(2)
    })

    let resultArray = _.zip(aspects, _.rest(aspectPct))


    return resultArray
  },

  primaryAspect: function() {
    const aspectStrings = ['Cutting Edge', 'The Warrior', 'The Guru', 'Trendsetter', 'The Good Life']
    var answerCount = [0,0,0,0,0,0]

    // get quiz results either from session var or user level
    let answers = []
    if (Session.get("quiz_results") != undefined) {
      answers = Session.get("quiz_results");
    } else {
      answers = this.quiz_results;
    }


    _.each(answers, function(a) {
      answerCount[a]++
    });

    // get rid of unaswered
    answerCount = _.rest(answerCount);

    let maxindex = indexofMax(answerCount);
    let aspect1 = aspectStrings[maxindex[0]];
    let aspect2 = aspectStrings[maxindex[1]];

    return {aspect1: aspect1, aspect2: aspect2};
  },

  primaryIcon: function() {
    const aspectStrings = ['Cutting Edge', 'The Warrior', 'The Guru', 'Trendsetter', 'The Good Life']
    var answerCount = [0,0,0,0,0,0];
    // get quiz results either from session var or user level
    let answers = []
    if (Session.get("quiz_results") != undefined) {
      answers = Session.get("quiz_results");
    } else {
      answers = this.quiz_results;
    }


    _.each(answers, function(a) {
      answerCount[a]++
    });

    // get rid of unaswered
    answerCount = _.rest(answerCount);

    let maxindex = indexofMax(answerCount);
    let aspect1 = aspectStrings[maxindex[0]];
    let aspect2 = aspectStrings[maxindex[1]];

    return {aspect1: aspect1, aspect2: aspect2};
  }
});
