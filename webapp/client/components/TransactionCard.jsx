import React, {Component} from 'react';

import FlipCard from 'react-flipcard';

export default class TransactionCard extends Component {

    constructor() {
        super();

        this.showFront = this.showFront.bind(this);
        this.showBack = this.showBack.bind(this);
        this.handleOnFlip = this.handleOnFlip.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);

    }

    showBack() {
        this.setState({
            isFlipped: true
        });
    }

    showFront() {
        this.setState({
            isFlipped: false
        });
    }

    handleOnFlip(flipped) {
        if (flipped) {
            this.refs.backButton.getDOMNode().focus();
        }
    }

    handleKeyDown(e) {
        if (this.state.isFlipped && e.keyCode === 27) {
            this.showFront();
        }
    }

    render() {

        return (<div style={{backgroundColor: "#ffa000"}}>
            <div className="name"><strong>{this.props.data.name}</strong><small>{this.props.data.amount}</small></div>
            <div>{this.props.data.cell}</div>
        </div>);

        /*
        return (
          <div>
               Default behavior is horizontal flip on hover, or focus
              <FlipCard>
                  {/* The first child is used as the front of the card
                  <div style={{width: 200, height: 300,  borderRadius: 5, backgroundColor: "#ffa000"}}>
                      <h1>Front</h1>
                      <div>This would be the front of the card</div>
                  </div>
                  {/* The second child is used as the back of the card
                  <div style={{width: 200, height: 300,  borderRadius: 5, backgroundColor: "#26926a"}}>
                      <h1>Back</h1>
                      <div>This would be the back of the card</div>
                  </div>
              </FlipCard>
          </div>
        );
    */

    }
}
