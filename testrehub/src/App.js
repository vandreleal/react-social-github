import React, { Component } from 'react';
import { Github } from 'rehub';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Re<em>Hub</em></h1>

        <Github org="hackbit"></Github>

        {/*<Github user="vandreleal"></Github>*/}

        {/*<Github user="GustavoKatel" repo="clementine-info" presentation="widget"></Github>*/}

        {/*<Github user="dungahk"></Github>*/}
      </div>
    );
  }
}

export default App;
