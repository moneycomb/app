
import React, { Component } from 'react';

export default class TDate extends Component {

  render() {
    const { date } = this.props.data;

    console.log(date);

    return <h5>{date}</h5>;

  }
}
