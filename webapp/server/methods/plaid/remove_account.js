Meteor.methods({

  removeAccount: function (account) {

    check(account, Object);

    // See if this is the only account associated with this access_code.
    // If so, we remove the access code from Plaid

    let numPlaidAccounts = FinAccounts.find({access_token: account.access_token, ignore: false}).count();
    console.log('Number of associated Plaid accounts with this access code=' + numPlaidAccounts);

    var accountId = account._id;
    console.log("Just deleting " + accountId);
    FinAccounts.remove({_id: accountId});
    var numRemoved = Transactions.remove({account: accountId});
    console.log("Removed %d associated transactions", numRemoved);
    Meteor.call('updateSpendStatistics');

    if (numPlaidAccounts === 1) {
      console.log("Last account. Also removing Plaid access token");
      this.unblock();

      const plaidServer = process.env['PLAID_SERVER'];
      const apiEndPoint = plaidServer+'/connect/';

      return Meteor.http.call("DELETE", apiEndPoint, {
        data: {
          'client_id': process.env['PLAID_CLIENT_ID'],
          'secret': process.env['PLAID_SECRET'],
          // 'client_id': Meteor.settings.plaid_api_key,
          //'secret': Meteor.settings.plaid_secret,
          'access_token': account.access_token
        },

        function (error, result)
        {
          if (error) {

            //this did not end well ;-) Figure it out!
            console.log(error);

          } else {

            console.log("Account removed from Plaid");
            var x = JSON.parse(results.content);

            console.log(x.message);
          }
          ;
        }
      })
    }
  }

})