Meteor.publish('SpendSuggestions.featured', function () {

  return SpendSuggestions.find({featured: true});

});