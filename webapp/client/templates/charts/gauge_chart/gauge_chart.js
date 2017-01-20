/*****************************************************************************/
/* GaugeChart: Event Handlers */
/*****************************************************************************/
Template.GaugeChart.events({
});

/*****************************************************************************/
/* GaugeChart: Helpers */
/*****************************************************************************/
Template.GaugeChart.helpers({

  "myChartData": function () {

    let target = this.target;
    let spent = this.spent;

    console.log(spent);
    console.log(target);

    if (spent>target) {
      var maximum = spent*1.2;
    } else {
      var maximum = target*1.33;
    }


    return {
      data: {
        columns: [
          ['Spent', this.spent],
          ['Total Target', this.target]
        ],
        type: 'gauge',
        onclick: function (d, i) {
          console.log("onclick", d, i);
        },
        onmouseover: function (d, i) {
          console.log("onmouseover", d, i);
        },
        onmouseout: function (d, i) {
          console.log("onmouseout", d, i);
        }
      },
      gauge: {
        label: {
            format: function(value, ratio) {
                return "$"+value;           },
//            show: false // to turn off the min/max labels.
        },
      min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
      max: maximum, // 100 is default
//    units: ' %',
//    width: 39 // for adjusting arc thickness
      },

      legend: {
        show: true,
        position: 'bottom'
      },

      color: {
        pattern: ['#FFA000', '#F97600', '#F6C600', '#26a69a'], // the three color levels for the percentage values.
        threshold: {
//            unit: 'value', // percentage is default
//            max: 200, // 100 is default
          values: [spent, target, target*1.2]
        }
      },
      size: {
        height: 120
      }
    }
  }

});

/*****************************************************************************/
/* GaugeChart: Lifecycle Hooks */
/*****************************************************************************/
Template.GaugeChart.onCreated(function () {
});

Template.GaugeChart.onRendered(function () {
});

Template.GaugeChart.onDestroyed(function () {
});

