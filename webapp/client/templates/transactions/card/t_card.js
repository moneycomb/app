Template.TCard.events({

  'click .action-reviewed': function (e, t) {
    var transactionId = this._id;

    console.log(`Marking ${transactionId} as reviewed...`);
    Transactions.update({_id: transactionId}, {$set: {toReview: false}});
    // +5 HONEYMONEY!!
    Meteor.call('addHoneyMoney',5);
    Meteor.call('updateSpendStatistics');
  },

  'click .add-to-rating': function (e,t) {
    let transactionId = this._id;
    let currating = this.rating;

    const newrating = ( currating < 10 ? currating + 1 : 10 );
    Transactions.update({_id: transactionId}, {$set: {rating: newrating}});
  },

  'click .subtract-from-rating': function (e,t) {
    let transactionId = this._id;
    let currating = this.rating;

    const newrating = ( currating > 0 ? currating -1 : 0 );
    Transactions.update({_id: transactionId}, {$set: {rating: newrating}});
  },

  'click .action-edit': function (e,t) {
    t.editmode.set( ! t.editmode.get());
  },

})

Template.TCard.helpers({

  image(cell) {
    return `/images/white/${cell}.png`
  },

  cellImg(cell) {

    if (_.contains(['eo','ds','r','t','e','s','o','bf'],cell)) {
     return cell;
    } else {
      return 'u';
    }
  },

  isManual() {
    return (this.source == "manual");
  },

  ratingCount(count) {
    var countArr = [];
    for (var i=0; i<count; i++){
      countArr.push({});
    }
    return countArr;
  },

  curRating() {
    return this.rating;
  },

  editMode() {
    return Template.instance().editmode.get();
  }

})

Template.TCard.onCreated(function () {

  this.newrating = new ReactiveVar(0);
  this.editmode = new ReactiveVar(false);
  
  this.flipped = new ReactiveVar(false);
  $('.shape').shape();
})


