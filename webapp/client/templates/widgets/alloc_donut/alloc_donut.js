/*****************************************************************************/
/* AllocDonut: Event Handlers */
/*****************************************************************************/
Template.AllocDonut.events({});

/*****************************************************************************/
/* AllocDonut: Helpers */
/*****************************************************************************/
Template.AllocDonut.helpers({
  "myChartData": function () {

    var FP = FinancialProfile.findOne({userId: Meteor.userId()});
    var Al = Allocations.findOne({userId: Meteor.userId()});

    var monthlyGI = (FP.gross_income()/365) * 30;
    var totalTarget = Al.targetMoneyPot();


    var X = [
      ['eo', Al.eo.target],
      ['ds', Al.ds.target],
      ['r', Al.r.target],
      ['t', Al.t.target],
      ['e', Al.e.target],
      ['s', Al.s.target],
      ['Everything Else', monthlyGI - totalTarget],
    ]


    const ccolors = MoneyComb.cellcolor();
    ccolors['Everything Else']='#5FB7E5';


    return {
      size: {width: 300, height: 300},
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
        enabled: true
      },
      data: {
        columns: X,
        names: MoneyComb.cellnames(),
        colors: ccolors,
        type: 'donut',
        selection: {
          draggable: false
        },
        onclick: function (d,element) {
         
          if (d.id == "Everything Else") {
            Router.go('/moneypot');
          } else {
            Router.go('/cells/' + d.id);
          }
        }
      },
      donut: {
        title: "",
        width: 45,
        label: {
          format: function (value, ratio, id) {
            /* return id + " " + d3.format('%')(ratio);    return the percentage as well */
            return d3.format('$,.0f')(value);
          },
          threshold: 0.05
        }
      },
      tooltip: {
        format: {
          title: function (x) { return '30 day target'},
          value: function (value, ratio, id, index) { return d3.format('$,.0f')(value); },
          contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
            return d
          }

        }
      },
      legend: {
        show: true,
        position: 'inset',
        inset: {
          anchor: 'top-left',
          x: 95,
          y: 62,
          step: 7
        },
        label: {
          format: function (value, ratio, id) {
            /* return id + d3.format('%,.0f')(ratio);*/
            return id;
          }
        }
      }

    };
  },


  adjustedTotal: function() {

    d3.select("svg")
      .append("text")
      .attr("id", "b")
      .attr("x",200)
      .attr("y",200)
      .style("opacity", 0)
      .text("$2350");
  }

});

/*****************************************************************************/
/* AllocDonut: Lifecycle Hooks */
/*****************************************************************************/
Template.AllocDonut.onCreated(function () {

});

Template.AllocDonut.onRendered(function () {


});

Template.AllocDonut.onDestroyed(function () {
});
