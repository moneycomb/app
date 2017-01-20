categorizationProgress = function (user,sleeptime,iterations,pollplaiditeration) {

  let AccountsCount = FinAccounts.find({userId: user}).count();

  // reset the categoriation history if needed...
  const profile = Meteor.users.findOne({_id: user}).profile;
  profile.catprogress = [];
  Meteor.users.update({_id: user}, {
    $set: {
      profile: profile
    }
  });

  // We poll Plaid 3 times: Before start of loop, user specified "mid point", and end
  // INITIAL POLL PLAID - just to start the process
  
  let X = Meteor.call('plaidSyncAllAccounts');

  for (i=0; i < iterations; i++) {

    Meteor._sleepForMs(sleeptime);

    // we poll at the beginning (see above, at 1 user specified and at the last iteration
    if ( i ==  pollplaiditeration) {
      // POLL PLAID
      let X = Meteor.call('plaidSyncAllAccounts');
      Meteor.call('plaidSyncAllAccounts', function (err, result) {
        if (err) console.log(err);
        Meteor.call('updateSpendStatistics');
      });
    } else if ( i == iterations-1 ) {
      // last time through, we calculate spend stats!
      Meteor.call('plaidSyncAllAccounts', function (err, result) {
        if (err) console.log(err);
        Meteor.call('updateSpendStatistics');
      });

    }

    // get the current profile
    const profile = Meteor.users.findOne({_id: user}).profile;

    // lets get the current stats
    let results = categorizationStats(user);
    profile.transactions = results;
    profile.catprogress.push(results);
    profile.num_accounts = AccountsCount;

    Meteor.users.update({_id: user}, {
      $set: {
        profile: profile
      }
    });
    console.log(`Iteration ${i} - ${results.pct_categorized} categorized, ${results.total} total`);
  }

}


categorizationStats = function (user) {

  const results = {};

  results.total = Transactions.find({userId: user}).count();
  // corner case : prevent divide by zero if total is 0..make it 1;
  if (results.total == 0 ) { results.total = 1 };

  results.nocat = Transactions.find({userId: user, category_id: null }).count();
  results.nocell = Transactions.find({userId: user, cell: null }).count();
  results.categorized = results.total - results.nocat;
  results.celled = results.total - results.nocell;
  results.pct_categorized = results.categorized/results.total;
  results.pct_celled = results.celled/results.total;
  results.timestamp = new Date();

  return results;

}