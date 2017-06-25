import React, { Component } from 'react';
import { Github } from 'react-social-github';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <h1>React Social Github</h1>

        <div className="app-item">
          <h2>Inline Link Tooltip</h2>
          <Github user="gustavokatel" type="link">Hover Here</Github>
        </div>

        <div className="app-item">
          <h2>Icon Tooltip</h2>
          <Github user="higorernandes" type="tooltip"></Github>
        </div>

        <div className="app-item">
          <h2>Widget</h2>
          <Github org="facebook" type="tooltip" fab={true} fabCorner="top-right"></Github>
        </div>

        <Github org="google" type="tooltip" tooltipOnHover={true} fab={true} iconColor="red" iconWidth={64} iconHeight={64}></Github>

        <Github org="twitter" type="tooltip" tooltipOnHover={true} fab={true} fabCorner="bottom-left" iconColor="orange" iconWidth={48} iconHeight={48}></Github>

        <Github user="facebook" repo="react"></Github>
      </div>
    );
  }
}

export default App;
