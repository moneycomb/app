Meteor.methods({
    numFinAccounts: function () {
        return FinAccounts.find({userId: Meteor.userId()}).count();
    }
});

