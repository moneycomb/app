Meteor.methods({

  transactionsCategorizationAnalysis: function() {

      const results = {};

      let AccountsCount = FinAccounts.find({userId: Meteor.userId()}).count();

      results.total = Transactions.find({userId: this.userId}).count();
      // corner case : prevent divide by zero if total is 0..make it 1;
      if (results.total == 0 ) { results.total =1 };

      results.nocat = Transactions.find({userId: this.userId, category_id: null }).count();
      results.nocell = Transactions.find({userId: this.userId, cell: null }).count();
      results.categorized = results.total - results.nocat;
      results.celled = results.total - results.nocell;
      results.pct_categorized = results.categorized/results.total;
      results.pct_celled = results.celled/results.total;

      console.log(results);

      const profile = Meteor.user().profile;

      profile.transactions = results;
      profile.num_accounts = AccountsCount;
      
      Meteor.users.update(Meteor.userId(), {
          $set: {
              profile: profile
          }
      });

  }

})

