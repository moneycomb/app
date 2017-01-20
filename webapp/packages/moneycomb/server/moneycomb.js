Meteor.methods({

  mcDeepAnalysis: function (type,passed_now) {

    // now is pass mainly for DEMO mode --> where it is set by a Session variable...

    check(type,String);

    // MAIN SERVER SIDE ANALYSIS ROUTINE

    // if this method was called somehow with the user not logged in, record and error/return
    if (this.userId == null) {
      console.log("ERROR: user not logged in when this method was called");
      return null;
    }

    console.log("Performing a "+ type + "analysis for user "+this.userId);
    var analysis_result = {};  // MAIN OBJECT to store the analysis
    this.unblock();

    var start = new Date().getTime();


    // STEP 1 - GET ACCESS TO THE DATA WE NEED: THE CELLS AND ALL TRANSACTIONS FOR THIS USER
    var transactions = Transactions.find({userId: this.userId}).fetch();
    var cells = Cells.find().fetch();


    // STEP 2 - GET ALL OUR DATE PERIOD CALCULATIONS IN ORDER
    var now = moment(passed_now);
    var back7days = moment(now).subtract(7,'d');
    var back30days = moment(now).subtract(30,'d');
    var back60days = moment(now).subtract(60,'d');
    var back90days = moment(now).subtract(90,'d');
    var back120days = moment(now).subtract(120,'d');
    var back365days = moment(now).subtract(365,'d');


    // STEP 3 - GET ANALYSIS OBJECT INITIALIZED FOR EACH CELL
    //  mainly  analysis_result.eo , .t, etc...

    _.each(cells, function (c) {
      analysis_result[c.abbrev] = {
        period: c.period,
        count: 0,
        total: 0,
        timespan: 0,
        timespan_start: passed_now,
        timespan_end: passed_now,
        periods: [{count: 0, total: 0, exceeded: false},
          {count: 0, total: 0, exceeded: false},   //  7days
          {count: 0, total: 0, exceeded: false},   //  30 days
          {count: 0, total: 0, exceeded: false},   // 60-90
          {count: 0, total: 0, exceeded: false},   // 90-120
          {count: 0, total: 0, exceeded: false},   // 120-365
          {count: 0, total: 0, exceeded: false}    // greater than 365
          ],

      }
    });

    analysis_result.category = {};

    analysis_result.i = { count:0, total: 0}; // income
    analysis_result.bf = { count:0, total: 0}; // bank fees
    analysis_result.count = { uncategorized: 0, total: 0}; // uncategorized

    console.log(analysis_result);
    console.log(analysis_result.eo.periods);
    console.log(analysis_result["eo"].periods[5].count);




    console.log(back7days);


    var transaction_date = moment();
    var period;

    // PASS 1 --- Pass 1 through the Transactions (this is ALL of them at this point)
    _.each(transactions, function (t) {

      if (t.cell!="i" && t.cell!="") {
        analysis_result[t.cell].count++;
        analysis_result[t.cell].total += t.amount;

        // Calculate time period stuff
        transaction_date = moment(t.date);

        if (transaction_date.isSameOrAfter(back7days)) {
          // 0-7 days ago
          analysis_result[t.cell].periods[0].count++;
          analysis_result[t.cell].periods[0].total += t.amount;

        } else if (transaction_date.isSameOrAfter(back30days)) {
          // 0-30 days ago
          analysis_result[t.cell].periods[1].count++;
          analysis_result[t.cell].periods[1].total += t.amount;
        } else if (transaction_date.isSameOrAfter(back60days)) {
          // 30-60 days ag
          analysis_result[t.cell].periods[2].count++;
          analysis_result[t.cell].periods[2].total += t.amount;
        } else if (transaction_date.isSameOrAfter(back90days)) {
          // 60-90 days ago
          analysis_result[t.cell].periods[3].count++;
          analysis_result[t.cell].periods[3].total += t.amount;
        } else if (transaction_date.isSameOrAfter(back120days)) {
          analysis_result[t.cell].periods[4].count++;
          analysis_result[t.cell].periods[4].total += t.amount;
        } else if (transaction_date.isSameOrAfter(back365days)) {
          analysis_result[t.cell].periods[5].count++;
          analysis_result[t.cell].periods[5].total += t.amount;
        } else {
          analysis_result[t.cell].periods[6].count++;
          analysis_result[t.cell].periods[6].total += t.amount;
        }

      } else {
        analysis_result.count.uncategorized++;
      }

      // Capture specific detailed category information
      if (t.category_id!="" && t.category_id!=null) {
        if (t.category_id in analysis_result.category) {
          analysis_result.category[t.category_id].count++;
          analysis_result.category[t.category_id].ratingtotal += t.rating;
        } else {
          // first time we've seen - initialize...
          analysis_result.category[t.category_id] = {};
          analysis_result.category[t.category_id].count = 1;
          analysis_result.category[t.category_id].ratingtotal = t.rating;
        }
      }
      });

    // PASS 2 --- Summarize Categories
    _.each(cells, function (c) {
      analysis_result[c.abbrev].trans_average =
        parseFloat(analysis_result[c.abbrev].total / analysis_result[c.abbrev].count).toFixed(2);

      // TRANSACTION AVERAGES

      analysis_result[c.abbrev].periods[0].trans_average =
        parseFloat(analysis_result[c.abbrev].periods[0].total / analysis_result[c.abbrev].periods[0].count).toFixed(2);
      analysis_result[c.abbrev].periods[1].trans_average =
        parseFloat(analysis_result[c.abbrev].periods[1].total / analysis_result[c.abbrev].periods[1].count).toFixed(2);
      analysis_result[c.abbrev].periods[2].trans_average =
        parseFloat(analysis_result[c.abbrev].periods[2].total / analysis_result[c.abbrev].periods[2].count).toFixed(2);
      analysis_result[c.abbrev].periods[3].trans_average =
        parseFloat(analysis_result[c.abbrev].periods[3].total / analysis_result[c.abbrev].periods[3].count).toFixed(2);
      analysis_result[c.abbrev].periods[4].trans_average =
        parseFloat(analysis_result[c.abbrev].periods[4].total / analysis_result[c.abbrev].periods[4].count).toFixed(2);
      analysis_result[c.abbrev].periods[5].trans_average =
        parseFloat(analysis_result[c.abbrev].periods[5].total / analysis_result[c.abbrev].periods[5].count).toFixed(2);

      // DAILY AVERAGES

      analysis_result[c.abbrev].periods[0].daily_average =
        parseFloat(analysis_result[c.abbrev].periods[0].total / 7).toFixed(2);
      analysis_result[c.abbrev].periods[1].daily_average =
        parseFloat(analysis_result[c.abbrev].periods[1].total / 30).toFixed(2);
      analysis_result[c.abbrev].periods[2].daily_average =
        parseFloat(analysis_result[c.abbrev].periods[2].total / 30).toFixed(2);
      analysis_result[c.abbrev].periods[3].daily_average =
        parseFloat(analysis_result[c.abbrev].periods[3].total / 30).toFixed(2);
      analysis_result[c.abbrev].periods[4].daily_average =
        parseFloat(analysis_result[c.abbrev].periods[4].total / 30).toFixed(2);
      analysis_result[c.abbrev].periods[5].daily_average =
        parseFloat(analysis_result[c.abbrev].periods[5].total / 365).toFixed(2);


    });

    // PASS 3 --- Calculate Tradeoff Matrix


    // First need to so some prep - custom calculate daily averages. brute force for now...
    // Travel..let's make an assumption for daily. This is not annualized...
    analysis_result["t"].daily_average = parseFloat(analysis_result["t"].periods[5].total / 21).toFixed(2);
    analysis_result["eo"].daily_average = parseFloat(analysis_result["eo"].periods[1].total / 30).toFixed(2);

    analysis_result["e"].daily_average = parseFloat(
      (analysis_result["e"].periods[1].total + analysis_result["e"].periods[2].total + analysis_result["e"].periods[3].total)/ 90).toFixed(2);

    analysis_result["r"].daily_average = parseFloat(
      (analysis_result["r"].periods[1].total + analysis_result["r"].periods[2].total + analysis_result["r"].periods[3].total)/ 90).toFixed(2);

    analysis_result["s"].daily_average = parseFloat(
      (analysis_result["s"].periods[1].total + analysis_result["s"].periods[2].total + analysis_result["s"].periods[3].total)/ 90).toFixed(2);

    analysis_result["ds"].daily_average = parseFloat(
      (analysis_result["ds"].periods[1].total + analysis_result["ds"].periods[2].total + analysis_result["ds"].periods[3].total)/ 90).toFixed(2);

    // STEP N - calculate average counts (average last 3 periods)

    // eo
    analysis_result["eo"].aveCountPerPeriod =
      (analysis_result["eo"].periods[1].count/30)*7;

    // 4 monthly ones
    analysis_result["ds"].aveCountPerPeriod =
      parseFloat((analysis_result["ds"].periods[4].count + analysis_result["ds"].periods[2].count + analysis_result["ds"].periods[3].count)/3).toFixed(0);
    analysis_result["r"].aveCountPerPeriod =
      parseFloat((analysis_result["r"].periods[4].count + analysis_result["r"].periods[2].count + analysis_result["r"].periods[3].count)/3).toFixed(0);
    analysis_result["e"].aveCountPerPeriod =
      parseFloat((analysis_result["e"].periods[4].count + analysis_result["e"].periods[2].count + analysis_result["e"].periods[3].count)/3).toFixed(0);
    analysis_result["s"].aveCountPerPeriod =
      parseFloat((analysis_result["s"].periods[4].count + analysis_result["s"].periods[2].count + analysis_result["s"].periods[3].count)/3).toFixed(0);

    // t
    analysis_result["t"].aveCountPerPeriod =
      analysis_result["t"].periods[5].count;

    _.each(cells, function (c) {
      analysis_result[c.abbrev].t2dtom={};
      analysis_result[c.abbrev].t2ttom={};
      analysis_result[c.abbrev].d2ttom={};
      analysis_result[c.abbrev].d2dtom={};

      _.each(cells, function (c2) {
        analysis_result[c.abbrev].t2ttom[c2.abbrev] =
          parseFloat(analysis_result[c.abbrev].trans_average / analysis_result[c2.abbrev].trans_average).toFixed(2); //T2T
        analysis_result[c.abbrev].t2dtom[c2.abbrev] =
          parseFloat(analysis_result[c.abbrev].daily_average / analysis_result[c2.abbrev].trans_average).toFixed(2); //T2D
        analysis_result[c.abbrev].d2ttom[c2.abbrev] =
          parseFloat(analysis_result[c.abbrev].trans_average / analysis_result[c2.abbrev].daily_average).toFixed(2); //D2D
        analysis_result[c.abbrev].t2ttom[c2.abbrev] =
          parseFloat(analysis_result[c.abbrev].daily_average / analysis_result[c2.abbrev].daily_average).toFixed(2); //D2T

      });
    });


    var end = new Date().getTime();
    var time = end - start;

    console.log(analysis_result);
    console.log('Execution time: ' + time);

    // Record when we ran the analysis...
    analysis_result.last_modified = new Date();

    // Save the Results into the DB

    Analysis.upsert({userId: this.userId}, {$set: {userId: this.userId}});
    Analysis.upsert({userId: this.userId}, {$set: analysis_result});

  }

});


