/*****************************************************************************/
/* QuizDonut: Event Handlers */
/*****************************************************************************/
Template.QuizDonut.events({});

/*****************************************************************************/
/* QuizDonut: Helpers */
/*****************************************************************************/
Template.QuizDonut.helpers({
  "myChartData": function () {

    var MMS = QuizResults.findOne({_id: Session.get("quizId")})

    const columns = MMS.analyze();

    console.log('MMS quiz columns:')
    console.log(columns);


    return {
      /*size: {width: 200, height: 200},*/
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
        columns: columns,
        names: ['Cutting Edge', 'The Warrior', 'The Guru', 'Trendsetter', 'The Good Life'],
        colors: {
          'Cutting Edge': '#FDD835',
          'The Warrior': '#FFB300',
          'The Guru': '#FB8C00',
          'Trendsetter': '#00695C',
          'The Good Life': '#26A69A'
        },
        type: 'donut',
        selection: {
          draggable: false
        }
      },
      donut: {
        title: "",
        width: 40,
        label: {
          format: function (value, ratio, id) {
            return d3.format('%,.0f')(ratio);
          },
          threshold: 0.06
        }
      },
      tooltip: {
        format: {
          title: function (value, ratio, id, index) {
            return id
          },
          value: function (value, ratio, id, index) {
            return d3.format('%,.0f')(ratio);
          },
          contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
            return d
          }
        }
      },
      legend: {
        show: true,
        position: 'bottom'
        /*
         inset: {
         anchor: 'top-left',
         x: 100,
         y: 90,
         step: 5
         }
         ,*/
      }

    }
      ;
  },


})
;

/*****************************************************************************/
/* QuizDonut: Lifecycle Hooks */
/*****************************************************************************/
Template.QuizDonut.onCreated(function () {

});

Template.QuizDonut.onRendered(function () {


});

Template.QuizDonut.onDestroyed(function () {
});
