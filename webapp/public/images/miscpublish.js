
// Money Mindset publications
Meteor.publish('moneymindset', function () {
  return MoneyMindset.find({userId: this.userId});
});


Meteor.publish('personas', function () {
  return Personas.find();
});

Meteor.publish('signons', function (id) {

  check(id, String);

  return Signons.find({_id: id});
});

Meteor.publish('rules', function () {
  return Rules.find();
});