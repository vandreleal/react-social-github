import React, { Component } from 'react';
import { Github } from 'react-social-github';
import './App.css';
import './github-markdown.css';
import 'whatwg-fetch';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import ReactMarkdown from 'react-markdown';

import Playground from './Playground';

class App extends Component {

  constructor(props) {
    super(props);
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
      <MuiThemeProvider>
        <div className="app">

        <ReactMarkdown source={'# Playground'} className="markdown-body" />

          <Playground className="playground" />

          <ReactMarkdown source={this.state.markdown} className="markdown-body" />

          <Github org="facebook" repo="react" type="button" tooltipOnHover={true} fab={true}></Github>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
