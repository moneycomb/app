/*****************************************************************************/
/* Speedometer: Event Handlers */
/*****************************************************************************/
Template.Speedometer.events({
});

/*****************************************************************************/
/* Speedometer: Helpers */
/*****************************************************************************/
Template.Speedometer.helpers({
  curSpeed: function() {

    let SS = this.speed;

    if (SS>166) { SS=166;};  // set limit;
    // convert to percentage
    let pct = SS/166;
    let el = d3.select('.chart-gauge');

    Template.instance().needle.animateOn(el,pct);
  }
});

/*****************************************************************************/
/* Speedometer: Lifecycle Hooks */
/*****************************************************************************/
Template.Speedometer.onCreated(function () {
});

Template.Speedometer.onRendered(function () {

  // incoming percent from SpendStatus template
  var SS = this.data.speed;
  if (SS>166) { SS=166;};  // set limit;
  // convert to percentage
  let pct = SS/166;

  // Code credit: http://codepen.io/jaketrent/pen/eloGk

    var Needle, arc, arcEndRad, arcStartRad, barWidth, chart, chartInset, degToRad, el, endPadRad, height, i, margin, needle, numSections, padRad, percToDeg, percToRad, percent, radius, ref, sectionIndx, sectionPerc, startPadRad, svg, totalPercent, width;
    percent = pct;
    barWidth = 10;
    numSections = 5;
    sectionPerc = 1 / numSections / 2;
    padRad = 0.05;
    chartInset = 10;
    totalPercent = 0.75;
    el = d3.select('.chart-gauge');
    margin = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
    width = el[0][0].offsetWidth - margin.left - margin.right;
    height = width;
    radius = Math.min(width, height) / 2;
    percToDeg = function (perc) {
      return perc * 360;
    };
    percToRad = function (perc) {
      return degToRad(percToDeg(perc));
    };
    degToRad = function (deg) {
      return deg * Math.PI / 180;
    };
    svg = el.append('svg').attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom);
    chart = svg.append('g').attr('transform', 'translate(' + (width + margin.left) / 2 + ', ' + (height + margin.top) / 2 + ')');
    for (sectionIndx = i = 1, ref = numSections; 1 <= ref ? i <= ref : i >= ref; sectionIndx = 1 <= ref ? ++i : --i) {
      //if (window.CP.shouldStopExecution(1)) {
      //  break;
      //}
      arcStartRad = percToRad(totalPercent);
      arcEndRad = arcStartRad + percToRad(sectionPerc);
      totalPercent += sectionPerc;
      startPadRad = sectionIndx === 0 ? 0 : padRad / 2;
      endPadRad = sectionIndx === numSections ? 0 : padRad / 2;
      arc = d3.svg.arc().outerRadius(radius - chartInset).innerRadius(radius - chartInset - barWidth).startAngle(arcStartRad + startPadRad).endAngle(arcEndRad - endPadRad);
      chart.append('path').attr('class', 'arc chart-color' + sectionIndx).attr('d', arc);
    }
    // window.CP.exitedLoop(1);
    Needle = function () {
      function Needle(len, radius1) {
        this.len = len;
        this.radius = radius1;
      }
      Needle.prototype.drawOn = function (el, perc) {
        el.append('circle').attr('class', 'needle-center').attr('cx', 0).attr('cy', 0).attr('r', this.radius);
        return el.append('path').attr('class', 'needle').attr('d', this.mkCmd(perc));
      };
      Needle.prototype.animateOn = function (el, perc) {
        var self;
        self = this;
        return el.transition().delay(500).ease('elastic').duration(2000).selectAll('.needle').tween('progress', function () {
          return function (percentOfPercent) {
            var progress;
            progress = percentOfPercent * perc;
            return d3.select(this).attr('d', self.mkCmd(progress));
          };
        });
      };
      Needle.prototype.mkCmd = function (perc) {
        var centerX, centerY, leftX, leftY, rightX, rightY, thetaRad, topX, topY;
        thetaRad = percToRad(perc / 2);
        centerX = 0;
        centerY = 0;
        topX = centerX - this.len * Math.cos(thetaRad);
        topY = centerY - this.len * Math.sin(thetaRad);
        leftX = centerX - this.radius * Math.cos(thetaRad - Math.PI / 2);
        leftY = centerY - this.radius * Math.sin(thetaRad - Math.PI / 2);
        rightX = centerX - this.radius * Math.cos(thetaRad + Math.PI / 2);
        rightY = centerY - this.radius * Math.sin(thetaRad + Math.PI / 2);
        return 'M ' + leftX + ' ' + leftY + ' L ' + topX + ' ' + topY + ' L ' + rightX + ' ' + rightY;
      };
      return Needle;
    }();
    this.needle = new Needle(70, 5);
    this.needle.drawOn(chart, 0);
    this.needle.animateOn(chart, percent);


});

Template.Speedometer.onDestroyed(function () {
});
