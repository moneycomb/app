Meteor.methods({
  'deleteMyAccount': function () {

    var userId = this.userId;

    // multiple steps:
    // 1. Delete the users transactions?
    let T = Transactions.remove({userId: userId});
    console.log('%s: %d transactions deleted',userId,T);

    // 2. Delete the Plaid access_tokens
    var accounts = FinAccounts.find({userId: userId}).fetch();
    var access_tokens = {};

    _.each(accounts, function (account) {
      access_tokens[account.access_token] = true;
    });

    var atokens = _.keys(access_tokens);
    var numTokens = atokens.length;

    for (var i = 0; i < numTokens; i++) {

      const plaidServer = process.env['PLAID_SERVER'];
      const apiEndPoint = plaidServer + '/connect/';
      console.log('Deleting Plaid AT...'+ atokens[i]);

      Meteor.http.call("DELETE", apiEndPoint, {
        data: {
          'client_id': process.env['PLAID_CLIENT_ID'],
          'secret': process.env['PLAID_SECRET'],
          'access_token': atokens[i]
        },

        function (error, result)
        {
          console.log(result);
          if (error) {
            //this did not end well ;-) Figure it out!
            console.log(error);
          } else {
            console.log("Account "+i+" removed from Plaid");
          }
          ;
        }
      })
    }

    // 3. Delete the users FinAccounts
    let FA = FinAccounts.remove({userId: userId});
    console.log('%s: %d financial accounts deleted',userId,FA);

    // 4. Delete the Meteor.user() itself
    let U = Meteor.users.remove({_id: userId});
    console.log(U + ' user removed');

    // 5. Delete the Analysis record
    let A = Analysis.remove({userId: userId});
    console.log('%s: %d Analysis deleted',userId,A);

    // 6. Delete the FinProfile record
    let FP = FinancialProfile.remove({userId: userId});
    console.log('%s: %d Financial Profile deleted',userId,FP);

    // 7. Delete the Allocations record
    let Al = Allocations.remove({userId: userId});
    console.log('%s: %d Allocation deleted',userId,Al);


    return "success";

  }
});