import React, { Component } from 'react';

export default class CellDot extends Component {

  render() {
    const { cell } = this.props.data;
    const color = "#ffa000";

    console.log(this.props.data);

    return <a style={{backgroundColor: color}} className="ui empty circular label"></a>;

  }
}
