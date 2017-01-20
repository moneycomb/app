import React, { Component } from 'react';
import { HexGrid } from 'react-hexgrid';

export default class Board extends Component {
  constructor(props) {
    super(props);
    let grid = HexGrid.generate(config.board);
    this.props.actions.createBoard(grid);
  }

  render() {
    let { grid, actions } = this.props;
    let config = {
      width: 800, height: 800,
      layout: { width: 10, height: 10, flat: true, spacing: 1.1 },
      origin: { x: 0, y: 0 },
      map: 'hexagon',
      mapProps: [ 2 ]
    }
    return (
      <HexGrid actions={actions} width={config.width} height={config.height}
               hexagons={grid.hexagons} layout={grid.layout} />
    )
  }
}
