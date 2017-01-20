Hives = new Mongo.Collection('hives');


if (Meteor.isServer) {
  Hives.deny({
    insert() { return true },
    update() { return true },
    remove() { return true },
  });

  Meteor.startup(function () {
    Hives._ensureIndex({ "name": 1});
  });

}


HivesMeta = new SimpleSchema({

  annualincome: {
    type: Number,
    label: "Income",
    optional: true
  },

  gender: {
    type: String,
    optional: true
  },

  status: {
    type: String,
    optional: true
  },

});

HivesSchema = new SimpleSchema({

  type: {
    type: String,
    label: "Type",
    allowedValues: ['auto', 'user'],
    defaultValue: 'auto',
  },

  description: {
    type: String,
    label: "Description",
    optional: true,
    max: 180
  },

  meta: {
    type: HivesMeta
  }

});

Hives.attachSchema(HivesSchema);

Hives.helpers({

  description: function() {

    const income_description = [
      "all income ranges",
      "$ 0 - 50,000 per year",
      "$ 50,000 - 75,000 per year",
      "$ 75,000 - 100,000 per year",
      "$ 100,001 - 150,000 per year",
      "$ 151,001 - 200,000 per year",
      "over $200,000 per year",
    ]

    const status_description = {
      '*': 'all statuses (married, single, w/ & w/o kids)',
      'm': 'married',
      'n': 'single',
      'k': 'married with kids',
      'j': 'single with kids'
    }

    const age_description = [
      'all ages',
      'in their teens (18-19 years old)',
      'in their twenties',
      'in their thirties',
      'in their forties',
      'in their fifties',
      'over 60',
    ]

    const gender_description = {
      '*': 'both male and female',
      'm': 'male',
      'f': 'female'
    }

    return "People who make " + income_description[this.incomebracket]
        +", " + status_description[this.status]
        +", " + age_description[this.agebracket]
        +", " + gender_description[this.gender]
        +" with all Money Mindsets!"
  }

})