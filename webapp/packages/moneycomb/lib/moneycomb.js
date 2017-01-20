// var gauss = NPM.require('gauss');

MoneyComb = class MoneyComb {

  constructor(x) {
    this.ver = x;
  }

  static countFalse(input) {
    // first count the number unlocked
    var numUnlocked = 0;
    _.each(input, function (i) {
      if (i === 'false') {
        numUnlocked++;
      }
    });

    return numUnlocked;
  }


  static flagcolor(tf) {

    const pinkCol = "#ff4082";
    const tealCol = "#26A69A";
    var ok = "";
    var danger = pinkCol;

    /* old pinkish:
     #d81b60 */
    var flagcolor = {}


    var status = Meteor.user().status(tf);

    var cells = _.keys(status);

    cells.forEach(function (k) {

      if (status[k]) {         // over target!
        flagcolor[k] = danger;
      } else {
        flagcolor[k] = ok;
      }
    });

    flagcolor.mc = ok;   // this is for the center MoneyComb icon


    return flagcolor;

  }

  static singlecellname(cell) {

    const rv = {
      'eo': 'Eating Out',
      'ds': 'Digital Services',
      'r': 'Recharge',
      's': 'Shopping',
      'e': 'Entertainment',
      't': 'Travel',
      'i': 'Income',
      'd': 'Deposit',
      'o': 'Other',
      'bf': 'Bank Fee',
      'h': 'Housing',
      'med': 'Medical',
      'ed': 'Education',
      'tr': 'Transportation',
      'gi': 'Gifts',
      'ch': 'Charity',
      'cl': 'Clothing',
      'hf': 'Home Furnishings',
      'fd': 'Groceries',
      'st': 'Staples',
      'gas': 'Gas',
      'ho': 'Hobbies',
      'br': 'Breakfast',
      'lu': 'Lunch',
      'di': 'Dinner'

    }


    return rv[cell];
  }

  static cellnames() {

    const rv = {
      'eo': 'Eating Out',
      'ds': 'Digital Services',
      'r': 'Recharge',
      's': 'Shopping',
      'e': 'Entertainment',
      't': 'Travel'
    }

    return rv;
  }

  static cellcolor() {

    const rv = {
      'eo': '#fdd835',
      'ds': '#ffb300',
      'r': '#fb8c00',
      's': '#80cbc4',
      'e': '#26a69a',
      't': '#00695c',
      'other': '#424242',
      'bf': '#ff4082'
    }


    return rv;
  }

  static singleCellColor(cell) {

    const rv = {
      'eo': '#fdd835',
      'ds': '#ffb300',
      'r': '#fb8c00',
      's': '#80cbc4',
      'e': '#26a69a',
      't': '#00695c',
      'o': '#424242',
      'u': '#848484',
      'bf': '#ff4082',
      'h': '#424242',
      'med': '#424242',
      'ed': '#424242',
      'tr': '#424242',
      'gi': '#424242',
      'ch': '#424242',
      'cl': '#80cbc4',
      'hf': '#80cbc4',
      'fd': '#80cbc4',
      'st': '#80cbc4',
      'gas': '#80cbc4',
      'ho': '#80cbc4'
    }

    return rv[cell];
  }

  static singleIconImage(cell) {

    const rv = {
      'eo': 'eo',
      'ds': 'ds',
      'r': 'r',
      's': 's',
      'e': 'e',
      't': 't',
      'o': 'o',
      'bf': 'bf',
      'i': 'i',
      'h': 'h',
      'tr': 'tr',
      'ed': 'ed',
      'pay': 'credit-card'
    }

    if (cell == "" || cell == null || cell == undefined) {
      return "unknown";
    } else {
      return rv[cell];
    }
  }


  static unicellcolor(color) {

    const rv = {
      'eo': color,
      'ds': color,
      't': color,
      'r': color,
      'e': color,
      's': color
    }

    return rv;
  }


  static reAllocate(current, lockstatus, initiator, amount) {

    console.log("IN REALLOCATE:");
    console.log(current);
    console.log(lockstatus);
    console.log(initiator);
    console.log(amount);


    let newAllocation = {};

    // first count the number unlocked
    var numUnlocked = 0;
    _.each(lockstatus, function (cell) {
      if (cell === 'false') {
        numUnlocked++;
      }
    });

    console.log("NUM UNLOCKED=" + numUnlocked);

    if (initiator != "total") {
      numUnlocked--; // need to subtract one -- the initiator should not count
    }

    // if there is NONE , this is a corner case! return immediately
    if (numUnlocked === 0) {
      console.log('ALERT: nothing unlocked...no where to allocate');
      return current;
    }
    ;

    // now calculate the amount per unlocked category;

    let allocationPerUnlocked = amount / numUnlocked; // a positive OR negative number
    console.log("amt=" + allocationPerUnlocked);

    // let's deal with corner case of zeroed out == virtual lock
    var zeroedOutLock = {};

    var k = _.keys(current);
    _.each(k, function (key) {
      let newAmt = current[key] + allocationPerUnlocked;
      if (newAmt <= 0) {
        amount += current[key];   // adjust the amount to distribute - a credit
        newAllocation[key] = 0;
        zeroedOutLock[key] = true; // virtual lock it
        numUnlocked--;
      }
    });

    console.log(newAllocation);

    console.log("ADJUSTED UNLOCK WITH ZERO-OUT=" + numUnlocked);
    console.log(zeroedOutLock);

    // ok, now let's allocate what is left


    let adjustedAllocation = amount / numUnlocked; // a positive OR negative number
    console.log("AA=" + adjustedAllocation);


    var k = _.keys(current);
    _.each(k, function (key) {

      if (zeroedOutLock[key] == true) {
        newAllocation[key] = 0;
      } else if (lockstatus[key] != 'true' && key != initiator) {
        newAllocation[key] = current[key] + adjustedAllocation;
      } else {
        console.log(key + '...here');
        newAllocation[key] = current[key];
      }
    });


    return newAllocation;

  }


  static NearestLower(amount, roundtarget) {

    let a = Number(amount);
    let rt = Number(roundtarget);

    if (a >= rt) {
      var remainder = a % rt;
      return (remainder === 0 ? Number(a - rt) : Number(a - remainder));
    } else {
      return 0;
    }
  }

  static NearestUpper(amount, roundtarget) {

    let a = Number(amount);
    let rt = Number(roundtarget);

    if (a >= rt) {
      var remainder = Number(a % rt);
      return (remainder === 0 ? Number(a + rt) : Number(a - remainder + roundtarget));
    } else {
      return Number(rt);
    }
  }

  static dateRange(start, end, increment = 1, format = "YYYY-MM-DD") {

    var startDate = moment(start);
    var endDate = moment(end);


    var retArray = [];

    for (var d = startDate; d <= endDate; d.add(increment, 'd')) {
      retArray.push(d.format(format))
    }

    return retArray;
  }

  static estimateTaxes(income, status, zipcode) {

    return 0.28 * income;
  }

  static estimateHousing(income, status, zipcode) {
    return 0.24 * income;
  }

  static estimateTransportation(income, status, zipcode) {
    return 0.22 * income;
  }

  static onTrack(spendAmt, targetAmt, pctThroughPeriod) {
    return (spendAmt < targetAmt * pctThroughPeriod);
  }


  static MoneyAge(inflows, outflows) {


    console.log("MoneyAge!");

    // a flow is an array of triplets:  [amount,date,age]
    // inflows are negative amounts (counter intuitive I know)
    // outflows are positive

    // we assume these triplets come in already sorted in date order


    // step 1:
    // initialize: current_inflow_draw = first inflow "[0]"

    var curInflowIndex = 0;
    var available = inflows[0][0];   // amount is [0]
    var start_date = inflows[0][1];  // date is [1]

    // step 2:

    var i;

    for (i = 0; i < outflows.length; i++) {

      if (outflows[i][1] < start_date) {
        // ignore it..it is before the first inflow!
        console.log('outflow ignored...before start');

      } else {
        if (outflows[i][0] < available) {
          // we have enough to cover the full outflow
          console.log('covered');

          outflows[i][2] = outflows[i][1] - inflows[curInflowIndex][1];   // calculate the age
          available += outflows[i][0];  // reduce the available

        } else {

          // we dont have enought to cover
          console.log('partial');

          // we have a weighted age calc ahead...
          // first portion
          var deficit = outflows[i][0] - available; // will be a positive number
          // this part will be paid for by the next inflow...
          var current = available;   // we will take this fill amount

          var currentAge = outflows[i][1] - inflows[curInflowIndex][1];

          // let move forward..
          curInflowIndex++;
          available = inflows[curInflowIndex][0] - deficit;  // we start with the next amount - deficit

          // todo...this can get more complicted: an outflow that needs more than two inflows to cover!!!!!

          var deficitAge = outflows[i][1] - inflows[curInflowIndex][1];

          // now for that weighted age calc:
          var weighted_age = (deficit / outflows[i][0]) * deficitAge + (current / outflows[i][0] * currentAge);

          outflows[i][2] = weighted_age;

        }

      }


    }  // full loop


    console.log(outflows);

  }


  static pctThroughPeriod(curdate, period) {

    // return a perctage of the time through a period given a date and a period string
    //   e.g. pctThroughPeriod(moment(),"week")

    var current = moment(curdate);
    var startOfPeriod = moment(current).startOf(period);
    var endOfPeriod = moment(current).endOf(period);
    var duration = endOfPeriod - startOfPeriod;
    var elapsedTime = current - startOfPeriod;

    var pct = elapsedTime / duration;

    console.log(startOfPeriod.toDate());
    console.log(endOfPeriod.toDate());
    console.log(current.toDate());

    console.log(pct);
    return pct;
  }

  static LightenDarkenColor(col, amt) {
    var usePound = false;
    if (col[0] == "#") {
      col = col.slice(1);
      usePound = true;
    }

    var num = parseInt(col, 16);

    var r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
  }


  static linearTrend(start_point, end_point, number_of_points) {
    var retArray = [];
    var slope = (end_point - start_point) / number_of_points;

    for (var p = 0; p <= number_of_points; p++) {
      retArray.push(p * slope + start_point);
    }

    return retArray;

  }


  static runningTotal(inputArray) {

    // takes a one dimensional array of numbers in and returns an equal size array with running subtotal
    var retArray = [];
    var subTotal = 0

    for (i = 0; i < inputArray.length; i++) {
      subTotal += inputArray[i];
      retArray.push(subTotal);
    }

    return retArray;
  }

  static loadOnboarding() {

    console.log("here...");

    if (Onboarding.find().count() === 0) {

      var obQ = JSON.parse(Assets.getText('onboarding.json'));

      _.each(obQ, function (q) {
        Onboarding.insert(q);
      });

      console.log(Onboarding.find().count() + ' onboarding questions loaded in DB');

    }

  }


  static income_tier(income) {

    console.log(income);

    if (income < 50000) {
      return 1;
    } else if (income < 75000) {
      return 2;
    } else if (income < 100000) {
      return 3;
    } else if (income < 150000) {
      return 4;
    } else {
      return 5;
    }
  }

  static whichHive(FP) {

    // first income
    if (FP.income < 50000) {
      var Income = 1
    } else if (FP.income < 75000) {
      var Income = 2
    } else if (FP.income < 100000) {
      var Income = 3
    } else if (FP.income < 150000) {
      var Income = 4
    } else {
      var Income = 5
    }

    //status
    var Status = FP.status.substring(0, 1);

    // age
    if (FP.age < 30) {
      var Age = 2
    } else if (FP.age < 40) {
      var Age = 3
    } else if (FP.age < 50) {
      var Age = 4
    } else if (FP.age < 60) {
      var Age = 5
    } else if (FP.age < 70) {
      var Age = 6
    } else {
      var Age = 7
    }

    //status
    var Gender = FP.gender.substring(0, 1);

    // MMS
    var MMS = "*"

    let hiveString = Income + Status + Age + Gender + MMS
    return hiveString;
  }

  static periodsInYear(period_string) {

    if (period_string === 'week') {
      return 52;
    } else if (period_string === 'month') {
      return 12;
    } else {
      return 1;
    }
  }

  static addActivityFeedItem(user, type, title, text) {
    ActivityFeed.insert({userId: user, type: type, title: title, text: text, date: new Date(), flag: false});
  }


  static MCupdateTransactions(transactions) {

    let start = new Date().getTime();

    let newTransactionsCount = 0;
    let newTransactionsAmount = 0;
    let incomingTransactionsCount = 0;
    let newCategoryCount = 0;
    // Lets set up the categories
    var categories = Categories.find();
    Cat2Cell = {};
    Cat2SubCell = {};

    categories.forEach(function (cat) {
      Cat2Cell[cat.category_id] = cat.cell;
      Cat2SubCell[cat.category_id] = cat.subcell;
    });

    // let's track which accounts we update so we can refresh the sync timestamp for each
    var accountsSynced = {};

    _.each(transactions, function (transaction) {

      var cell = Cat2Cell[transaction.category_id]; // will we overwrite?! bad. fix later todo
      var subcell = Cat2SubCell[transaction.category_id];

      accountsSynced[transaction._account] = true;

      let T = Transactions.findOne({_id: transaction._id});

      if (T != undefined) {
        // UPDATE PATH

        if (T.category_id != transaction.category_id) {
          // Plaid has a new or changed category for us!
          // In this case, yes, we recategorize
          var newcell = Cat2Cell[transaction.category_id];
          var newsubcell = Cat2SubCell[transaction.category_id];
          var toReview = true;
          newCategoryCount++;
        } else {
          var newcell = T.cell;
          var toReview = false;
        }

        Transactions.update({_id: transaction._id},
          {
            $set: {
              name: transaction.name,
              meta: transaction.meta,
              pending: transaction.pending,
              type: transaction.type,
              score: transaction.score,
              category_id: transaction.category_id,
              toReview: toReview,
              isNew: true,
              cell: newcell,    // we'll overwrite only if plaid has a changed category_id. see above
              subcell: newsubcell,
              category: transaction.category,
              // Moneycomb Specific enrichment
            }
          }, function (err, result) {
          });

      } else {

        // NEW TRANSACTION
        Transactions.insert({
          _id: transaction._id,
          userId: Meteor.userId(),
          account: transaction._account,
          amount: transaction.amount,
          date: new Date(transaction.date),
          name: transaction.name,
          meta: transaction.meta,
          pending: transaction.pending,
          type: transaction.type,
          score: transaction.score,
          category_id: transaction.category_id,
          cell: cell,
          subcell: subcell,
          category: transaction.category,
          // Moneycomb Specific enrichment
          source: 'plaid',
          ignore: false,
          toReview: true,
          isNew: true,
          rating: 0,
        }, function (err, result) {
        });

        if (transaction.amount >= 0) {
          // this is a spend transaction
          newTransactionsCount++;
        } else {
          // this is an incoming payment / credit transaction
          incomingTransactionsCount++;
          newTransactionsAmount += transaction.amount;
        }

      }

    });


    // ok, now let's record which Accounts we updated..
    console.log("Accounts we touched:")
    console.log(accountsSynced);
    _.each(accountsSynced, function (v, k) {
      FinAccounts.update({_id: k}, {$set: {lastSync: new Date()}});
    });

    var end = new Date().getTime();
    var time = end - start;
    console.log('Update Transactions Execution time: ' + time)
    console.log('New Transactions: ' + newTransactionsCount)
    console.log('Updated categorization: ' + newCategoryCount)

    return {new: newTransactionsCount, updated: newCategoryCount, incoming: incomingTransactionsCount, time: time, amount: newTransactionsAmount}

  }

  static recommendedAllocation(userId) {
    console.log("UPDATING ALLOCATION for user " + userId);
    var FP = FinancialProfile.findOne({userId: userId});
    var An = Analysis.findOne({userId: userId});

    if (FP == undefined) {

      console.error("ERROR - in recommenedAllocation: financial profile not found. This should not happen!")

    } else {

      if (An == undefined) {
        console.error("ERROR - in recommenedAllocation: spend analysis not found. This should not happen!")
      }

      var gross_income = FP.gross_income();

      // first income
      if (gross_income < 30000) {
        var pctOfGross = .60
      } else if (gross_income < 60000) {
        var pctOfGross = .41
      } else if (gross_income < 140000) {
        var pctOfGross = .29
      } else {
        var pctOfGross = .25
      }

      // for now, we set the allocation as a pct of Gross Income.
      // We've discovered that trying to do this off of actual is pretty tough...

      const actionable_amount = gross_income * pctOfGross;


      // coarse allocation for now
      // base allocation for now
      var eo_val = 0.18;
      var ds_val = 0.11;
      var r_val = 0.085;
      var t_val = 0.095;
      var e_val = 0.09;
      var s_val = 0.44;


      // todo we need to factor in MMS quiz results

      var eo_amt = (eo_val * actionable_amount / 365) * 30;
      var ds_amt = (ds_val * actionable_amount / 365) * 30;
      var e_amt = (e_val * actionable_amount / 365) * 30;
      var t_amt = (t_val * actionable_amount / 365) * 30;
      var r_amt = (r_val * actionable_amount / 365) * 30;
      var s_amt = (s_val * actionable_amount / 365) * 30;


      var baseallocation = {
        eo: {percent: eo_val, amount: eo_amt, target: eo_amt},
        ds: {percent: ds_val, amount: ds_amt, target: ds_amt},
        e: {percent: e_val, amount: e_amt, target: e_amt},
        t: {percent: t_val, amount: t_amt, target: t_amt},
        r: {percent: r_val, amount: r_amt, target: r_amt},
        s: {percent: s_val, amount: s_amt, target: s_amt},
      };

      console.log("Updated allocation for user" + userId);
      console.log(baseallocation);

      return baseallocation;
    }
  }


  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

// find the date brackets of a transaction set
  dateBracket(transactions) {

    var sdate = new Date();
    var edate = sdate;

    transactions.forEach(function (t) {
      if (t.date < sdate) {
        sdate = t.date;
      }
    });

    return sdate;

  }


// Look for recurring

  lookforRecurring(transactions, sdate, edate) {

    var spendLocations = {};

    // pass one - we just log the places and amounts
    transactions.forEach(function (t) {
      if (_.has(spendLocations, t.name)) {
        spendLocations[t.name].count++;
        spendLocations[t.name].amounts.push(t.amount);
      } else {
        spendLocations[t.name].count = 1;
        spendLocations[t.name].amounts = [t.amount];
      }

    });

    // pass two - now we go through spend locations and flag multiples

    spendLocations.forEach(function (sl) {

      console.log('yo');
    });

  }

// counts and sums the number of discretionary items in a time bracket
  discretionarySumCount(transactions, sdate, edate) {

    var sum = 0;

    transactions.forEach(function (t) {
      console.log(t);
      if (t.pod != null) {
        sum = sum + t.amount;
        count++;
      }
      ;
    });

    return {count: count, sum: sum};

  }

}




