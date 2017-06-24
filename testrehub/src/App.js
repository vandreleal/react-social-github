import React, { Component } from 'react';
import { Github } from 'rehub';
import logo from './logo.svg';
import './App.css';
import { BeakerIcon } from 'react-octicons';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>ReHub<BeakerIcon /></h1>

        <Github org="hackbit"></Github>

        <Github user="vandreleal"></Github>
        <Github user="dungahk"></Github>
      </div>
    );
  }
}

export default App;
