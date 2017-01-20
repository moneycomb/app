AccountsController = RouteController.extend({

  list: function () {
    this.render('AccountsList', { /* data: {} */});
  },

  detail: function () {
    account = FinAccounts.findOne({_id: this.params._id});
    this.render('AccountsDetail', {data: account});
  }

});