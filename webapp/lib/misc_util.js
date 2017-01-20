try {



indexofMax = function (arr) {
  if (arr.length === 0) {
    return -1;
  }

  var max = 0;
  var secondmax = 0
  var maxIndex = 0;
  var secIndex = 0;

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      maxIndex = i;
      max = arr[i];
    } else if (arr[i] >= secondmax) {
      secIndex = i;
      secondmax = arr[i];
    }
  }
  return [maxIndex, secIndex];
}

personaColors = function (index) {
  
  const colors = [
    '#FFB300',
    '#F18C00',
    '#00695C',
    '#26A69A',
     '#80CBC4'
  ]
  return colors[index]

}

cellsString = function (abbrev) {
  const cString = {
    'eo': 'Eating Out',
    'ds': 'Digital Services',
    'r': 'Recharge',
    't': 'Travel',
    'e': 'Entertainment',
    's': 'Shopping',
  }

  return cString[abbrev];

}

calcSpendSpeed = function (cell, tf, delta, userId = null) {

  if (userId == null ) {
    userId = Meteor.userId();
  }

  const perioddays = Number(tf.substring(1));   // t30 -->30

  let An = Analysis.findOne({userId: userId});
  let A = Allocations.findOne({userId: userId});

  let target = (A[cell].target/30)*perioddays;
  let spent = An.cellSpend[cell][tf].amount + delta;
  let SS = parseFloat(spent/target * 100).toFixed(0);
  return SS;

}

untilPhrase = function(numdays) {
  const phrases = {
    0: 'now',
    1: 'a day',
    2: 'a couple of days',
    3: 'a few days',
    4: 'four days',
    5: 'five days',
    6: 'about a week',
    7: 'a week',
    8: 'at least a week',
    9: 'at least a week',
    10: 'about a week and a half',
    11: 'about a week and a half',
    12: 'about 2 weeks',
    13: 'about 2 weeks',
    14: 'two weeks',
    15: 'about two weeks',
    16: 'at least two weeks',
    17: 'at least two weeks',
    18: 'two and a half weeks',
    19: 'about 3 weeks',
    20: 'about 3 weeks',
    21: '3 weeks',
    22: 'at least 3 weeks',
    23: '3 and a half weeks',
    24: '3 and a half weeks',
    25: '3 and a half weeks',
    26: 'about 4 weeks',
    27: 'about 4 weeks',
    28: '4 weeks',
    29: 'about a month',
    30: 'a month',
    31: 'a month',
  }

  return (phrases[numdays] != undefined ? phrases[numdays] : "over a month...")

}

}catch(err) {
  console.log(err);
}