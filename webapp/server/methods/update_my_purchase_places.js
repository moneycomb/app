Meteor.methods({

  updateMyPurchasePlaces: function (userId) {

    check(userId, String)

    console.log(Meteor.user().primaryemail() + ": SERVER METHOD: updateMyPurchasePlaces Start");
    var starttime = new Date().getTime();

    //todo add Timeframe option for recurring

    var T = Transactions.find({
      userId: userId,
      ignore: false,
    }, {sort: {date: 1}}).fetch();

    const transNames = _.pluck(T, 'name');
    const uniqueNames = _.uniq(transNames);
    console.log(transNames.length, uniqueNames.length);

    // pass 1 - loop through names
    const myPurchasePlaces = {}
    _.each(T, function (transaction) {
      if (_.contains(uniqueNames, transaction.name)) {
        if (_.has(myPurchasePlaces, transaction.name)) {
          myPurchasePlaces[transaction.name].cell = transaction.cell;
          myPurchasePlaces[transaction.name].count++;
          myPurchasePlaces[transaction.name].total += transaction.amount;
          myPurchasePlaces[transaction.name].transactions.push(transaction._id);
          myPurchasePlaces[transaction.name].dates.push(transaction.date);
          myPurchasePlaces[transaction.name].amounts.push(transaction.amount);
          myPurchasePlaces[transaction.name].lastPurchase = transaction.date;
          myPurchasePlaces[transaction.name].multiple = true;
        } else {
          myPurchasePlaces[transaction.name] = {name: transaction.name};
          myPurchasePlaces[transaction.name].count = 1;
          myPurchasePlaces[transaction.name].userId = Meteor.userId();    // should this just be userId param?
          myPurchasePlaces[transaction.name].cell = transaction.cell;
          myPurchasePlaces[transaction.name].total = transaction.amount;
          myPurchasePlaces[transaction.name].transactions = [transaction._id];
          myPurchasePlaces[transaction.name].dates = [transaction.date];
          myPurchasePlaces[transaction.name].amounts = [transaction.amount];
          myPurchasePlaces[transaction.name].firstPurchase = transaction.date;
          myPurchasePlaces[transaction.name].lastPurchase = transaction.date;
          myPurchasePlaces[transaction.name].multiple = false;
          myPurchasePlaces[transaction.name].recurring = false;
        }
      }

    });

    // pass 2 through myPurchasePlaces --- let's use logic to detect recurring

    let inserted = 0;
    let updated = 0;

    console.log('Updating purchase places for user ' + userId);

    _.each(myPurchasePlaces, function (place) {

      let PP = MyPurchasePlaces.findOne({name: place.name});

      if (PP != undefined) {
        MyPurchasePlaces.update({_id: PP._id}, {$set: place});
        updated++;
      } else {
        // INSERT PATH
        MyPurchasePlaces.insert(place);
        inserted++;
      }
    });


    // lets try to calculate a 'spending diversity' metric for users
    // should we limit to 'eo', 'r' and 't' and 'e' (avoid 's' and 'ds').

    // first, let's do this for the last 30 days....
    var end = moment().add(1, 'd');
    var back30 = moment(end).subtract(31, 'd');

    // let's loop over the last 30 days transactions (from plaid!) and count those who are unique
    var T2 = Transactions.find({
      userId: userId,
      ignore: false,
      toReview: false,
      date: {$gte: back30.toDate()}
    }).fetch();

    console.log(`Nums trans = ${T2.length}`);
    const spendDiversityNames = _.uniq(_.pluck(T2, 'name'));

    console.log(spendDiversityNames);
    console.log(`spendDiversity totalspends over last 30 days is ${spendDiversityNames.length}`);

    let exploreScoreTotal = 0;
    let exploreScoreNew = 0;
    let newflag = '';

    _.each(T2, function (transaction) {
      if (_.contains(['eo','e','r','t'],transaction.cell)) {
        // this should be included in the score
        exploreScoreTotal++;
        newflag = '';
        if (myPurchasePlaces[transaction.name].count == 1 ) {
          exploreScoreNew++;
          newflag = '***';
        }
        console.log(`${transaction.name} ${newflag}`);
      }

    });

    const exploreScore = parseFloat(exploreScoreNew/exploreScoreTotal).toFixed(2);
    console.log(`EXPLORE SCORE = ${exploreScore} (${exploreScoreNew}/${exploreScoreTotal})`);

    log.info('Updating purchase places complete:' + inserted + ',' + updated);

// Benchmark execution time
    var endtime = new Date().getTime();
    var time = endtime - starttime;
    console.log(Meteor.user().primaryemail() + ': SERVER METHOD: END. Elapsed time=' + time);

  }

})
;

