Actions = new Mongo.Collection('actions');


// Deny all client-side updates on the Actions collection
// Best practice from: http://guide.meteor.com/security.html
Actions.deny({
  insert() { return true },
  update() { return true },
  remove() { return true },
});



// meta:
// image
// text (allow some sort of markup?)
// choices: {ans1, ans2, ans3}
// correct_answer
// share_buttons
// active_date
// expiration_date
//
// shown: true or false
// acknowledged: true or false

ActionsMeta = new SimpleSchema({

  choices: {
    type: [String],
    label: "Choices",
    min: 1,
    max: 70,
    optional: true,
    maxCount: 5,
  },

  correct_answer: {
    type: Number,
    optional: true
  },

  active_date: {
    type: Date,
    label: "Active Date",
    optional: true
  },

  expire_date: {
    type: Date,
    label: "Expire Date",
    optional: true
  },

  image: {
    type: String,
    optional: true
  },

});

ActionsSchema = new SimpleSchema({

  type: {
    type: String,
    label: "Type",
    allowedValues: ['allocate', 'evaluate', 'educate', 'commit', 'achievement','reminder'],
    defaultValue: 'educate',
  },

  category: {
    type: String,
    label: "Category",
    allowedValues: ['eo','s','t','r','e','ds','mc'],
    optional: true
  },

  text: {
    type: String,
    min: 0,
    max: 180,
  },

  priority: {
    type: Number,
    label: "Priority",
    defaultValue: 3,
    min: 1,
    max: 5,
  },

  displayed: {
    type: Boolean,
    label: "Displayed",
    defaultValue: false,
  },

  acknowledged: {
    type: Boolean,
    label: "Acknowledged",
    defaultValue: false,
  },

  meta: {
    type: ActionsMeta
  }
});

Actions.attachSchema(ActionsSchema);

