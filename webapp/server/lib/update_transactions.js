try {


updateTransactions = function (transactions) {

  check(transactions, [Object]);

  const start = new Date().getTime();

  let newTransactionsCount = 0;
  let newCategoryCount = 0;

  /* todo this section below can be optimized. Why do we do this all the time for each sync? */
  // Lets set up the categories
  const categories = Categories.find();
  Cat2Cell = {};

  categories.forEach(function (cat) {
    Cat2Cell[cat.category_id] = cat.cell;
  });
  /* end optimization opportunity */

  // let's track which accounts we update so we can refresh the sync timestamp for each
  const accountsSynced = {};

  _.each(transactions, function (transaction) {

    var cell = Cat2Cell[transaction.category_id]; // will we overwrite?! bad. fix later todo
    accountsSynced[transaction._account] = true;

    let T = Transactions.findOne({_id: transaction._id});

    if (T != undefined) {
      // UPDATE PATH

      if (T.category_id != transaction.category_id) {
        // Plaid has a new or changed category for us!
        // In this case, yes, we recategorize
        var newcell = Cat2Cell[transaction.category_id];
        var toReview = true;
        newCategoryCount++;
      } else {
        var newcell = T.cell;
        var toReview = false;
      }

      Transactions.update({_id: transaction._id},
        {
          $set: {
            name: transaction.name,
            meta: transaction.meta,
            pending: transaction.pending,
            type: transaction.type,
            score: transaction.score,
            category_id: transaction.category_id,
            toReview: toReview,
            //isNew: false,
            cell: newcell,    // we'll overwrite only if plaid has a changed category_id. see above
            category: transaction.category,
            // Moneycomb Specific enrichment
          }
        }, function (err, result) {
        });

    } else {

      // NEW TRANSACTION
      Transactions.insert({
        _id: transaction._id,
        userId: Meteor.userId(),
        account: transaction._account,
        amount: transaction.amount,
        date: new Date(transaction.date),
        name: transaction.name,
        meta: transaction.meta,
        pending: transaction.pending,
        type: transaction.type,
        score: transaction.score,
        category_id: transaction.category_id,
        cell: cell,
        category: transaction.category,
        // Moneycomb Specific enrichment
        source: 'plaid',
        ignore: false,
        toReview: true,
        isNew: true,
        rating: 0,
        activity: 'spend',
      }, function (err, result) {
      });

      newTransactionsCount++;

    }

  });


  // ok, now let's record which Accounts we updated..
  console.log("Accounts we touched:")
  console.log(accountsSynced);
  _.each(accountsSynced, function (v, k) {
    FinAccounts.update({_id: k}, {$set: {lastSync: new Date()}});
  });

  var end = new Date().getTime();
  var time = end - start;
  console.log('Update Transactions Execution time: ' + time)
  console.log('New Transactions: ' + newTransactionsCount)
  console.log('Updated categorization: ' + newCategoryCount)

  return {new: newTransactionsCount, updated: newCategoryCount, time: time}
}

}catch(err) {
  console.log(err);
}
