import React, {Component} from 'react';
import {render} from 'react-dom';
import { Cell, Legend, PieChart, Pie, Tooltip } from 'recharts';

export default class AllocationsPie extends Component {

  constructor() {
    super();

    this.state = {
      value: Number(Session.get("value"))
    };
  }

  componentDidMount() {
    console.log(this);
    // const data = this.props.data;
    const {colors, allocated, remaining, value, cell} = this.props;

    this.state = {
      value: Number(value),
      allocated: Number(allocated),
      remaining: Number(remaining),
      cell: cell,
      color: colors[cell]
    };
  }

  componentWillReceiveProps(nextprops) {

    this.setState({
      value: nextprops.value,
      allocated: nextprops.allocated,
      remaining: nextprops.remaining,
      cell: nextprops.cell,
      color: nextprops.colors[nextprops.cell]
    });
  }

  /*
  render() {

    let data = [];
    let colorScale = [];

    if (this.state.allocated != 0) {
      //if we already have an allocation, show the pie slice. if not, don't
      data.push({x: `$${this.state.allocated} allocated`, y: this.state.allocated, fill: "#424242"});
      colorScale.push("#848484");
    }

    colorScale.push(this.state.color);
    colorScale.push("#eeeeee");

    data.push({x: `$${this.state.value}`, y: this.state.value, fill: this.state.color});
    data.push({x: `$${this.state.remaining} left`, y: this.state.remaining, fill: "#ffa000"});

    /*return (
      <VictoryPie innerRadius={100} data={data}
                  colorScale={colorScale}
      />
    );
    return <h1>Yo</h1>



  }*/

  render() {

    let data = [];
    let colorScale = [];

    if (this.state.allocated != 0) {
      //if we already have an allocation, show the pie slice. if not, don't
      data.push({name: `$${this.state.allocated} allocated`, value: this.state.allocated});
      colorScale.push("#848484");
    }

    colorScale.push(this.state.color);
    colorScale.push("#eeeeee");


    data.push({name: `$${this.state.value}`, value: this.state.value});
    data.push({name: `$${this.state.remaining} left`, value: this.state.remaining});

    console.log(data);
    console.log(colorScale);


    /* const COLORS = ['#fdd835','#ffb300','#fb8c00','#00695c','#26a69a','#80cbc4']; */


    return (
      <div>
        <PieChart width={220} height={220}>
          <Pie isAnimationActive={false} data={data} cx={110} cy={110} innerRadius={50} outerRadius={100} fill="#82ca9d">
            {
              data.map((entry, index) => <Cell fill={colorScale[index % colorScale.length]}/>)
            }
          </Pie>
        </PieChart>
      </div>
    );

  }




}

