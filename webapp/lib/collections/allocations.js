Allocations = new Mongo.Collection('allocations');


  Allocations.allow({
    insert: function (userId, doc) {
      return doc && doc.userId === userId;
    },
    update: function (userId, doc) {
      return true;
    },
    remove() {
      return false;
    }
  });


CatSchema = new SimpleSchema({
  percent: {
    type: Number,
    decimal: true,
    defaultValue: 0,
    max: 1.0
  },
  amount: {
    type: Number,
    decimal: true,
  },
  target: {
    type: Number,
    decimal: true,
  },

})


AllocationsSchema = new SimpleSchema({

  _id: {
    type: String,
    label: "_id",
  },

  createdAt: {
    type: Date,
    optional: true
  },

  userId: {
    type: String,
    label: "User ID",
    optional: true      // this is not really the case. But I set it elsewhere on Insert
  },

  'eo': {
    type: CatSchema,
    label: "Eating Out Allocation"
  },
  'ds': {
    type: CatSchema,
    label: "DS Allocation"
  },
  'r': {
    type: CatSchema,
    label: "Recharge Allocation"
  },
  't': {
    type: CatSchema,
    label: "Travel Allocation"
  },
  'e': {
    type: CatSchema,
    label: "Entertainment Allocation"
  },
  's': {
    type: CatSchema,
    label: "Shopping Allocation"
  },


});

Allocations.attachSchema(AllocationsSchema);

// see: meteor add matb33:collection-hooks
Allocations.before.insert(function (userId, doc) {
  doc.createdAt = new Date();
});

// Collection Hooks - update
Allocations.before.update(function (userId, doc) {
  doc.updatedAt = new Date();
});


Allocations.helpers({

  targetMoneyPot: function () {
    let x = this;
    var total = x.eo.target + x.ds.target + x.r.target + x.e.target + x.s.target + x.t.target;
    return parseFloat(total).toFixed(0);
    

  },
  
  targetRecommendedMoneyPot: function () {
    let x = this;
    var total = x.eo.amount + x.ds.amount + x.r.amount + x.e.amount + x.s.amount + x.t.amount;
    return parseFloat(total).toFixed(0);

  },

  periodTarget: function(cell) {
    if (cell === 'eo') {
      return this[cell].target;
    } else if (cell === 't') {
      return (this[cell].target/30)*365;
    } else {
      return this[cell].target;
    }
  }

})