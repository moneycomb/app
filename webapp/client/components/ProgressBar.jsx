import React, {Component} from 'react';
import {Line} from 'rc-progress';

export default class CProgressBar extends Component {

    render() {

        let {color, value, total, width } = this.props;
        let pct = parseFloat(Number(value) / Number(total) * 100).toFixed(0);

        if (pct > 100) {
            color = "#FF4081";
            pct = 100;
        }

        if (width == undefined ) { width = 6;  }


        return (
            <Line percent={pct} strokeWidth={width} trailWidth={width} strokeColor={color}/>
        )

    }
}
