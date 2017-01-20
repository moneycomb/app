Meteor.methods({

  // There are three "levels" of categorization:
  // 0 - not categorized
  // 1 - plaid or aggregator categorized
  // 2 - Moneycomb crowd categorized
  // 3 - personal categorized

  categorizeTransactions: function () {

    log.info("SERVER METHOD: Categorize Transactions Start");
    var starttime = new Date().getTime();


    var cursor = Transactions.find({userId: this.userId, ignore: false});

    cursor.forEach(function (transaction) {


    });

    // Benchmark execution time
    var endtime = new Date().getTime();
    var time = endtime - starttime;
    log.info('SERVER METHOD: Categorize Transactions END. Elapsed time=' + time);
  }

});

