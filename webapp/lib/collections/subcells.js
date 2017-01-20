SubCells = new Mongo.Collection('subcells');

// Deny all client-side updates on the UserCells collection
// Best practice from: http://guide.meteor.com/security.html
SubCells.deny({
  insert() { return true },
  update() { return true },
  remove() { return true },
});


Meteor.startup(function() {

  if (Meteor.isServer) {

    if (SubCells.find().count() === 0) {

      var subcells = JSON.parse(Assets.getText('subcells.json'));

      _.each(subcells, function (subcell) {
        SubCells.insert(subcell);
      });

      console.log(SubCells.find().count() + ' subcells loaded in DB');

    }
    ;


  }

});

SubCells.helpers({

  actualSpend: function (tf) {
    const An = Analysis.findOne({userId: Meteor.userId()})
    return parseFloat(An.subcellSpend[this.abbrev][tf].amount).toFixed(0)
  }

});

