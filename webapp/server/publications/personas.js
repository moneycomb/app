Meteor.publish('personas', function () {
  
  return Personas.find({},{fields: {name: 1, description: 1}, sort: {name: 1}});

});
