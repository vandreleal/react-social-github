import React, { Component } from 'react';
import { Github } from 'react-social-github';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import ReactMarkdown from 'react-markdown';
import Playground from './Playground';

import './App.css';
import 'whatwg-fetch';

import { blue700, blue400, grey300, lightBlue300, lightBlue200, lightBlue100, darkBlack, fullBlack } from 'material-ui/styles/colors';
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blue700,
    primary2Color: blue400,
    primary3Color: grey300,
    accent1Color: lightBlue300,
    accent2Color: lightBlue200,
    accent3Color: lightBlue100,
    textColor: darkBlack,
    shadowColor: fullBlack
  }
});

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      markdown: '# Loading'
    };
  }

  componentWillMount() {

    window.fetch(process.env.PUBLIC_URL +'/README.md')
      .then(response => {
        return response.text()
      })
      .then(data => {
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
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="app">

          <div className="app-wrapper">

          <ReactMarkdown
            className="markdown-body"
            source={'# React Social Github'}
          />

            <Playground className="playground" />

            <ReactMarkdown
              className="markdown-body"
              source={this.state.markdown}
            />

            <Github
              fab={true}
              repo="react-social-github"
              user="vandreleal"
              tooltipOnHover={true}
              type="button"
            >
            </Github>

          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
