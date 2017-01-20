/*****************************************************************************/
/* Ssbar: Event Handlers */
/*****************************************************************************/
Template.SSWidget.events({
});

/*****************************************************************************/
/* Ssbar: Helpers */
/*****************************************************************************/
Template.SSWidget.helpers({
  ssStart: function() {
    //ssstart=90 ssend=110 mstart=40 mend=150
    if (this.ssstart == undefined ) this.ssstart = 80;
    let x = this.ssstart
    const max = 615;
    const min = 11;
    return parseFloat(min+(x/200)*max).toFixed(0);
  },
  
  ssWidth: function() {

    if (this.ssend == undefined ) this.ssend = 120;
    if (this.ssstart == undefined ) this.ssstart = 80;
    let x = this.ssend
    const max = 615;
    const min = 11;

    let endpos = parseFloat(min+(x/200)*max).toFixed(0)
    let startpos = parseFloat(min+(this.ssstart/200)*max).toFixed(0)
    return (endpos-startpos);
  },

  middleStart: function () {
    if (this.mstart == undefined ) this.mstart = 50;
    let x = this.mstart
    const max = 615;
    const min = 11;
    return parseFloat(min+(x/200)*max).toFixed(0);
  },
  
  middleWidth: function () {
    if (this.mend == undefined ) this.mend = 150;
    if (this.mstart == undefined ) this.mstart = 50;
    let x = this.mend;
    const max = 615;
    const min = 11;

    let endpos = parseFloat(min+(x/200)*max).toFixed(0)
    let startpos = parseFloat(min+(this.mstart/200)*max).toFixed(0)
    return (endpos-startpos);

  },
  
  currentPos: function () {
    if (this.current == undefined ) this.current = 100;
    if (this.current >  200) this.current = 200
    const max = 595;
    const min = 20;
    return parseFloat(min+(this.current/200)*max).toFixed(0);
  },
  
  previousPos: function () {
    if (this.current == undefined ) this.current = 100;
    if (this.previous == undefined ) this.previous = this.current;
    if (this.previous >  200) this.previous = 200
    const max = 595;
    const min = 20;
    return parseFloat(min+(this.previous/200)*max).toFixed(0);
  },
  
  actualStart: function() {
    return 164;
  },
  
  actualWidth: function () {
    return 284;
  }

});

/*****************************************************************************/
/* Ssbar: Lifecycle Hooks */
/*****************************************************************************/
Template.SSWidget.onCreated(function () {
});

Template.SSWidget.onRendered(function () {
  $('.sswidget')
    .popup()
  ;

});

Template.SSWidget.onDestroyed(function () {
});
