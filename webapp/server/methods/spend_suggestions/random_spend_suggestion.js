Meteor.methods({
  randomSpendSuggestion: function(cell) {
    let suggestions = SpendSuggestions.find({featured: true, cell: cell}, {fields: {_id: 1}}).fetch();
    const featuredIds = _.pluck(suggestions,'_id');
    const choice = _.sample(featuredIds);
    return SpendSuggestions.findOne({_id: choice});
  }
});


