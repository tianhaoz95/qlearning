import React, { Component } from 'react';
import Maze from '../maze';
import _ from 'lodash';

class Human extends Component {
  constructor(props) {
      super(props);
      this.state = {
        finished: false,
        time: 0,
      }
      this.mazeref = null;
      this.interval = null;
      this.handleKey = this.handleKey.bind(this);
      var rlist = _.shuffle(["1", "2", "3", "4", "5", "6"])
      this.dict = {
        "1": rlist[0],
        "2": rlist[1],
        "3": rlist[2],
        "4": rlist[3],
        "5": rlist[4],
        "6": rlist[5]
      }
      this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keyup", this.handleKey)
    var thisc = this;
    this.interval = setInterval(function () {
      var prevt = thisc.state.time;
      thisc.setState({
        time: prevt + 1
      });
    }, 1000);
  }

  handleKey(e) {
    if (e.key in this.dict) {
      var keyName = this.dict[e.key];
      if (keyName === "1") {
        this.mazeref.moveup();
      }
      if (keyName === "2") {
        this.mazeref.movedown();
      }
      if (keyName === "3") {
        this.mazeref.moveright();
      }
      if (keyName === "4") {
        this.mazeref.moveleft();
      }
      if (keyName === "5") {
        this.mazeref.pickup();
      }
      if (keyName === "6") {
        this.mazeref.drop();
      }
    }
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
        <h4 className="human-title">
          Human, {this.state.finished ? ("Finished") : ("Not Finished")}, Time: {this.state.time} sec
        </h4>
        <Maze onStatusChange={this.handleStatusChange} ref={(ref) => this.mazeref = ref}/>
      </div>
    );
  }
}

export default Human;
