/*****************************************************************************/
/* TransactionAmount: Event Handlers */
/*****************************************************************************/
Template.TransactionAmount.events({
});

/*****************************************************************************/
/* TransactionAmount: Helpers */
/*****************************************************************************/
Template.TransactionAmount.helpers({
  widget_amount() {
    if (this.amount < 0) {
      return "+$"+Math.abs(this.amount);
    } else {
      return "$"+this.amount;
    }
  },


  used() {
    var retval={};

    var target = this.target;
    var used = this.amount;

    if (used >=target) {
      retval.overtext = "! USED ALL+";
      retval.barfill = "#FF4081";
      retval.baropacity = 1.0;
      retval.remain_opacity = 0;
      retval.used_opacity = 0;
      retval.amount_text_color = "#FF4081";

    } else {
      retval.overtext = "";
      retval.barfill = "#9E9E9E";
      retval.baropacity = 0.2;
      retval.remain_opacity = 1.0;
      retval.used_opacity = 0.6;
      retval.amount_text_color = "#FFA000";

      const full_bar_width = 172;
      retval.width = parseFloat((used/target)*full_bar_width).toFixed(0);

    }

    return retval;
  },


  amount_text_color() {

    let default_color = "#F6A623";
    let inflow_color = "#26a69a";

    if (this.amount <0) {
      return inflow_color;
    } else {
      return default_color;
    }

  }

});

/*****************************************************************************/
/* TransactionAmount: Lifecycle Hooks */
/*****************************************************************************/
Template.TransactionAmount.onCreated(function () {
});

Template.TransactionAmount.onRendered(function () {
});

Template.TransactionAmount.onDestroyed(function () {
});
