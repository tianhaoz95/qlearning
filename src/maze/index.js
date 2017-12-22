import React, { Component } from 'react';
import Cell from './cell';

const task = 3;

function getRandomCoord() {
  return {
    x: getRandomInt(0, 6),
    y: getRandomInt(0, 6)
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

class Maze extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maze: [
        [
          [false, false, false],[false, false, false],[false, false, false],
          [false, false, false],[false, false, false],[false, false, false]
        ],
        [
          [false, false, false],[false, false, false],[false, false, false],
          [false, false, false],[false, false, false],[false, false, false]
        ],
        [
          [false, false, false],[false, false, false],[false, false, false],
          [false, false, false],[false, false, false],[false, false, false]
        ],
        [
          [false, false, false],[false, false, false],[false, false, false],
          [false, false, false],[false, false, false],[false, false, false]
        ],
        [
          [false, false, false],[false, false, false],[false, false, false],
          [false, false, false],[false, false, false],[false, false, false]
        ],
        [
          [false, false, false],[false, false, false],[false, false, false],
          [false, false, false],[false, false, false],[false, false, false]
        ]
      ],
      p: {
        x: 0,
        y: 0,
        t: 0
      },
      complete: 0
    };
    this.moveup = this.moveup.bind(this);
    this.movedown = this.movedown.bind(this);
    this.moveright = this.moveright.bind(this);
    this.moveleft = this.moveleft.bind(this);
    this.pickup = this.pickup.bind(this);
    this.drop = this.drop.bind(this);
  }

  componentDidMount() {
    var prev = this.state.maze;
    var p = getRandomCoord();
    prev[p.x][p.y][0] = true;
    var currp = this.state.p;
    currp.x = p.x;
    currp.y = p.y;
    var t = 0;
    while (t < task) {
      var c1 = getRandomCoord();
      if (!prev[c1.x][c1.y][1] && !prev[c1.x][c1.y][0]) {
        prev[c1.x][c1.y][1] = true;
        t = t + 1;
      }
    }
    var d = 0;
    while (d < task) {
      var c2 = getRandomCoord();
      if (!prev[c2.x][c2.y][1] && !prev[c2.x][c2.y][0] && !prev[c2.x][c2.y][2]) {
        prev[c2.x][c2.y][2] = true;
        d = d + 1;
      }
    }
    this.setState({
      maze: prev,
      p: currp
    });
  }

  componentDidUpdate() {
    if (this.props.onStatusChange && this.state.complete !== undefined) {
      this.props.onStatusChange({
        finished: this.state.complete === task
      });
    }
  }

  moveup() {
    var currp = this.state.p;
    var prev = this.state.maze;
    if (currp.x > 0) {
      prev[currp.x][currp.y][0] = false
      currp.x = currp.x - 1;
      prev[currp.x][currp.y][0] = true
      this.setState({
        p: currp,
        maze: prev
      });
    }
  }

  movedown() {
    var currp = this.state.p;
    var prev = this.state.maze;
    if (currp.x < 5) {
      prev[currp.x][currp.y][0] = false
      currp.x = currp.x + 1;
      prev[currp.x][currp.y][0] = true
      this.setState({
        p: currp,
        maze: prev
      });
    }
  }

  moveright() {
    var currp = this.state.p;
    var prev = this.state.maze;
    if (currp.y < 5) {
      prev[currp.x][currp.y][0] = false
      currp.y = currp.y + 1;
      prev[currp.x][currp.y][0] = true
      this.setState({
        p: currp,
        maze: prev
      });
    }
  }

  moveleft() {
    var currp = this.state.p;
    var prev = this.state.maze;
    if (currp.y > 0) {
      prev[currp.x][currp.y][0] = false
      currp.y = currp.y - 1;
      prev[currp.x][currp.y][0] = true
      this.setState({
        p: currp,
        maze: prev
      });
    }
  }

  pickup() {
    var currp = this.state.p;
    var prev = this.state.maze;
    if (prev[currp.x][currp.y][1]) {
      currp.t = currp.t + 1;
      prev[currp.x][currp.y][1] = false;
      this.setState({
        p: currp,
        maze: prev
      });
    }
  }

  drop() {
    var currp = this.state.p;
    var prev = this.state.maze;
    var complete = this.state.complete;
    if (!prev[currp.x][currp.y][1] && currp.t > 0) {
      if (prev[currp.x][currp.y][2]) {
        var incr = currp.t;
        currp.t = 0;
        complete = complete + incr;
        this.setState({
          p: currp,
          maze: prev,
          complete: complete
        });
      } else {
        currp.t = currp.t - 1;
        prev[currp.x][currp.y][1] = true;
        this.setState({
          p: currp,
          maze: prev
        });
      }
    }
  }

  render() {
    return (
      <div className="maze-container">
        <div className="row cell-row">
          <div className="col-2 cell-container">
            <Cell status={this.state.maze[0][0]}/>
          </div>
          <div className="col-2 cell-container">
            <Cell status={this.state.maze[0][1]}/>
          </div>
          <div className="col-2 cell-container">
            <Cell status={this.state.maze[0][2]}/>
          </div>
          <div className="col-2 cell-container">
            <Cell status={this.state.maze[0][3]}/>
          </div>
          <div className="col-2 cell-container">
            <Cell status={this.state.maze[0][4]}/>
          </div>
          <div className="col-2 cell-container">
            <Cell status={this.state.maze[0][5]}/>
          </div>
        </div>
        <div className="row cell-row">
          <div className="col-2 cell-container">
            <Cell status={this.state.maze[1][0]}/>
          </div>
          <div className="col-2 cell-container">
            <Cell status={this.state.maze[1][1]}/>
          </div>
          <div className="col-2 cell-container">
            <Cell status={this.state.maze[1][2]}/>
          </div>
          <div className="col-2 cell-container">
            <Cell status={this.state.maze[1][3]}/>
          </div>
          <div className="col-2 cell-container">
            <Cell status={this.state.maze[1][4]}/>
          </div>
          <div className="col-2 cell-container">
            <Cell status={this.state.maze[1][5]}/>
          </div>
        </div>
        <div className="row cell-row">
          <div className="col-2 cell-container">
            <Cell status={this.state.maze[2][0]}/>
          </div>
          <div className="col-2 cell-container">
            <Cell status={this.state.maze[2][1]}/>
          </div>
          <div className="col-2 cell-container">
            <Cell status={this.state.maze[2][2]}/>
          </div>
          <div className="col-2 cell-container">
            <Cell status={this.state.maze[2][3]}/>
          </div>
          <div className="col-2 cell-container">
            <Cell status={this.state.maze[2][4]}/>
          </div>
          <div className="col-2 cell-container">
            <Cell status={this.state.maze[2][5]}/>
          </div>
        </div>
        <div className="row cell-row">
          <div className="col-2 cell-container">
            <Cell status={this.state.maze[3][0]}/>
          </div>
          <div className="col-2 cell-container">
            <Cell status={this.state.maze[3][1]}/>
          </div>
          <div className="col-2 cell-container">
            <Cell status={this.state.maze[3][2]}/>
          </div>
          <div className="col-2 cell-container">
            <Cell status={this.state.maze[3][3]}/>
          </div>
          <div className="col-2 cell-container">
            <Cell status={this.state.maze[3][4]}/>
          </div>
          <div className="col-2 cell-container">
            <Cell status={this.state.maze[3][5]}/>
          </div>
        </div>
        <div className="row cell-row">
          <div className="col-2 cell-container">
            <Cell status={this.state.maze[4][0]}/>
          </div>
          <div className="col-2 cell-container">
            <Cell status={this.state.maze[4][1]}/>
          </div>
          <div className="col-2 cell-container">
            <Cell status={this.state.maze[4][2]}/>
          </div>
          <div className="col-2 cell-container">
            <Cell status={this.state.maze[4][3]}/>
          </div>
          <div className="col-2 cell-container">
            <Cell status={this.state.maze[4][4]}/>
          </div>
          <div className="col-2 cell-container">
            <Cell status={this.state.maze[4][5]}/>
          </div>
        </div>
        <div className="row cell-row">
          <div className="col-2 cell-container">
            <Cell status={this.state.maze[5][0]}/>
          </div>
          <div className="col-2 cell-container">
            <Cell status={this.state.maze[5][1]}/>
          </div>
          <div className="col-2 cell-container">
            <Cell status={this.state.maze[5][2]}/>
          </div>
          <div className="col-2 cell-container">
            <Cell status={this.state.maze[5][3]}/>
          </div>
          <div className="col-2 cell-container">
            <Cell status={this.state.maze[5][4]}/>
          </div>
          <div className="col-2 cell-container">
            <Cell status={this.state.maze[5][5]}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Maze;
