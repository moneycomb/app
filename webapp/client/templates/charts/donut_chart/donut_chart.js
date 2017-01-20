/* This is based on this library: http://c3js.org/examples.html */

/*****************************************************************************/
/* DonutChart: Event Handlers */
/*****************************************************************************/
Template.DonutChart.events({});

/*****************************************************************************/
/* DonutChart: Helpers */
/*****************************************************************************/
Template.DonutChart.helpers({

  "myChartData": function () {

    return {
      size: {width: this.width},
      /*data: {
       columns: this.data,
       */
      padding: {
        right: 5,
        left: 5,
        top: 5,
        bottom: 5,
      },
      interaction: {
        enabled: false
      },
      data: {
        columns: [
          ['Eating Out', 30],
          ['Digital Services', 120],
          ['Travel', 120],
          ['Recharge', 120],
          ['Entertainment', 120],
          ['Shopping', 120],
          ['Everything Else', 300],

        ],
        colors: {
          'Eating Out': '#ef9a9a',
          'Digital Services': '#64b5f6',
          'Travel': '#b39ddb',
          'Recharge': '#4db6ac',
          'Entertainment': '#ffab91',
          'Shopping': '#ce93d8',
          'Everything Else': '#848484'
        },
        type: 'donut',
        selection: {
          draggable: true
        }
      },
      donut: {
        title: this.title,
        width: 80,
        label: {
          format: function (value, ratio, id) {
            return id+" "+d3.format('%')(ratio);
          },
          threshold: 0.02
        }
      },
      legend: {
        show: false,
        position: 'right'
      }

    }
      ;
  }
})
;


/*****************************************************************************/
/* DonutChart: Lifecycle Hooks */
/*****************************************************************************/
Template.DonutChart.onCreated(function () {
});

Template.DonutChart.onRendered(function () {

});

Template.DonutChart.onDestroyed(function () {
});
