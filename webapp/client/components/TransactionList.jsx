import React, {Component} from 'react';
import {MeteorGriddle} from 'meteor/utilities:meteor-griddle';
import TransactionCard from './TransactionCard';
import CellDot from './CellDot';
import TDate from './TDate';

export default class TransactionList extends Component {

  constructor() {
    super();

    /*this.showFront = this.showFront.bind(this);
     this.showBack = this.showBack.bind(this);
     this.handleOnFlip = this.handleOnFlip.bind(this);
     this.handleKeyDown = this.handleKeyDown.bind(this);

     this.state = {
     isFlipped: false
     };
     */
  }

  render() {


    const columnMeta = [
      {
        "columnName": "cell",
        "order": 1,
        "locked": false,
        "visible": true,
        "customComponent": CellDot
      },

      {
        "columnName": "date",
        "visible": true,
        "customComponent": TDate
      },

    ];

    return (
      <MeteorGriddle
        publication="transactionsG"
        collection={Transactions}
        tableClassName="ui celled table"
        matchingResultsCount="matching-transactions"
        useGriddleStyles={true}
        useCustomRowComponent={false}
        useCustomGridComponent={false}
        resultsPerPage={10}
        customGridComponentClassName="ui five cards"
        customRowComponentClassName="ui card"
        customRowComponent={TransactionCard}
        columnMetadata={columnMeta}
        bodyHeight={800}
        noDataMessage={"No Transactions Found."}
        columns={["cell", "name", "amount", "date"]}
        filteredFields={["name", "description", "amount", "cell", "date"]}
        showFilter
      />
    );
  }
}


/*  enableInfiniteScroll={true}
 *
 *    resultsPerPage={5}
 *
 *    enableInfiniteScroll={true}
 *    */
