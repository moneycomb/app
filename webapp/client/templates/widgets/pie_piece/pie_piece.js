/*****************************************************************************/
/* PiePiece: Event Handlers */
/*****************************************************************************/
Template.PiePiece.events({
});

/*****************************************************************************/
/* PiePiece: Helpers */
/*****************************************************************************/
Template.PiePiece.helpers({
  "myChartData": function () {

    if (!this.width) {
      this.width=47;
    }

    return {
      size: {width: this.width, height: this.width},
      data: {
        columns: [
          ['Spent', this.spent],
          ['Target', this.target],

        ],
        colors: {
          'Spent': this.color,
          'Target':'#e8e8e8',
        },

        type: 'pie',
      },
      interaction: {
        enabled: false
      },
      pie: {
        label: {
          show: false
        }
      }
      ,
      legend: {
        show: false
      },

    }
      ;
  },

  this_id: function() {
    return "pie-"+this.id;
  }

});

/*****************************************************************************/
/* PiePiece: Lifecycle Hooks */
/*****************************************************************************/
Template.PiePiece.onCreated(function () {
});

Template.PiePiece.onRendered(function () {
});

Template.PiePiece.onDestroyed(function () {
});
