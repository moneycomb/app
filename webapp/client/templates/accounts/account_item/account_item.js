/*****************************************************************************/
/* AccountItem: Event Handlers */
/*****************************************************************************/
Template.AccountItem.events({

  'click .action-edit': function (e,t) {

    console.log("Edit Account");
    console.log(this._id);
    t.edit_mode.set(true);

  },

  'submit .action-change': function (e, t) {
    e.preventDefault();
    var name = e.target.name.value;
    var accountId = t.data._id;
    FinAccounts.update({_id: accountId}, {$set: {'meta.name': name}});
    t.edit_mode.set(false);
  },

  'click .action-cancel': function (e,t) {
    t.edit_mode.set(false);
  },


  'click .action-sync': function (e, t) {

    // t.syncing.set('active');

    Meteor.call('plaidSyncSingleAccount', this._id)

  },


  'click .action-transactions': function (e,t) {

    console.log("Transactions for Account");
    console.log(this._id);
    Router.go("/account/" + t.data._id);

  },

  'click .action-remove': function (e, t) {

    Meteor.call('removeAccount', this, function () {
      console.log("account " + this._id + " deleted");
      sAlert.info("Account deleted.");
    });

  },

  'click .untrack-account': function (e,tmpl) {
    console.log(this);
    //Transactions.remove({account: this._id});
    var result = FinAccounts.remove({_id: this._id});
    console.log(result + " accounts removed");

    // todo now we need to call a method to remove the associated transactions server side!

  },

  'click .account-item': function() {
    $('.account-item')
      .transition('jiggle')
    ;
  }
});

/*****************************************************************************/
/* AccountItem: Helpers */
/*****************************************************************************/
Template.AccountItem.helpers({

  ignoreNoIgnoreIcon: function() {
    return (this.ignore ? "unhide" : "remove");
  },

  typeIcon: function() {
    if (this.type === "depository") {

      if (this.subtype === "checking") {
        return 'check icon';
      } else {
        return 'money icon';
      }

    } else {
      return 'payment icon';
    }
  },

  showAmount: function() {
    return "$"+this.balance.available;
  },

  editmode: function() {
    return Template.instance().edit_mode.get();
  },

  syncingStatus: function() {
    return Template.instance().syncing.get();
  }


});

/*****************************************************************************/
/* AccountItem: Lifecycle Hooks */
/*****************************************************************************/
Template.AccountItem.onCreated(function () {
  this.edit_mode = new ReactiveVar(false);
  this.syncing = new ReactiveVar("");

});

Template.AccountItem.onRendered(function () {
});

Template.AccountItem.onDestroyed(function () {
});
