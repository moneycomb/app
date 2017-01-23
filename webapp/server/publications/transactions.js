// DATABASE INDEX STUFF
// See:

Meteor.startup(function () {
  Transactions._ensureIndex({ "userId": 1, "cell": 1});
  Transactions._ensureIndex({ "userId": 1, "date": 1});
  Transactions._ensureIndex({ "userId": 1, "toReview": 1});
  Transactions._ensureIndex({ "rating": 1});
  Transactions._ensureIndex({ "amount": 1});
  Transactions._ensureIndex({ "cell": 1, "ignore": 1, "date": 1});
});


// Transaction Publication for Griddle (using Meteor-Griddle package)
Meteor.publish('transactionsG', function (query,options) {

  if (!this.userId) {
    return this.ready();
  }

  const T = Transactions.find(query, options);
  Counts.publish(this, 'matching-transactions', Transactions.find(query, options));

  return T;
});


// Transaction Publications
Meteor.publish('transactions', function (query,limit) {


  if (limit == undefined) var limit = 20;

  check(query,Object);
  check(limit,Number);

  if (!this.userId) {
    return this.ready();
  }

  // console.log('incoming query:'+query);
  if (query == undefined) { var query = {}; }
  query.userId = this.userId;
  query.ignore = false;

  //console.log('full selector:'+selector);
  return Transactions.find(query,
    { fields: { _id: 1, isNew: 1, toReview: 1, description: 1, name: 1, account: 1, date: 1, amount: 1, ignore: 1, userId: 1, cell: 1, category_id: 1, rating: 1}, limit: limit});
});


Meteor.publish('Transactions.uncategorized', function () {
  if (!this.userId) {
    return this.ready();
  }

  let startDate = moment().subtract(90,'d');

  return Transactions.find({
    userId: this.userId,
    ignore: false,
    date:{$gt: startDate.toDate()},
    cell: null});
  
});

Meteor.publish('Transactions.other', function () {
  if (!this.userId) {
    return this.ready();
  }
  return Transactions.find({userId: this.userId, ignore: false, cell: "o"});
});

Meteor.publish('Transactions.last10uncategorized', function () {
  if (!this.userId) {
    return this.ready();
  }
  return Transactions.find({userId: this.userId, cell: null},{sort: {date: -1},limit: 10});
});


Meteor.publish('Transactions.last10', function (cell,limit) {

  check(cell, String)
  check(limit,Number)

  if (!this.userId) {
    return this.ready();
  }

  // Meteor._sleepForMs(2000);


});


Meteor.publish('Transactions.active', function () {

  if (!this.userId) {
    return this.ready();
  }

  return Transactions.find({userId: this.userId, ignore: false});
});

Meteor.publish('Transactions.LAST10', function () {
  if (!this.userId) {
    return this.ready();
  }
  return Transactions.find({userId: this.userId},{sort: {date: -1}, limit: 5});
});



Meteor.publish('Transactions.review', function () {
  if (!this.userId) {
    return this.ready();
  }
  return Transactions.find({userId: this.userId, toReview: true},{sort: {date: -1}});
});

Meteor.publish('Transactions.single', function (id) {

  check(id,String);

  if (!this.userId) {
    return this.ready();
  }
  return Transactions.find({_id: id, userId: this.userId});
});

Meteor.publish('account_transactions', function (account_id) {

  check(account_id, String);

  if (!this.userId) {
    return this.ready();
  }

  return Transactions.find({account: account_id});
});

Meteor.publish('Transactions.cell', function (cell) {

  check(cell, String);
  const days=10;

  let startDate = moment().subtract(days,'d');

  if (!this.userId) {
    return this.ready();
  }

  return Transactions.find({
    cell: cell,
    userId: this.userId,
    date:{$gt: startDate.toDate()}},
    {sort: {date: -1}});
});


Meteor.publish('Transactions.subcell', function (cell,subcell) {

  check(cell, String);
  check(subcell, String);
  const days=10;

  let startDate = moment().subtract(days,'d');

  if (!this.userId) {
    return this.ready();
  }

  return Transactions.find({
      cell: cell,
      subcell: subcell,
      userId: this.userId,
      date:{$gt: startDate.toDate()}},
    {sort: {date: -1}});
});


Meteor.publish('Transactions.last30days', function (cell) {

  let startDate = moment().subtract(365,'d');

  if (!this.userId) {
    return this.ready();
  }
  return Transactions.find(
      {
        userId: this.userId,
        cell: cell,
        ignore: false,
        date:{$gt: startDate.toDate()}},
      {sort: {date: -1}});
});

Meteor.publish('Transactions.toReview', function () {

  if (!this.userId) {
    return this.ready();
  }
  return Transactions.find(
      {
        userId: this.userId,
        toReview: true,
        ignore: false,
      },
      {sort: {date: -1}});
});


Meteor.publish('Transactions.recent', function (days) {

  check(days, Number);

  let startDate = moment().subtract(days,'d');

  if (!this.userId) {
    return this.ready();
  }

  return Transactions.find(
    {
      userId: this.userId,
      ignore: false,
      date:{$gt: startDate.toDate()}},
    {sort: {date: 1}});
});
