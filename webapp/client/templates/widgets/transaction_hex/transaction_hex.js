/*****************************************************************************/
/* TransactionHex: Event Handlers */
/*****************************************************************************/
Template.TransactionHex.events({
});

/*****************************************************************************/
/* TransactionHex: Helpers */
/*****************************************************************************/
Template.TransactionHex.helpers({

  calcIcon() {
    if (this.cell !== "" && this.cell!=null) {
      return "/images/white/"+this.cell+".png";
    } else {
      return "/images/unknown.png";
    }

  }
});

/*****************************************************************************/
/* TransactionHex: Lifecycle Hooks */
/*****************************************************************************/
Template.TransactionHex.onCreated(function () {
});

Template.TransactionHex.onRendered(function () {
});

Template.TransactionHex.onDestroyed(function () {
});
