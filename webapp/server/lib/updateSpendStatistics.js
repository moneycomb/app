updateSpendStatistics = function (userId) {

  console.log('I am doing this server side from a text...DUDE!!!!');
  
  var starttime = new Date().getTime();


  var spendSeries = {};

  var now = moment();
  var end = moment(now).add(1, 'd');
  var future = moment(now).add(31, 'd');  // prep for forecasting!
  var start = moment(end).subtract(366, 'd');
  var back120 = moment(end).subtract(121, 'd');
  var back90 = moment(end).subtract(91, 'd');
  var back60 = moment(end).subtract(61, 'd');
  var back30 = moment(end).subtract(31, 'd');
  var back7 = moment(end).subtract(7, 'd');
  var start120 = moment(end).subtract(119, 'd');
  var start90 = moment(end).subtract(89, 'd');
  var start60 = moment(end).subtract(59, 'd');
  var start30 = moment(end).subtract(29, 'd');

  // ok for now, going to use a 30 day period for all and I am going to use a 120 day lookback


  // count some general things to make the transactions home screen speedy...
  var transactionCounts = {
    isNew: 0,
    toReview: 0,
    ignored: 0,
    bf: 0
  };


  // initialize the accounts object
  var account = {};
  var FA = FinAccounts.find({userId: userId});
  FA.forEach(function (acc) {
    account[acc._id] = {count: 0};
  });

  console.log(account);


  // initialize the spend amounts and rating analysis for each cell and subcell
  var cellSpend = {};
  var subcellSpend = {};
  var cellRating = {};
  var subcellRating = {};


  let totalSpend = {
    t7: {count: 0, amount: 0},
    t30: {count: 0, amount: 0},
    t60: {count: 0, amount: 0},
    t90: {count: 0, amount: 0},
    t120: {count: 0, amount: 0},
    t365: {count: 0, amount: 0},
  };
  let totalSpendSeries = {}


  var cells = Cells.find();
  cells.forEach(function (cell) {
    cellRating[cell.abbrev] = {
      numRated: 0,
      numNotRated: 0,
      ratingtotal: 0
    };

    cellSpend[cell.abbrev] = {
      t7: {count: 0, amount: 0, rating: 0},
      t30: {count: 0, amount: 0, rating: 0},
      t60: {count: 0, amount: 0, rating: 0},
      t90: {count: 0, amount: 0, rating: 0},
      t120: {count: 0, amount: 0, rating: 0},
      t365: {count: 0, amount: 0, rating: 0},
    };

    spendSeries[cell.abbrev] = {};     // this is the date series
  });

  var subcells = SubCells.find();

  subcells.forEach(function (subcell) {
    subcellRating[subcell.abbrev] = {
      numRated: 0,
      numNotRated: 0,
      ratingtotal: 0
    };

    subcellSpend[subcell.abbrev] = {
      t7: {count: 0, amount: 0, rating: 0},
      t30: {count: 0, amount: 0, rating: 0},
      t60: {count: 0, amount: 0, rating: 0},
      t90: {count: 0, amount: 0, rating: 0},
      t120: {count: 0, amount: 0, rating: 0},
      t365: {count: 0, amount: 0, rating: 0},
    };

  });

  // setup the catch all "o" (Other) one
  subcellSpend["o"] = {
    t7: {count: 0, amount: 0, rating: 0},
    t30: {count: 0, amount: 0, rating: 0},
    t60: {count: 0, amount: 0, rating: 0},
    t90: {count: 0, amount: 0, rating: 0},
    t120: {count: 0, amount: 0, rating: 0},
    t365: {count: 0, amount: 0, rating: 0},
  };

  subcellRating["o"] = {
    numRated: 0,
    numNotRated: 0,
    ratingtotal: 0
  };

  cellRating["o"] = {
    numRated: 0,
    numNotRated: 0,
    ratingtotal: 0
  };

  cellSpend["o"] = {
    t7: {count: 0, amount: 0, rating: 0},
    t30: {count: 0, amount: 0, rating: 0},
    t60: {count: 0, amount: 0, rating: 0},
    t90: {count: 0, amount: 0, rating: 0},
    t120: {count: 0, amount: 0, rating: 0},
    t365: {count: 0, amount: 0, rating: 0},
  };

  spendSeries["o"] = {};     // this is the date series


  // categorization statistics
  var categorized = 0;
  var totalTransactions = 0;
  var plaidCategorized = 0;
  var crowdCategorized = 0;
  var userCategorized = 0;
  var unCategorized = 0;
  var otherCategorized = 0;
  var categorization = {};

  let numIgnored = Transactions.find({userId: userId, ignore: true}).count();


  var cursor = Transactions.find({
      userId: userId,
      ignore: false,
      date: {$gte: start.toDate()}
    },
    {sort: {date: 1}});

  console.log(totalSpend);

  cursor.forEach(function (transaction) {


    totalTransactions++;

    // this check is just in case we have stray transactions hanging around which
    // point to an account that does not exist anymore
    if (account.hasOwnProperty(transaction.account)) {
      account[transaction.account].count++;
    }

    if (transaction.isNew === true) transactionCounts.isNew++;
    if (transaction.toReview === true) transactionCounts.toReview++;
    if (transaction.ignore === true) transactionCounts.ignore++;


    if (_.indexOf(['eo', 'ds', 'r', 't', 'e', 's'], transaction.cell) != -1) {

      categorized++;

      cellSpend[transaction.cell].t365.amount += Number(transaction.amount);
      cellSpend[transaction.cell].t365.count++;

      if (transaction.subcell == "" || transaction.subcell == undefined || transaction.subcell == null ) transaction.subcell = "o";

      subcellSpend[transaction.subcell].t365.amount += Number(transaction.amount);
      subcellSpend[transaction.subcell].t365.count++;

      // rating stuff
      if (transaction.rating != 0) {
        cellRating[transaction.cell].numRated++;
        cellRating[transaction.cell].ratingtotal += Number(transaction.rating);
        subcellRating[transaction.subcell].numRated++;
        subcellRating[transaction.subcell].ratingtotal += Number(transaction.rating);
      } else {
        cellRating[transaction.cell].numNotRated++;
        subcellRating[transaction.subcell].numNotRated++;
      }


      totalSpend.t365.amount += Number(transaction.amount);
      totalSpend.t365.count++;


      if (moment(transaction.date).isBetween(back30, end, 'day')) {
        cellSpend[transaction.cell].t30.amount += Number(transaction.amount);
        cellSpend[transaction.cell].t30.count++;

        subcellSpend[transaction.subcell].t30.amount += Number(transaction.amount);
        subcellSpend[transaction.subcell].t30.count++;

        totalSpend.t30.amount += Number(transaction.amount);
        totalSpend.t30.count++;
      }

      if (moment(transaction.date).isBetween(back60, start30, 'day')) {
        cellSpend[transaction.cell].t60.amount += Number(transaction.amount);
        cellSpend[transaction.cell].t60.count++;

        subcellSpend[transaction.subcell].t60.amount += Number(transaction.amount);
        subcellSpend[transaction.subcell].t60.count++;

        totalSpend.t60.amount += Number(transaction.amount);
        totalSpend.t60.count++;
      }

      if (moment(transaction.date).isBetween(back90, start60, 'day')) {
        cellSpend[transaction.cell].t90.amount += Number(transaction.amount);
        cellSpend[transaction.cell].t90.count++;

        subcellSpend[transaction.subcell].t90.amount += Number(transaction.amount);
        subcellSpend[transaction.subcell].t90.count++;

        totalSpend.t90.amount += Number(transaction.amount);
        totalSpend.t90.count++;
      }

      if (moment(transaction.date).isBetween(back120, start90, 'day')) {
        cellSpend[transaction.cell].t120.amount += Number(transaction.amount);
        cellSpend[transaction.cell].t120.count++;

        subcellSpend[transaction.subcell].t120.amount += Number(transaction.amount);
        subcellSpend[transaction.subcell].t120.count++;

        totalSpend.t120.amount += Number(transaction.amount);
        totalSpend.t120.count++;
      }

      if (moment(transaction.date).isBetween(back7, end, 'day')) {
        cellSpend[transaction.cell].t7.amount += Number(transaction.amount);
        cellSpend[transaction.cell].t7.count++;

        subcellSpend[transaction.subcell].t7.amount += Number(transaction.amount);
        subcellSpend[transaction.subcell].t7.count++;

        totalSpend.t7.amount += Number(transaction.amount);
        totalSpend.t7.count++;
      }

      let dateIndex = moment(transaction.date).format("YYYY-MM-DD");
      if (_.has(spendSeries[transaction.cell], dateIndex)) {
        // add to previous spend
        spendSeries[transaction.cell][dateIndex] += Number(transaction.amount);
      } else {
        // first spend on this date
        spendSeries[transaction.cell][dateIndex] = Number(transaction.amount);
      }

      if (_.has(totalSpendSeries, dateIndex)) {
        // add to previous spend
        totalSpendSeries[dateIndex] += Number(transaction.amount);
      } else {
        // first spend on this date
        totalSpendSeries[dateIndex] = Number(transaction.amount);
      }

    } else if (transaction.cell == null) {

      unCategorized++;
    } else {
      otherCategorized++;
    }
  });

  console.log(totalSpend);

  // let's summarize category results
  cells.forEach(function (cell) {

    if (cellSpend[cell.abbrev].t365.count === 0) {
      cellSpend[cell.abbrev].t365.average = 0
    }
    else {
      cellSpend[cell.abbrev].t365.average = cellSpend[cell.abbrev].t365.amount / cellSpend[cell.abbrev].t365.count;
    }

    if (cellSpend[cell.abbrev].t120.count === 0) {
      cellSpend[cell.abbrev].t120.average = 0
    }
    else {
      cellSpend[cell.abbrev].t120.average = cellSpend[cell.abbrev].t120.amount / cellSpend[cell.abbrev].t120.count;
    }

    if (cellSpend[cell.abbrev].t90.count === 0) {
      cellSpend[cell.abbrev].t90.average = 0
    }
    else {
      cellSpend[cell.abbrev].t90.average = cellSpend[cell.abbrev].t90.amount / cellSpend[cell.abbrev].t90.count;
    }

    if (cellSpend[cell.abbrev].t60.count === 0) {
      cellSpend[cell.abbrev].t60.average = 0
    }
    else {
      cellSpend[cell.abbrev].t60.average = cellSpend[cell.abbrev].t60.amount / cellSpend[cell.abbrev].t60.count;
    }

    if (cellSpend[cell.abbrev].t30.count === 0) {
      cellSpend[cell.abbrev].t30.average = 0
    }
    else {
      cellSpend[cell.abbrev].t30.average = cellSpend[cell.abbrev].t30.amount / cellSpend[cell.abbrev].t30.count;
    }

    if (cellSpend[cell.abbrev].t7.count === 0) {
      cellSpend[cell.abbrev].t7.average = 0
    }
    else {
      cellSpend[cell.abbrev].t7.average = cellSpend[cell.abbrev].t7.amount / cellSpend[cell.abbrev].t7.count;
    }

    if (cellRating[cell.abbrev].numRated != 0) {
      cellRating[cell.abbrev].averageRating = cellRating[cell.abbrev].ratingtotal / cellRating[cell.abbrev].numRated;
    }

  });

  // now the totals
  if (totalSpend.t7.count === 0) {
    totalSpend.t7.average = 0
  }
  else {
    totalSpend.t7.average = totalSpend.t7.amount / totalSpend.t7.count;
  }

  if (totalSpend.t30.count === 0) {
    totalSpend.t30.average = 0
  }
  else {
    totalSpend.t30.average = totalSpend.t30.amount / totalSpend.t30.count;
  }

  if (totalSpend.t60.count === 0) {
    totalSpend.t60.average = 0
  }
  else {
    totalSpend.t60.average = totalSpend.t60.amount / totalSpend.t60.count;
  }

  if (totalSpend.t90.count === 0) {
    totalSpend.t90.average = 0
  }
  else {
    totalSpend.t90.average = totalSpend.t90.amount / totalSpend.t90.count;
  }

  if (totalSpend.t120.count === 0) {
    totalSpend.t120.average = 0
  }
  else {
    totalSpend.t120.average = totalSpend.t120.amount / totalSpend.t120.count;
  }

  if (totalSpend.t365.count === 0) {
    totalSpend.t365.average = 0
  }
  else {
    totalSpend.t365.average = totalSpend.t365.amount / totalSpend.t365.count;
  }


  // categorization statistics
  categorization.total = totalTransactions;
  categorization.categorized = categorized;
  categorization.ignored = numIgnored;
  categorization.uncategorized = unCategorized;
  categorization.othercategorized = otherCategorized;
  categorization.percent = parseFloat(categorized / totalTransactions).toFixed(3);


  // Benchmark execution time
  var endtime = new Date().getTime();
  var time = endtime - starttime;
  log.info(userId + ': SERVER METHOD: Update Spend Statistics END. Elapsed time=' + time);

  // Now let's save the analysis - either insert or update
  let An = Analysis.findOne({userId: userId})
  if (An === undefined) {
    console.log("Analysis - first time - inserted");
    Analysis.insert({
      userId: userId,
      updatedAt: new Date(),
      transactionCounts: transactionCounts,
      spendSeries: spendSeries,
      cellSpend: cellSpend,
      cellRating: cellRating,
      subcellSpend: subcellSpend,
      subcellRating: subcellRating,
      totalSpend: totalSpend,
      totalSpendSeries: totalSpendSeries,
      categorization: categorization,
      account: account,
    });
  } else {
    console.log("Analysis updated....");
    log.info("Analysis - updated");

    console.log(`old total = ${An.totalSpend.t30.amount}`);
    console.log(`new total = ${totalSpend.t30.amount}`);
    console.log(`old cell = ${An.cellSpend.eo.t30.amount}`);
    console.log(`new cell = ${cellSpend.eo.t30.amount}`);

    Analysis.update({userId: userId},
      {
        $set: {
          updatedAt: new Date(),
          transactionCounts: transactionCounts,
          spendSeries: spendSeries,
          cellSpend: cellSpend,
          cellRating: cellRating,
          subcellSpend: subcellSpend,
          subcellRating: subcellRating,
          totalSpend: totalSpend,
          totalSpendSeries: totalSpendSeries,
          categorization: categorization,
          account: account,
        }
      });
  }

}


