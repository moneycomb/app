import React from 'react';
import { Sparklines, SparklinesLine, SparklinesNormalBand, DataProcessor, SparklinesReferenceLine } from 'react-sparklines';

// <SparklinesReferenceLine type="custom" points={[20,20,20,20,20,20,20,30,30,30]} />

export default class SpendTrend extends React.Component {


  render() {

  /*  var min = Math.min.apply(Math, this.props.data);
    var max = Math.max.apply(Math, this.props.data);
    var width = 120;
    var height = 30;
    var margin = 2;
    var limit = null;

    var points = DataProcessor.dataToPoints([max], limit, width, height, margin, max, min);
    var point = points[0];
*/
    return (
      <div class="prettyprint">
        <div>
        <Sparklines data={[5, 10, 5, 20, 8, 15]} limit={5} width={100} height={20} margin={5}>
        </Sparklines>
        </div>

      <Sparklines data={[100,125,115,100,106,103,121,117,100,125,115,100,106,103,121,117,100,125,115,100,106,103,121,117]} width={100} height={20} margin={5}>
        <SparklinesLine />
        <SparklinesReferenceLine />
        <SparklinesNormalBand />
      </Sparklines>
        </div>
    )

  }

}

