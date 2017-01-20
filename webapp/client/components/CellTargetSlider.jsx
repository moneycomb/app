import React, {Component} from 'react';

import Slider from 'react-rangeslider';

export default class CellTargetSlider extends Component {

    constructor() {
        super();
        this._handleChange = this._handleChange.bind(this);

        this.state = {
            value: Number(Session.get("value")) /** Start value **/
        };
    }

    componentDidMount() {
        console.log(this);
        this.state = {
            value: this.props.start /** Start value **/
        };
    }

    componentWillReceiveProps(nextprops) {
        this.setState({
            value: nextprops.start
        });
    }

    _handleChange(value) {

        this.setState({
            value: value
        });

        Session.set("value",value);

    }

    render() {

        const {start, min, max, step}  = this.props;
        

        return (
            <div className="full-width" style={{fontSize:28, fontWeight: 300}}>

                <div><Slider value={this.state.value}
                        min={Number(min)}
                        max={Number(max)}
                             step={step}
                        onChange={this._handleChange}/></div>
            </div>

        )
    }
}
