reconcile_manual = function (userId, dollarvariance = 1, datevariance = 3) {

  // get all manual pending spend transactions
  const manualTransactions = Transactions.find({userId: userId, source: 'manual', activity: 'spend', pending: true});

  console.log(`Found ${manualTransactions.count()} manual transactions to attempt to match`);

  manualTransactions.forEach(function (transaction) {

    console.log("here...");
    // lets find possible matches in two ways:
    // +/- dollarvariance and +/- datevariance
    let lower = transaction.amount - dollarvariance;
    let upper = transaction.amount + dollarvariance;
    let startDate = moment(transaction.date).subtract(datevariance, 'd');
    let endDate = moment(transaction.date).add(datevariance, 'd');

    console.log(`Looking for a match for ${transaction.amount} on ${transaction.date}....this means ${lower} to ${upper}....`);

    let T = Transactions.find({
      $and: [
        {userId: userId},
        {amount: {$gte: lower}},
        {amount: {$lte: upper}},
        {date: {$gt: startDate.toDate()}},
        {date: {$lt: endDate.toDate()}}
      ]
    });

    T.forEach(function (match) {
      console.log(`....potential match with an amount of ${match.amount} and a date of ${match.date} at ${match.name}`);

    });
  });

}
