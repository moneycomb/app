Meteor.methods({

  addTransaction: function(transaction,userId,toReview=true) {
      console.log(`adding manual transaction for user ${userId}...`);

      // this can be called from two places:
      //  1. Twilio, where we don't have the userId
      //  2. From the /spend screen..
      //  3. From the mobile app
      // for 1, we call the method with the userid. For 2. we don't for security reason and will derive it. For 3, it is only provided for an extra layer of security, since the user can only make the call when he is logged in

      if (userId == undefined) {
          userId = Meteor.userId();
      };

      Transactions.insert({
          userId: Meteor.userId(),
          account: null,
          amount: transaction.amount,
          date: new Date(),
          name: transaction.name,
          pending: true,
          category_id: null,
          cell: transaction.cell,
          category: null,
          // Moneycomb Specific enrichment
          source: 'manual',
          ignore: false,
          rating: 0,
          isNew: true,
          toReview: toReview,
          activity: 'spend',
      });


  }

})

