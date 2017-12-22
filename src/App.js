import React, { Component } from 'react';
import Human from './human'
import AI from './ai'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="row big-title-row">
          <h1 className="big-title">Can you beat AI? Use 1, 2, 3, 4, 5, 6 to control. Refresh to restart.</h1>
        </div>
        <div className="row app-row">
          <div className="col-6 human-container">
            <Human/>
          </div>
          <div className="col-6 ai-container">
            <AI/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
