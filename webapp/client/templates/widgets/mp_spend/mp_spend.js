/*****************************************************************************/
/* MPSpend: Event Handlers */
/*****************************************************************************/
Template.MPSpend.events({
});

/*****************************************************************************/
/* MPSpend: Helpers */
/*****************************************************************************/
Template.MPSpend.helpers({


  "myChartData": function() {

    var range = MoneyComb.dateRange(this.sDate,this.eDate,7);

    var spending = this.spend;

    return {
      //size: {
      //  width: 400
      //},
      point: {
        r: 4,
        focus: {
          expand: {
            enabled: false
          }
        },
        show: false,
      },
      grid: {
        x: {
          show: false
        },
        y: {
          show: true
        }
      },
      //regions: [
      //  {axis: 'x', start: '2015-12-15', end: '2015-12-24', class: 'red'},
      //],
      data: {
        x: 'x',
        // xFormat: '%Y%m%d',
        columns: [
          //['Target'].concat(target),
          ['MPSpend'].concat(spending),
          ['x'].concat(range),
        ],

        colors: {
          'Target': this.color,
          'MPSpend': this.color,
        },


        type: 'area-spline'
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%m/%d'
          }
        },
        y: {
          //label: {
          //  text: 'MoneyComb Allocation',
          //  position: 'outer-middle'
          //},
          tick: {
            format: d3.format("%") // ADD
          }
        },

      },

      legend: {
        position: 'bottom'
      }

    };
  }

});

/*****************************************************************************/
/* MPSpend: Lifecycle Hooks */
/*****************************************************************************/
Template.MPSpend.onCreated(function () {
});

Template.MPSpend.onRendered(function () {
});

Template.MPSpend.onDestroyed(function () {
});
