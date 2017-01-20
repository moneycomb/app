import React, {Component} from 'react';

export default class GoalStatement extends Component {


  render() {

    const amount = this.props.amount;
    const by = this.props.by;
    const period = this.props.period;
    const purpose = this.props.purpose;

    let time_phrase = "every";

    if (by != undefined){
      time_phrase = "by";
    }

    return (
      <div>
        <span>"I want to save </span>
        <span>${amount} </span>
        <span>{time_phrase} </span>
        <span>{period} </span>
        <span>for </span>
        <span>{purpose}"</span>
       </div>
    );
  }
}
