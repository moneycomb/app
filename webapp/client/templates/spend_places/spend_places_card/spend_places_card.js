Template.SpendPlacesCard.onCreated(function () {
  var self = this;

  console.log("HERE:");
  console.log(self);

  self.autorun(function () {
    self.subscribe('MyPurchasePlaces',self.data.abbrev);
  });


})

Template.SpendPlacesCard.helpers({

  places: function() {
    return MyPurchasePlaces.find({cell: this.abbrev},{sort: {count:-1}, limit: 5})
  }

})

