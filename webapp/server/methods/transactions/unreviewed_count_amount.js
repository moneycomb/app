Meteor.methods({

  unreviewedCountAmount: function () {

    const T = Transactions.find({userId: Meteor.userId(), toReview: true}).fetch();
    const ret = {};

    let count = 0
    let totalToReview = 0;
    _.each(T, function (transaction) {
      totalToReview += Math.abs(transaction.amount);
      count++;
    });

    console.log(`${count} - $${totalToReview}`);

    return {
      count: count,
      amount: parseFloat(totalToReview)
    }
  }
})


