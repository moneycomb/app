Meteor.methods({

  plaidSyncSingleAccount: function (account_id) {

    check(account_id, String);

    this.unblock();

    const A = FinAccounts.findOne({_id: account_id});

    if (A == undefined) {
      console.error("Account %s not found!", account_id);
    } else {

      const plaidServer = process.env['PLAID_SERVER'];
      const apiEndPoint = plaidServer + '/connect/get/';

      log.info(Meteor.user().primaryemail() + ": plaidSyncSingleAccount: Plaid Server = " + plaidServer);

      let results = Meteor.http.call("POST", apiEndPoint, {
        data: {
          'client_id': process.env['PLAID_CLIENT_ID'],
          'secret': process.env['PLAID_SECRET'],
          'access_token': A.access_token,
          'account': account_id,
          'pending': true
        }
      });

      console.log('method : plaidSyncSingleAccount : Status Code= '+results.statusCode);
      var x = JSON.parse(results.content);
      var transactions = x.transactions;
      let ret = MoneyComb.MCupdateTransactions(transactions);
      console.log("method : plaidSyncSingleAccount : Complete sync all");

      // log an activity if we have new spending!
      if (ret.amount != 0) {
        MoneyComb.addActivityFeedItem(this.userId, 'spend', 'Single account: New Transactions', ret.new + ' transactions added, totaling $' + parseFloat(ret.amount).toFixed(0))
      }
      return (ret);

    }
  }

})