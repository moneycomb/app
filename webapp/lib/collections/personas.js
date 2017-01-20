Personas = new Mongo.Collection('personas');

// Security Rules - deny all. This collection is for all intents R/O
Personas.deny({
  insert() { return true },
  update() { return true },
  remove() { return true },
});

AllocationChoices = new SimpleSchema({
  category: {
    type: String,
    label: "Category",
    allowedValues: ['eo', 'ds','r','t','e','s'],
  },
  percentage: {
    type: Number,
    label: "Percentage",
    decimal: true,
    min: 0,
    max: 1
  }

})

PersonasSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Name",
    defaultValue: null,
    max: 80
  },

  number: {
    type: Number,
    label: "Number",
    optional: true
  },

  allocations: {
    type: [AllocationChoices],
    minCount: 1,
    maxCount: 6
  },

  description: {
    type: String,
    label: "Description",
    optional: true,
    max: 350
  }
});


Personas.attachSchema(PersonasSchema);


Personas.helpers({

  allocations: function() {
    return _.pluck(this.allocations, 'category');
  }

})


Meteor.startup(function () {

  if (Meteor.isServer) {

    if (Personas.find().count() === 0) {

      var personas = JSON.parse(Assets.getText('personas.json'));

      _.each(personas, function (p) {
        Personas.insert(p);
      });

      console.log(Personas.find().count() + ' personas loaded in DB');

    }
  }

});