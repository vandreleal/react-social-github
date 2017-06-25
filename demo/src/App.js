import React, { Component } from 'react';
import { Github } from 'react-social-github';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>React Social Github</h1>

        <Github user="gustavokatel" type="link">Profile</Github>

        <Github org="facebook" type="tooltip" fab={true} fabCorner="top-right"></Github>

        <Github org="google" type="tooltip" tooltipOnHover={true} fab={true} iconColor="red" iconWidth={64} iconHeight={64}></Github>

        <Github org="twitter" type="tooltip" tooltipOnHover={true} fab={true} fabCorner="bottom-left" iconColor="orange" iconWidth={48} iconHeight={48}></Github>

        <Github user="facebook" repo="react"></Github>

        <Github user="higorernandes" type="widget"></Github>
      </div>
    );
  }
}

export default App;
