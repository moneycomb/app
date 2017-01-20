/*****************************************************************************/
/* SpendTrend: Event Handlers */
/*****************************************************************************/
Template.SpendTrend.events({
});

/*****************************************************************************/
/* SpendTrend: Helpers */
/*****************************************************************************/
Template.SpendTrend.helpers({

  // what we pass in!
  // startDate - start date of range
  // endDate - end date of range
  // startTarget - do we want a target line...if so need start and end
  // endTarget -
  // spend - a transaction series :   [ ['2015-12-01',34,56], .... ]


  "myChartData": function() {



    console.log('Sdate='+this.sDate);
    console.log('edate='+this.eDate);
    console.log('etgt='+this.eTgt);
    console.log('periodindays='+this.periodInDays);

    var range = MoneyComb.dateRange(this.sDate,this.eDate);
    var target = MoneyComb.linearTrend(this.sTgt,this.eTgt,this.periodInDays);
    var spending = this.spend;


    var spendingRunningTotal = MoneyComb.runningTotal(spending);


    return {
      /* size: {
        width: 800
      },*/
      interaction: {
        enabled: this.interaction
      },

      point: {
        r: 4,
        focus: {
          expand: {
            enabled: false
          }
        },
        show: false,
      },
      tooltip: {
        format: {
          value: function (value, ratio, id, index) { return '$'+parseFloat(value).toFixed(0)}
        }
      },
      grid: {
        x: {
          show: false
        },
        y: {
          show: false
        }
      },
      //regions: [
      //  {axis: 'x', start: '2015-12-15', end: '2015-12-24', class: 'red'},
      //],
      data: {
        x: 'x',
        // xFormat: '%Y%m%d',
        columns: [
          ['Target'].concat(target),
          ['Spend Trend'].concat([0].concat(this.spend)),
          ['x'].concat(range),
        ],

        classes: {
          'Target': 'spendtarget',
          'Spend Trend': 'spendtrend',
        },

        colors: {
          'Target': "#9e9e9e",
          'Spend Trend': this.color,
        },



        type: 'area-spline'
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%m/%d',
            culling: {
              max: 5
            }
          }
        },
        y: {
          //label: {
          //  text: 'MoneyComb Allocation',
          //  position: 'outer-middle'
          //},
          tick: {
            format: d3.format("$,"),
            culling: {
              max: 4
            }
          }

        },

      },

      legend: {
        position: 'inset'
      }

    };
  }

});

/*****************************************************************************/
/* SpendTrend: Lifecycle Hooks */
/*****************************************************************************/
Template.SpendTrend.onCreated(function () {
});

Template.SpendTrend.onRendered(function () {
});

Template.SpendTrend.onDestroyed(function () {
});
