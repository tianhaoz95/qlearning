import React, { Component } from 'react';

class Cell extends Component {
  render() {
    return (
      <div className="cell">
        {this.props.status[0] ? (<i className="fa fa-car fa-2x cell-icon" aria-hidden="true"></i>) : (null)}
        {this.props.status[1] ? (<i className="fa fa-cube fa-2x cell-icon" aria-hidden="true"></i>) : (null)}
        {this.props.status[2] ? (<i className="fa fa-cutlery fa-2x cell-icon" aria-hidden="true"></i>) : (null)}
      </div>
    );
  }
}

export default Cell;
