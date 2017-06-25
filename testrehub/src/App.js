import React, { Component } from 'react';
import { Github } from 'rehub';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Re<em>Hub</em></h1>

        <Github org="facebook" presentation="tooltip" tooltipOnHover={true}></Github>

        {/*<Github user="facebook" repo="react" presentation="widget"></Github>*/}

        <Github user="vandreleal" tooltipOnHover={true}></Github>

        <Github user="dungahk" tooltipOnHover={true}></Github>
      </div>
    );
  }
}

export default App;
