import React, { Component } from 'react';

export default class ActivityCounter extends Component {

  // props:
  // total = total number of dots
  // color = color of the dots
  // used = used number of dots

  render() {

    var renderStr = "";
    const { used, total, color } = this.props;

    for (let i=0; i < total; i++) {
      renderStr +=  <a className='ui blue empty circular label'></a>;
    }

    // <a style="color: {{color}};" class="ui empty circular label"></a>


    return (
      <div>
        {renderStr}
        <a className='ui blue empty circular label'></a>
          <a className='ui blue empty circular label'></a>
            <a className='ui blue empty circular label'></a>
        <a className='ui blue empty circular label'></a>
        <a className='ui blue empty circular label'></a>
        <a className='ui blue empty circular label'></a>
        <a className='ui blue empty circular label'></a>
      </div>
    )
  }
}

/*
 Template.ActivityCounter.helpers({
 dots: function() {
 let d = [];
 for (let i=0; i<this.total; i++) {
 if (i<this.used) { d[i]=true; } else { d[i]=false; }
 }
 return d;
 }
 });
 */
