// Onboarding Publications
Meteor.publish('Onboarding.group', function (group) {
  check(group, Number);
  return Onboarding.find({group: group});
});

Meteor.publish('Onboarding.group.number', function (group, number) {
  check(group, Number);
  check(number, Number);

  return Onboarding.find({group: group, number: number});
});
