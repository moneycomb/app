Meteor.methods({

  updateAllocations: function () {

    console.log("Updating allocations for " + this.userId);

    let user = Meteor.user();
    let gross_annual_income = Meteor.user().profile.income * Meteor.user().profile.pay_period;

    console.log(gross_annual_income);

    var estimated_taxes = MoneyComb.estimateTaxes(gross_annual_income, user.profile.status, user.profile.zipcode);
    var estimated_housing = MoneyComb.estimateHousing(gross_annual_income, user.profile.status, user.profile.zipcode);
    var estimated_transportation = MoneyComb.estimateTransportation(gross_annual_income, user.profile.status, user.profile.zipcode);

    var left_over = gross_annual_income - estimated_taxes - estimated_housing - estimated_transportation;

    var allocation = MoneyComb.recommendedAllocation(this.userId);

    // Save the allocation
    Meteor.users.update(this.userId, {$set: {'profile.allocation': allocation}});
    // Set (or reset) the target/desired to the recommended allocation
    Meteor.users.update(this.userId, {$set: {'profile.target': allocation}});
  }

});
