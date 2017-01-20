//var plaid = require('plaid');

Meteor.methods({

  plaidSyncAllAccounts: function () {

    this.unblock();
    console.log('METHOD - plaidSyncAllAccounts');

    var accountsToSync = FinAccounts.find({userId: this.userId}).fetch();

    // lets collect all the access tokens to do this the smart way
    var access_tokens = {};
    _.each(accountsToSync, function(account) {
      access_tokens[account.access_token] = true;
    });

    var atokens = _.keys(access_tokens);
    var numTokens = atokens.length;


    // Initialize client
    /*const client_id = process.env['PLAID_CLIENT_ID'];
    const secret = process.env['PLAID_SECRET'];
    const plaid_env = plaid.environments.tartan;
    console.log(`...plaid env is ${plaid_env}.`)
    console.log(plaid.environments.tartan);
    var plaidClient = new plaid.Client(client_id, secret, plaid_env);*/

    const lastSynced = Meteor.user().profile.lastSynced;
    console.log(`...last synced was ${lastSynced}`);

    //let transactions = [];
    let totalNew = 0;
    let totalUpdated = 0;
    let totalAmount = 0;

    for (var i = 0; i < numTokens; i++) {

      let plaidServer = process.env['PLAID_SERVER'];
      let apiEndPoint = plaidServer + '/connect/get';
      
      /*
       let access_token = atokens[i];
       plaidClient.getConnectUser(access_token, {
       gte: '60 days ago',
       pending: true
       }, function (err, response) {
       console.log(`...${response.transactions.length} transactions from the last thirty days.`);
       transactions = transactions.concat(response.transactions);
       console.log(`transactions length = ${transactions.length}`);

       });
       }

       let ret = MoneyComb.MCupdateTransactions(transactions);
       if (ret.amount != 0) {
       totalNew += ret.new
       totalUpdated += ret.updated
       totalAmount += ret.amount
       }
      */

      try {

        var results = Meteor.http.call("POST", apiEndPoint, {
          data: {
            'client_id': process.env['PLAID_CLIENT_ID'],
            'secret': process.env['PLAID_SECRET'],
            'access_token': atokens[i],
            'pending': 'true'
          }
        });


        console.log(`...status code = ${results.statusCode}`);

        var x = JSON.parse(results.content);
        var transactions = x.transactions;

        console.log(`...total transactions: ${transactions.length}`);

        let ret = MoneyComb.MCupdateTransactions(transactions);
        if (ret.amount != 0) {
          totalNew += ret.new
          totalUpdated += ret.updated
          totalAmount += ret.amount

        }

      } catch (e) {

        console.log("...Got an error for %s", atokens[i]);
        console.log(e);

      }

    }


    // OK. New fancy schmancy stuff here....merging manual to plaid...Whoah, dude.
    Meteor.call('findAndFlagMerges',Meteor.userId());  // can run asynch....


    console.log('...complete');

    // Update Sync timestamp
    let profile = Meteor.user().profile;
    profile['lastSynced'] = new Date();
    Meteor.users.update({_id: Meteor.userId()}, {$set: {profile: profile}});

    // MoneyComb.addActivityFeedItem(this.userId, 'spend', 'New Transactions', totalNew + ' transactions added, totaling $' + parseFloat(totalAmount).toFixed(0))
    return ({new: totalNew, updated: totalUpdated, amount: totalAmount});
  }

})