import React, { Component } from 'react';
import { Github } from 'rehub';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>ReHub</h1>

        <Github org="hackbit"></Github>

        <Github user="vandreleal"></Github>
      </div>
    );
  }
}

export default App;
