Meteor.methods({

  totalTransactions: function() {

      const total = Transactions.find({userId: Meteor.userId()}).count();
      console.log(total);
      return ({"total": total});

  }

})

