Meteor.methods({
  markReviewed: function (id) {
    if (!Meteor.userId()) {
      return "NOT LOGGED IN";
    } else {
      console.log(`marking ${id} reviewed for user ${Meteor.userId()}`)
      Transactions.update({userId: Meteor.userId(), _id: id}, {$set: {toReview: false }});
      return "SUCCESS";
    }
  }
});



