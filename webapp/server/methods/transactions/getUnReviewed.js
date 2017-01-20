Meteor.methods({
  getUnreviewed: function () {
    const T = Transactions.find({userId: Meteor.userId(), toReview: true}).fetch();
    console.log(`getting unreviewed for user ${Meteor.userId()} .....${T.length} transactions`);
    console.log(T);
    return T;
  }
})


