import React from 'react';

import {PieChart, Pie, Legend} from 'recharts';


const data = [{name: 'No like', value: 100}, {name: 'Meh', value: 600},
    {name: 'Yeah baby', value: 200}]

export default class SatisfactionChart extends React.Component {
    render() {
        return (
            <div>
                <PieChart width={200} height={60}>
                    <Pie startAngle={180} endAngle={0}
                         data={data}
                         cx={100}
                         cy={50}
                         outerRadius={50}
                         isAnimationActive={false}
                         legendType="star"
                         fill="#848484"
                         />
                </PieChart>
                <i style={{color: 'red'}} className="large frown icon"></i>
                <i style={{color: 'yellow'}} className="large meh icon"></i>
                <i style={{color: 'green'}} className="large smile icon"></i>
            </div>

        );
    }
}

