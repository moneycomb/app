/*****************************************************************************/
/* PieChart: Event Handlers */
/*****************************************************************************/
Template.PieChart.events({
});

/*****************************************************************************/
/* PieChart: Helpers */
/*****************************************************************************/
Template.PieChart.helpers({

  "myChartData": function () {

    if (!this.width) {
      this.width=200;
    }

    return {
      size: {width: this.width, height: this.width},
      data: {
        columns: [
          ['Gross Income', this.income],
          ['Spending Target', this.mpspend],

        ],
        colors: {
          'Gross Income': '#cfd8dc',
          'Spending Target':'#FFA000',
        },

        type: 'pie',
      },
      pie: {
        title: "Percentage of Spending",
        width: 60,
        label: {
          format: function (value, ratio, id) {
            return d3.format('%')(ratio);
          }
        }
      }
      ,
      legend: {
       show: true
      },

    }
      ;
  }



});

/*****************************************************************************/
/* PieChart: Lifecycle Hooks */
/*****************************************************************************/
Template.PieChart.onCreated(function () {
});

Template.PieChart.onRendered(function () {
});

Template.PieChart.onDestroyed(function () {
});
