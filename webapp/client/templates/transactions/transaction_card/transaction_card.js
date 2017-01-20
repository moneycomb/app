/*****************************************************************************/
/* TransactionCard: Event Handlers */
/*****************************************************************************/
Template.TransactionCard.events({


  'click .action-select': function (e, t) {
    //Router.go("/transaction/" + t.data._id);

    // toggle selected
    t.selected.set(!(t.selected.get()));
  },

  'click .action-reviewed': function (e, t) {

    var transactionId = t.data._id;
    Transactions.update({_id: transactionId}, {$set: {toReview: false}});

    // +5 HONEYMONEY!!
    Meteor.call('addHoneyMoney',5);
    Meteor.call('updateSpendStatistics');
  },

  'click .action-categorize': function(e,t) {

    let expanded = t.expanded.get();

    if (expanded) {
      $('#recat-'+ t.data._id).hide();
      $('#recat2-'+ t.data._id).hide();
    } else {
      $('#recat-'+ t.data._id).show();
    }

    t.expanded.set(!expanded);

  },

  'click .more': function(e,t) {
      $('#recat2-'+ t.data._id).show();
  },
  /*
  'mouseleave .recat-box': function(e,t) {
    $('#recat-'+ t.data._id).hide();
  },
*/

  'mouseover .trans-date': function(e,t) {

    var transactionId = t.data._id;
    $('#date-'+transactionId)
      .popup('show')
    ;
  },

  'mouseover .action-date': function(e,t) {

    t.transDateLong.set(true);

  },

  'mouseover .transaction-name': function(e,t) {
    t.editName.set(true);
  },

  'mouseleave .transaction-name': function(e,t) {
    t.editName.set(false);
  },


  'mouseleave .action-date': function(e,t) {

    t.transDateLong.set(false);

  },


  'click .action-rate': function(e,t) {
    console.log(e);
    console.log(t);
    let transactionId = t.data._id;
    let rating = e.currentTarget.id;

    Transactions.update({_id: transactionId}, {$set: {rating: rating}});

  },

  'click .action-flip': function(e,t) {
    console.log('flip over');
    let transactionId = t.data._id;
    $('#shape-'+transactionId)
      .shape('duration',300)
      .shape('flip over')
  },


  'click .action-flip-back': function(e,t) {
    let transactionId = t.data._id;
    console.log('flip back');
    $('#shape-'+transactionId)
      .shape('duration',300)
      .shape('flip back')
  }


});

/*****************************************************************************/
/* TransactionCard: Helpers */
/*****************************************************************************/
Template.TransactionCard.helpers({

  thisImage: function() {
    let tIconImage = MoneyComb.singleIconImage(this.cell);
    return '/images/white/' + tIconImage + '.png';
  },

  selected: function() {
    return Template.instance().selected.get();
  },

  selectedColor: function(color) {
    let selected = Template.instance().selected.get();
    return (selected ? color : "#848484")
  },

  subcellName: function () {
    if (this.subcell == "" || this.subcell == null) {
      return "..."
    } else {
      return MoneyComb.singlecellname(this.subcell)
    }
  },

  shortCleanName: function () {
    var cn = this.name.replace('AUTHORIZED ON ', '');
    if (cn.length > 17) {
      cn = cn.substr(0, 16) + "...";
    }

    var lower = cn.toLowerCase();
    return lower.replace(/(^| )(\w)/g, function (x) {
      return x.toUpperCase();
    });
  },

  eligibleToRate: function() {
    return (_.contains(['eo','ds','e','t','r','s'],this.cell));
  },

  needsReview: function() {
    return this.toReview;
  },

  hideUnhideIcon: function() {
    return (this.ignore ? "check icon" : "remove circle icon")
  },

  hideUnhideText: function() {
    return (this.ignore ? "Show" : "Ignore")
  },

  showEditNameIcon: function() {
    return Template.instance().editName.get();
  },

  transDate: function() {
    return (Template.instance().transDateLong.get() === true  ? this.shortDate(): this.humanDate());
  }



});

/*****************************************************************************/
/* TransactionCard: Lifecycle Hooks */
/*****************************************************************************/
Template.TransactionCard.onCreated(function () {
  this.expanded = new ReactiveVar(false);
  this.selected = new ReactiveVar(false);
  this.transDateLong = new ReactiveVar(true);
  this.editName = new ReactiveVar(false);
});

Template.TransactionCard.onRendered(function () {
  $('.ui.rating')
    .rating()
  ;
  $('.transaction-shape').shape('duration',300);

  $('.help-rating')
    .popup()
  ;

  $('.pointing.menu .item').tab();



});

Template.TransactionCard.onDestroyed(function () {
});
