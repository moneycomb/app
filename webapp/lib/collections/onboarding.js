Onboarding = new Mongo.Collection('onboarding');

// Security Rules - deny all. This collection is for all intents R/O
Onboarding.deny({
  insert() { return true },
  update() { return true },
  remove() { return true },
});


OnboardingChoices = new SimpleSchema({
  number: {
    type: Number,
    label: "Choice Number",
    defaultValue: null,
    max: 80,
    optional: true
  },
  choice: {
    type: String,
    label: "Choice",
    defaultValue: null,
    max: 80,
    optional: true
  },
  image: {
    type: String,
    label: "Image",
    defaultValue: null,
    max: 40,
    optional: true
  }

})

OnboardingSchema = new SimpleSchema({
  question: {
    type: String,
    label: "Question",
    defaultValue: null,
    max: 240
  },

  choices: {
    type: [OnboardingChoices],
    minCount: 1,
    maxCount: 5
  },

  active: {
    type: Boolean,
    defaultValue: true,
  },


  number: {
    type: Number,
    label: "Number (ordering)",
    min: 1,
    max: 30,
    defaultValue: 1,
    optional: false
  },

  group: {
    type: Number,
    label: "Group Number",
    min: 1,
    max: 30,
    defaultValue: 1,
    optional: true
  },

  color: {
    type: String,
    label: "Color (Hex Value with #)",
    defaultValue: '#212121',
    max: 7
  },

  type: {
    type: String,
    label: "Type",
    allowedValues: ['multiple-choice', 'other'],
    defaultValue: 'multiple-choice'
  },

  instructions: {
    type: String,
    label: "Instructions",
    optional: true,
    max: 180
  }
});

Onboarding.attachSchema(OnboardingSchema)

Meteor.startup(function () {

  if (Meteor.isServer) {

    if (Onboarding.find().count() === 0) {

      var obQ = JSON.parse(Assets.getText('onboarding.json'));

      _.each(obQ, function (question) {
        Onboarding.insert(question);
      });

      console.log(Onboarding.find().count() + ' onboarding questions loaded in DB');

    }
  }

});
