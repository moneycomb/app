/*****************************************************************************/
/* TransactionsList: Event Handlers */
/*****************************************************************************/
Template.TransactionsList.events({

  'click .sort-by': function(e,t) {
    let id = e.currentTarget.id;
    t.sortBy.set(id);
    console.log("here");

  },

  'click .sort-dir': function(e,t) {
    let id = e.currentTarget.id;
    t.sortDir.set(id);
  },

  'click .filter-time-frame': function(e,t) {
    let id = e.currentTarget.id;
    t.filterTimeFrame.set(id);
  },

  'click .action-evaluate': function(e,t) {
    $('.transaction-shape')
      .shape('duration',300)
      .shape('flip over')
  },

  'click .load-more': function(e,t) {
    let L = t.itemsToLoad.get();
    L = Number(L)+15;
    t.itemsToLoad.set(L);
  }

});

/*****************************************************************************/
/* TransactionsList: Helpers */
/*****************************************************************************/
Template.TransactionsList.helpers({

  sortBy: function() {
    return Template.instance().sortBy.get();
  },


  sortByIcon: function() {
    let sb = Template.instance().sortBy.get();
    console.log(sb);
    if (sb === 'by-rating') {
      return 'star'
    } else if (sb === 'by-date') {
      return 'calendar'
    } else {
      return 'dollar'
    }
  },

  sortDir: function() {
    return Template.instance().sortDir.get();
  },

  filterTimeFrame: function () {
    return Template.instance().filterTimeFrame.get();
  },

  transactions: function () {

    console.log("in the transaction helper: %s", this.selector.cell)

    var selector = {userId: Meteor.userId(), cell: this.selector.cell};


    // COMMON TRANSACTION SELECTOR LOGIC
    let sortBy = Template.instance().sortBy.get();
    let sortDir = Template.instance().sortDir.get();
    let filterTimeFrame = Template.instance().filterTimeFrame.get();


    let timeFrameDays = {
      'tf-7': 7,
      'tf-30': 30,
      'tf-60': 60,
      'tf-90': 90,
      'tf-365': 365
    }

    let sDate = moment().subtract(timeFrameDays[filterTimeFrame],'d').toDate();
    let eDate = moment().toDate();

    console.log("sDate="+sDate);
    console.log(timeFrameDays[filterTimeFrame]);
    selector.date= {};
    selector.date['$gt'] = sDate;
    selector.date['$lte'] = eDate;

    console.log(selector);

    // merge in the query...
    let query = Session.get('transactionQuery');
    console.log("query="+query);
    _.extend(selector,query);
    console.log(selector);



    let sortDirIndicator = ( sortDir === 'dir-ascending' ? 1 : -1);
    console.log(sortDirIndicator);

    if ( sortBy == 'by-amount') {
      var sortByField = 'amount'
    } else if ( sortBy == 'by-rating') {
      var sortByField = 'rating'
    } else {
      var sortByField = 'date'
    }

    var sortString = {}
    sortString[sortByField] = sortDirIndicator;

    // ok this is for demo mode only. We have to assume NOW and filter by that
    // selector.date = {$lte: moment(Session.get('NOW')).toDate()};

    if (this.cell) {
      selector.cell = this.cell;
    }

    // count by account
    if (this.account) {
      selector.account = this.account;
    }

    // filter by start date
    if (this.sDate) {
      selector.date['$gt'] = moment(this.sDate).toDate();
    }

    // filter by end date
    if (this.eDate) {
      selector.date['$lte'] = moment(this.eDate).toDate();
    }

    // count by ignore
    if (this.ignore) {
      selector.ignore = this.ignore;
    }

    // amount greater than or equal to
    if (this.amountgt) {
      selector.amount = {$gte: this.amountgt};
    }

    // amount less or equal to
    if (this.amountlt) {
      selector.amount = {$lte: Number(this.amountlt)};
      console.log("less than an amount...");
    }

    // count by isReviewed
    if (this.toReview) {
      selector.toReview = this.toReview;
    }

    if (this.isNew) {
      selector.isNew = this.isNew;
    }

    if (this.uncategorized) {
      selector.cell={};
      selector.cell['$nin'] = ['eo','ds','r','t','e','s','i','bf','other','pay'];
    }

    // count by last n days
    if (this.lastn) {
      var lastn = this.lastn;
      var endDate = moment().startOf('day').toDate();
      var startDate = moment().subtract(lastn, 'days').toDate();
      selector.date = {$gte: startDate, $lt: endDate};
    }

    // this week / month / quarter / year
    if (this.period) {
      var period = this.period;

      var endDate = moment().startOf('day').toDate();

      switch (period) {
        case "month":
          var startDate = moment().startOf('month').toDate();
          break;

        case "quarter":
          var startDate = moment().startOf('quarter').toDate();
          break;

        case "year":
          var startDate = moment().startOf('year').toDate();
          break;
      }
      ;

      selector.date = {$gte: startDate, $lt: endDate};
    }

    // if has a red flag

    if (this.redflag) {
      selector.redflag = this.redflag;
    }

    console.log(selector);
    console.log(sortString);

    return Transactions.find(selector, {sort: sortString});
  },


  listcolor: function () {

    if (this.color) {
      return this.color
    } else {

      return "light-blue darken-4";
    }
  },

});


/*****************************************************************************/
/* TransactionsList: Lifecycle Hooks */
/*****************************************************************************/
Template.TransactionsList.onCreated(function () {
  // Subscribe to subscriptions at the Template level

  this.itemsToLoad = new ReactiveVar(10);
  var self = this;

  self.autorun(function () {
    // we merge the incoming 'selector' element from the data context of the template with
    // the transactionQuery Session variable. messy? yep!
    console.log("TRANSACTIONS LIST AUTORUN")
    let X = self.data.selector
    console.log(X);

    let transactionQuery = Session.get('transactionQuery');
    let combinedQuery = _.extend(self.data.selector, transactionQuery);

    console.log('Combined Query')
    console.log(combinedQuery)
    console.log(self.itemsToLoad.get())

    self.subscribe('transactions',combinedQuery,self.itemsToLoad.get());

  });


  this.sortBy = new ReactiveVar('by-date');
  this.sortDir = new ReactiveVar('dir-descending');
  this.filterTimeFrame = new ReactiveVar('tf-30');


  let query = {ignore: false}
  Session.set('transactionQuery', query);

});

Template.TransactionsList.onRendered(function () {
  console.log("Rendering list...%s", this.data.timeframe)
});

Template.TransactionsList.onDestroyed(function () {
});
