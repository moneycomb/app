Meteor.startup(function () {
  FinAccounts._ensureIndex({ "userId": 1});
  FinAccounts._ensureIndex({ "userId": 1, "type": 1});
});

Meteor.publish('account', function (id) {

  check(id, String);

  if (!this.userId) {
    return this.ready();
  }

  return FinAccounts.find(
    {_id: id, userId: this.userId},
    { fields: { _id: 1, userId: 1, balance: 1, meta: 1, institution_type: 1, subtype: 1, type: 1, ignore:1,  lastSync: 1}}
  );
});


Meteor.publish('accounts', function () {

  if (!this.userId) {
    return this.ready();
  }

  return FinAccounts.find({userId: this.userId});
});
