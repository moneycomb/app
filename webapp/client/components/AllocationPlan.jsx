import React, {Component} from 'react';
import {render} from 'react-dom';
import { Cell, Legend, PieChart, Pie} from 'recharts';

export default class AllocationsPlan extends Component {

  constructor() {
    super();

  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextprops) {

  }



  render() {

    let data = [
      {name: `Eating Out`, value: 100},
      {name: `Eating Out`, value: 100},
      {name: `Eating Out`, value: 100},
      {name: `Eating Out`, value: 100},
      {name: `Eating Out`, value: 100}];

    let colorScale = ['#fdd835','#ffb300','#fb8c00','#00695c','#26a69a','#80cbc4'];

    console.log(data);
    console.log(colorScale);


    return (
      <div>
        <PieChart width={300} height={300}>
          <Pie isAnimationActive={true} data={this.props.data} cx={150} cy={150} innerRadius={70} outerRadius={140} fill="#82ca9d">
            {
              data.map((entry, index) => <Cell fill={colorScale[index % colorScale.length]}/>)
            }
          </Pie>
         
        </PieChart>
      </div>
    );

  }

}

