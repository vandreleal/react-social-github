import React, { Component } from 'react';
import { Github } from 'rehub';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Re<em>Hub</em></h1>

        <Github org="facebook" type="tooltip"></Github>

        <Github org="facebook" type="tooltip" tooltipOnHover={false}></Github>

        <Github org="facebook" type="tooltip" fab={true} fabCorner="top-right"></Github>

        <Github org="facebook" type="tooltip" tooltipOnHover={true} fab={true} iconColor="red" iconWidth={64} iconHeight={64}></Github>

        <Github org="facebook" type="tooltip" tooltipOnHover={true} fab={true} fabCorner="bottom-left" iconColor="orange" iconWidth={48} iconHeight={48}></Github>

        <Github user="facebook" repo="react" type="widget"></Github>

        <Github user="vandreleal" type="widget"></Github>

        <Github user="dungahk" type="link">Profile dungahk</Github>

        <Github user="gustavokatel" type="link">Profile gustavokatel</Github>
      </div>
    );
  }
}

export default App;
