/*****************************************************************************/
/* TradeoffStat: Event Handlers */
/*****************************************************************************/
Template.TradeoffStat.events({
});

/*****************************************************************************/
/* TradeoffStat: Helpers */
/*****************************************************************************/
Template.TradeoffStat.helpers({
  integerString: function () {
    let fvalue= parseFloat(this.value).toFixed(1);
    let ivalue= Math.floor(this.value);
    let singleDecimal = parseFloat((fvalue - ivalue)*10).toFixed(0);

    if (singleDecimal==9) {
      ivalue +=1;
    }

    if (singleDecimal >= 2 && ivalue == 0) {
      ivalue=""
    }

    return ivalue;
  },

  isquarter: function () {
    let fvalue = parseFloat(this.value).toFixed(1);
    let ivalue = Math.floor(this.value);
    let singleDecimal = parseFloat((fvalue - ivalue) * 10).toFixed(0);

    return ((singleDecimal == 2 || singleDecimal == 3) ? true : false)
  },

  ishalf: function () {
    let fvalue = parseFloat(this.value).toFixed(1);
    let ivalue = Math.floor(this.value);
    let singleDecimal = parseFloat((fvalue - ivalue) * 10).toFixed(0);

    return ((singleDecimal >= 4 && singleDecimal <= 6) ? true : false)
  },

  isthreequarters: function () {
    let fvalue = parseFloat(this.value).toFixed(1);
    let ivalue = Math.floor(this.value);
    let singleDecimal = parseFloat((fvalue - ivalue) * 10).toFixed(0);

    return ((singleDecimal == 7 || singleDecimal == 8) ? true : false)
  }
});

/*****************************************************************************/
/* TradeoffStat: Lifecycle Hooks */
/*****************************************************************************/
Template.TradeoffStat.onCreated(function () {
});

Template.TradeoffStat.onRendered(function () {
});

Template.TradeoffStat.onDestroyed(function () {
});
