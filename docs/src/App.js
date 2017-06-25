import React, { Component } from 'react';
import { Github } from 'react-social-github';
import './App.css';
import './github-markdown.css';
import 'whatwg-fetch';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ReactMarkdown from 'react-markdown';
import Playground from './Playground';

import { cyan500, cyan700, pinkA200, grey100, grey300, grey400, grey500, white, darkBlack, fullBlack } from 'material-ui/styles/colors';

// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://www.material-ui.com/#/customization/colors
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: grey500,
    primary2Color: grey500,
    primary3Color: grey400,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    pickerHeaderColor: grey500,
    shadowColor: fullBlack,
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

    window.fetch('/README.md')
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
