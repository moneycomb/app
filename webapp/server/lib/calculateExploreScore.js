calculateExploreScore = function (userId, lookback = 30) {

  // get the name and count of the user's purchase places
  const PP = MyPurchasePlaces.find({userId: userId}, {fields: {name: 1, count: 1, multiple: 1}}).fetch();
  // const ppNames = _.pluck(PP, 'name');

  const ppNames = {};
  _.map(PP, function(place){
    ppNames[place.name] = place.multiple;
  });
  
  // let's loop over the last 30 days transactions (from plaid only!) and count those who are unique
  const back30 = moment().subtract(30, 'd');

  const T = Transactions.find({
    userId: userId,
    ignore: false,
    toReview: false,
    date: {$gte: back30.toDate()}
  }).fetch();

  // exploreScore metric for users
  // should we limit to 'eo', 'r' and 't' and 'e' (do not count 's' and 'ds') - experiences only!.

  let exploreScoreTotal = 0;
  let exploreScoreNew = 0;
  const newPP = [];
  
  // two bugs lurking: what happens if somehow the transaction name is NOT in PP...could happen?
  // meteric is error: if I go to a new place multiple times during the last month, it won't count as new

  _.each(T, function (transaction) {
    if (_.contains(['eo', 'e', 'r', 't'], transaction.cell)) {
      // this should be included in the score
      exploreScoreTotal++;
      if (ppNames[transaction.name] == false) {
        exploreScoreNew++;
        newPP.push(transaction.name)
      }
    }

  });

  const exploreScore = parseFloat(exploreScoreNew/exploreScoreTotal).toFixed(2);

  return {
    exploreScore,
    exploreScoreNew,
    exploreScoreTotal,
    newPP
  }

}



