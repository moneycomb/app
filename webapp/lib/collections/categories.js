Categories = new Mongo.Collection('categories');

// Deny all client-side updates on the Cells collection
// Best practice from: http://guide.meteor.com/security.html
Categories.deny({
  insert() {
    return true
  },
  update() {
    return true
  },
  remove() {
    return true
  },
});


CategoriesSchema = new SimpleSchema({
  category_id: {
    type: String,
    label: "Category ID",
    max: 10
  },

  meta: {
    type: String,
    label: "Meta",
  },

  category: {
    type: String,
    label: "Category Name",
  },

  type: {
    type: String,
    label: "Type",
  },

  cell: {
    type: String,
    label: "Cell",
    max: 4,
    optional: true
  }
});

Categories.attachSchema(CategoriesSchema);



Meteor.startup(function () {

  if (Meteor.isServer) {

    if (Categories.find().count() === 0) {

      var catmap = {};

      var categories = JSON.parse(Assets.getText('categories.json'));

      _.each(categories, function (category) {
        Categories.insert(category);
        catmap[category.category_id] = category.pod;
      });

      console.log(Categories.find().count() + ' categories loaded in DB');

    }

  }

});


