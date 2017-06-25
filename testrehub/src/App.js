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

        <Github org="facebook" type="tooltip" iconColor="orange" iconWidth="96" iconHeight="96" style={{ position:'fixed', right: 10, top: 50 }}></Github>

        <Github org="facebook" type="tooltip" tooltipOnHover={true} fab={true} iconColor="red" iconWidth={64} iconHeight={64}></Github>

        <Github org="facebook" type="tooltip" tooltipOnHover={true} fab={true} fabCorner="bottom-left" iconColor="orange" iconWidth={48} iconHeight={48}></Github>

        {/*<Github user="facebook" repo="react" type="widget"></Github>*/}

        <Github user="vandreleal" type="widget"></Github>

        <Github user="dungahk" text="Profile" type="link"></Github>

        <Github user="gustavokatel" text="Profile" type="link"></Github>
      </div>
    );
  }
}

export default App;
