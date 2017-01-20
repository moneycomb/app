var React = require('react');
import { Cell, RadialBarChart, RadialBar, Legend, PieChart, Pie, Tooltip } from 'recharts';
import { Board } from './Board';


export default SweetSpot = React.createClass({

  displayName: 'Example',

  getInitialState: function() {
    return {
      startDate: moment()
    };
  },

  handleChange: function(date) {
    this.setState({
      startDate: date
    });
  },

  render: function() {

    const data = [
      {name: 'Eating Out', uv: 31.47, pv: 2400, fill: '#8884d8'},
      {name: 'Digital Services', uv: 26.69, pv: 4567, fill: '#83a6ed'},
      {name: 'Recharge', uv: 15.69, pv: 1398, fill: '#8dd1e1'},
      {name: 'Travel', uv: 8.22, pv: 9800, fill: '#82ca9d'},
      {name: 'Shopping', uv: 8.63, pv: 3908, fill: '#a4de6c'},
      {name: 'Entertainment', uv: 2.63, pv: 4800, fill: '#d0ed57'},
    ];

    const data02 = [{name: 'Group A', value: 2400}, {name: 'Group B', value: 4567},
      {name: 'Group C', value: 1398}, {name: 'Group D', value: 9800},
      {name: 'Group E', value: 3908}, {name: 'Group F', value: 4800}];

    const style = {
      top: 0,
      left: 350,
      lineHeight: '24px'
    };

    const COLORS = ['#fdd835','#ffb300','#fb8c00','#00695c','#26a69a','#80cbc4'];

    
    return (
      <div>
      <RadialBarChart width={500} height={300} cx={150} cy={150} innerRadius={20} outerRadius={140} barSize={10} data={data}>
        <RadialBar minAngle={15} label background clockWise={true} dataKey='uv'/>
        <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' wrapperStyle={style}/>
      </RadialBarChart>

        <PieChart width={800} height={400}>
          <Pie data={data02} cx={200} cy={200} innerRadius={50} outerRadius={100} fill="#82ca9d" label>
            {
              data02.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
            }
          </Pie>
          </PieChart>

        <Board/>

        </div>
    );

  }
});
