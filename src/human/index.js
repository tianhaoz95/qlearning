import React, { Component } from 'react';
import Maze from '../maze';
import _ from 'lodash';

class Human extends Component {
  constructor(props) {
      super(props);
      this.state = {
        finished: false,
        time: 0,
        finish_cnt: 0,
        total_time: 0
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
    console.log(status);
    if (status) {
      if (status.finished) {
        var prev_total = this.state.total_time;
        var curr_time = this.state.time;
        var prev_cnt = this.state.finish_cnt;
        clearInterval(this.interval);
        this.interval = null;
        this.mazeref.resetmaze();
        this.setState({
          time: 0,
          total_time: prev_total + curr_time,
          finish_cnt: prev_cnt + 1,
          finished: false
        });
        var thisc = this;
        this.interval = setInterval(function () {
          var prevt = thisc.state.time;
          thisc.setState({
            time: prevt + 1
          });
        }, 1000);
      }
    }
  }

  render() {
    return (
      <div>
        <h4 className="human-title">
          Human, {this.state.finished ? ("Finished") : ("Not Finished")}, Time: {this.state.time} sec.
          Finished {this.state.finish_cnt} times. Average time to completion: {Math.round(this.state.total_time/this.state.finish_cnt)} sec.
        </h4>
        <Maze onStatusChange={this.handleStatusChange} ref={(ref) => this.mazeref = ref}/>
      </div>
    );
  }
}

export default Human;
