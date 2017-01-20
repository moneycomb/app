/*****************************************************************************/
/* IncomeAllocation: Event Handlers */
/*****************************************************************************/
Template.IncomeAllocation.events({
});

/*****************************************************************************/
/* IncomeAllocation: Helpers */
/*****************************************************************************/
Template.IncomeAllocation.helpers({

  "myChartData": function() {

    return {
      size: {
        width: 210
      },

      data: {
        columns: [
          ['Taxes',.30],
          ['Fixed',.34],
          ['Discretionary',.36],
        ],
        type: 'pie',
        colors: {
          Taxes: '#D8D8D8',
          Discretionary: '#ED562E',
          Fixed: '#D8D8D8'
        },
      },

      pie: {
        label: {
          format: function (value, ratio, id) {
            return d3.format('%')(value);
          }
        }
      },

      legend: {
        position: 'inset'
      }

    };
  }

});

/*****************************************************************************/
/* IncomeAllocation: Lifecycle Hooks */
/*****************************************************************************/
Template.IncomeAllocation.onCreated(function () {
});

Template.IncomeAllocation.onRendered(function () {
});

Template.IncomeAllocation.onDestroyed(function () {
});
