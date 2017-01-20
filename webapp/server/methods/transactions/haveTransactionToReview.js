Meteor.methods({
  haveTransactionsToReview: function () {
    return Transactions.find({userId: Meteor.userId(), toReview: true}).count();
  }
})


