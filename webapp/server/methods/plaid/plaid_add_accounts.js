Meteor.methods({

  plaidAddAccounts: function (accounts, access_token) {

    console.log('method: plaidAddAccounts : adding accounts...');

    check(accounts, [Object]);
    check(access_token, String);

    _.each(accounts, function (account) {

      if (account.type == 'depository' || account.type == 'credit') {
        FinAccounts.insert({
          _id: account._id,
          _plaidId: account._id,
          access_token: access_token,
          userId: Meteor.userId(),
          balance: account.balance,
          institution_type: account.institution_type,
          subtype: account.subtype,
          type: account.type,
          ignore: false,
          meta: account.meta,
          blob: account
        });
      } else {
        console.warn('method: plaidAddAccounts : Not relevant account (non-spending) scanned but not added for %s', Meteor.userId())
      }

    });

  }

})