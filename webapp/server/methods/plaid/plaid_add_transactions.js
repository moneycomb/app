Meteor.methods({

  plaidAddTransactions: function (transactions) {

    check(transactions, [Object]);


    // Lets set up the categories
    var categories = Categories.find();
    Cat2Cell = {};
    Cat2SubCell = {};

    categories.forEach(function (cat) {
      Cat2Cell[cat.category_id] = cat.cell;
    });

    // calculate if we need to set the review flag...set if with the last 30 days
    const back30 = moment().subtract(31, 'd');


    _.each(transactions, function (transaction) {

      var cell = Cat2Cell[transaction.category_id];

      let toReview = (moment(transaction.date).isAfter(back30,'days'));

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
        rating: 0,
        isNew: false,
        toReview: toReview,
        activity: 'spend',
      });
    });

    // Update Sync timestamp
    let profile = Meteor.user().profile;
    profile['lastSynced'] = new Date();
    Meteor.users.update({_id: Meteor.userId()}, {$set: {profile: profile}});

  }

})