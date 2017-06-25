import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'whatwg-fetch';

import ReactMarkdown from 'react-markdown';

class App extends Component {

  constructor() {
    super();

    this.state = {
      markdown: '# Loading'
    };
  }

  componentWillMount() {

    window.fetch('/README.md')
    .then(response => {
      return response.text()
    })
    .then(data => {

      console.log('data');
      this.setState({
        markdown: data
      });

    })
    .catch(err => {
      console.log('Could not load');
      this.setState({
        markdown: 'Could not load'
      });
    });

  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <ReactMarkdown source={this.state.markdown} />,

      </div>
    );
  }
}

export default App;
