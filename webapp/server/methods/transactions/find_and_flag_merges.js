Meteor.methods({

  findAndFlagMerges: function(userId, dollarvariance = 1, datevariance = 3 ) {
      console.log(`Finding potential transaction merges for user ${userId}...`)

      /* if (userId != Meteor.userId() ) {
          return {error: "Not authorized!"}
      }*/

      console.log(`...dollar boundaries are plus or minus $${dollarvariance}`);
      console.log(`...date boundaries are plus or minus ${datevariance} days`);

      // how many do we have?
      const numManual = Transactions.find({userId: userId, source: "manual"}).count();

      if (numManual != 0 ) {
          console.log(`...going through ${numManual} manual transactions`)
          const manualTransactions = Transactions.find({userId: userId, source: "manual"}).fetch();
          _.each(manualTransactions, function (T) {

              // calculate boundaries of our search
               let lower = T.amount - dollarvariance;
               let upper = T.amount + dollarvariance;
               let startDate = moment(T.date).subtract(datevariance, 'd');
               let endDate = moment(T.date).add(datevariance, 'd');

              console.log(`Looking for an amount between ${lower} and ${upper} on ${startDate.toDate()} to ${endDate.toDate()}....`);

              // try to find a match
              let match = Transactions.findOne({
                  $and: [
                      {userId: userId},
                      {source: "plaid"},
                      {amount: {$gte: lower}},
                      {amount: {$lte: upper}},
                      {date: {$gt: startDate.toDate()}},
                      {date: {$lt: endDate.toDate()}}
                  ]
              });

              if (match != undefined ) {
                  console.log('we may have a match!!!!');
                  console.log(`${T.name} ( $${T.amount} on ${T.date}) <---> ${match.name} ( $${match.amount} on ${match.date} ) `)
                  Transactions.update({_id: T._id},{
                      $set: {
                          toReview: true,
                          matchCheck: true,
                          match: match._id
                      }
                  });

              }


          });

          console.log('...done.');

      } else {
          console.log(`No manual transactions found`);
      }

  }

})

