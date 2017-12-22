import React, { Component } from 'react';
import Maze from '../maze';

class AI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      time: 0,
    }
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.mazeref = null;
    this.interval = null;
  }

  componentDidMount() {
    var thisc = this;
    this.interval = setInterval(function () {
      var prevt = thisc.state.time;
      thisc.setState({
        time: prevt + 1
      });
    }, 1000);
  }

  handleStatusChange(status) {
    if (status !== undefined && status !== null) {
      if (status.finished !== this.state.finished) {
        this.setState({
          finished: status.finished
        });
      }
      if (status.finished) {
        clearInterval(this.interval);
      }
    }
  }

  render() {
    return (
      <div>
        <h4 className="ai-title">
          AI, {this.state.finished ? ("Finished") : ("Not Finished")}, Time: {this.state.time} sec
        </h4>
        <Maze onStatusChange={this.handleStatusChange} ref={(ref) => this.mazeref = ref}/>
      </div>
    );
  }
}

export default AI;
