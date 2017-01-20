/*****************************************************************************/
/* Last10: Event Handlers */
/*****************************************************************************/
Template.Last10.events({
});

/*****************************************************************************/
/* Last10: Helpers */
/*****************************************************************************/
Template.Last10.helpers({
  transactions: function () {
    return Transactions.find({cell: Template.instance().cell.get()}, {sort: {date: -1}});
  },

  yo: function() {
    return "Yo "+ this.cell
    Template.instance().cell.set(this.cell)
  }
});

/*****************************************************************************/
/* Last10: Lifecycle Hooks */
/*****************************************************************************/
Template.Last10.onCreated(function () {
  var self = this;

  self.cell = new ReactiveVar(self.data.cell)

  self.autorun(function () {
    console.log("NEW LAST 10! - %s",self.data.cell)
    self.subscribe('Transactions.last10',self.cell.get(),10);
  });
});

Template.Last10.onRendered(function () {

});

Template.Last10.onDestroyed(function () {
});
