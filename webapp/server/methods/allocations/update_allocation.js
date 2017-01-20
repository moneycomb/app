Meteor.methods({

  updateAllocation: function () {
    var allocation = MoneyComb.recommendedAllocation(Meteor.userId());
    _.extend(allocation, {userId: Meteor.userId()});

    let A = Allocations.findOne({userId: Meteor.userId()})
    if (A == undefined) {
      Allocations.insert(allocation)
      console.log('method : updateAllocation : Created allocation for user %s for the first time', Meteor.userId())
    } else {
      Allocations.update(A._id,{$set: allocation})
      console.log('method: updateAllocation : Updated allocation for user %s', Meteor.userId())
    }
  }

});
