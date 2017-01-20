Meteor.methods({

  mergeTransactions: function(userId,manualT,plaidT) {
      console.log(`Merging transactions ${manualT} and ${plaidT} for user ${userId}...`)

      if (userId != Meteor.userId() ) {
          return {error: "Not authorized!"}
      }

      // Find the manual transaction. fail if not found
      const manualTransaction = Transactions.findOne({_id: manualT, source: "manual"});
      if (manualTransaction == undefined ) { return {error: "Manual transaction not found"}};

      // Find the plaid transaction. fail if not found
      const plaidTransaction = Transactions.findOne({_id: plaidT});
      if (plaidTransaction == undefined ) { return {error: "Plaid transaction not found"}};

      // Copy any notes from manual to plaid T
      plaidTransaction.description = manualTransaction.description;

      // Make note of any receipt and "attach" somehow to plaid T
      //if ( manualTransaction.haveReceipt ) {
      //    plaidTransaction.haveReceipt = true;
      //    // complete later...
      //}

      // Update the plaid Transaction
      Transactions.update({_id: plaidT}, {$set: {plaidTransaction}});

      // Delete the manual transaction
      Transactions.remove({_id: manualT});

      return ({response: "merged, deleted and updated...we're good!"});

  }

})

