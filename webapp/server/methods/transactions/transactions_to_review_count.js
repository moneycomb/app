Meteor.methods({

    transactionsToReviewCount: function() {
        const toreview = Transactions.find({userId: Meteor.userId(), toReview: true}).count();
        const tomatch = 0;
        return ({"toreview": toreview, "tomatch": tomatch});
    }
})
