import React, {Component} from 'react';
import {render} from 'react-dom';
//import {VictoryStack, VictoryBar, VictoryLabel} from 'victory';

export default class PlanVersusActualChart extends Component {


  render() {

    const plan = this.props.plan;
    const actual = this.props.actual;
    const colors = this.props.colors;

    console.log(plan);
    console.log(actual);

    /*return (
      <svg>

        <VictoryLabel x={0} y={3}
                      textAnchor="left"
                      verticalAnchor="start"
                      style={{fontSize: 20, fontWeight: 300}}
                      >
          {`Your Plan: $${plan.total} (over 30 days)`}
        </VictoryLabel>

        <VictoryLabel x={0} y={72}
                      style={{fontSize: 20, fontWeight: 300}}
                      >
          {`Actual: $${actual.total}`}
        </VictoryLabel>

        <VictoryStack
          horizontal
          padding={0}
          height={80}
          offset={0}
          style={{data: {width: 40}, labels: {fontSize: 18, fontWeight: 300}}}
          colorScale={"qualitative"}>

          <VictoryBar
            data={[
              {x: 2, y: Number(plan.eo), fill: colors.eo},
              {x: 1, y: Number(actual.eo), fill: colors.eo}
            ]}
          />
          <VictoryBar
            data={[
            {x: 2, y: Number(plan.ds), fill: colors.ds},
            {x: 1, y: Number(actual.ds), fill: colors.ds},
              ]}
          />

          <VictoryBar
            data={[
            {x: 2, y: Number(plan.r), fill: colors.r},
            {x: 1, y: Number(actual.r), fill: colors.r},
              ]}
          />

          <VictoryBar
            data={[
            {x: 2, y: Number(plan.t), fill: colors.t},
            {x: 1, y: Number(actual.t), fill: colors.t},
              ]}
          />

          <VictoryBar
            data={[
            {x: 2, y: Number(plan.e), fill: colors.e},
            {x: 1, y: Number(actual.e), fill: colors.e},
              ]}
          />

          <VictoryBar
            data={[
            {x: 2, y: Number(plan.s), fill: colors.s},
            {x: 1, y: Number(actual.s), fill: colors.s},
              ]}
          />

        </VictoryStack>

      </svg>
    );*/
    return <h1>Yoyo</h1>
  }
}
