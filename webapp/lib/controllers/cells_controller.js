CellsController = RouteController.extend({

  // A place to put your subscriptions
  // this.subscribe('items');
  // // add the subscription to the waitlist
  // this.subscribe('item', this.params._id).wait();

  subscriptions: function () {
    //this.subscribe('cells');
    //this.subscribe('transactions');
  },

  data: function () {
  },

  detail: function () {
    cell = Cells.findOne({_id: this.params._id});
    this.layout('MasterLayout');
    this.render('CellsDetail',{data: cell});
  },

  detailbyabbrev: function () {
    console.log("In route Controller the cell is %s",this.params._abbrev)
    cell = Cells.findOne({abbrev: this.params._abbrev});
    console.log(cell)
    this.render('CellsDetail',{data: cell});
  },

  showcell: function () {
    console.log(this.params.query);
    
    this.render('ShowCell',{data: {cell: this.params._abbrev}});
  },

  transbyabbrev: function () {
    transactions = Transactions.find({cell: this.params._abbrev});
    this.render('CellTransactions',{data: transactions});
  },

  list: function () {
    cells = Cells.find({},{sort: {group: 1}});
    this.render('PodsList',{data: cells});
  }
});


