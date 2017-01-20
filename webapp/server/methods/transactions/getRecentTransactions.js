Meteor.methods({
  getRecentTransactions: function (n) {
    const T = Transactions.find({userId: Meteor.userId(), toReview: true},{sort: {date: -1},limit: n}).fetch();
    console.log(`getting unreviewed for user ${Meteor.userId()} .....${T.length} transactions`);
    console.log(T);
    return T;
  }
})


