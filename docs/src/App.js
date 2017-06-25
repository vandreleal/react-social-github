import React, { Component } from 'react';
import { Github } from 'react-social-github';
import './App.css';
import 'whatwg-fetch';

import ReactMarkdown from 'react-markdown';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      markdown: '# Loading',
      user: 'facebook',
      repo: 'react'
    };

    this.handleChangeUser = this.handleChangeUser.bind(this);
    this.handleChangeRepo = this.handleChangeRepo.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleChangeUser(event) {
    this.setState({user: event.target.value});
  }

  handleChangeRepo(event) {
    this.setState({repo: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    return (
      <Github user={this.state.user} repo={this.state.repo}></Github>
    )
  }

  render() {
    return (
      <div className="app">
        {/*}<form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.user} onChange={this.handleChangeUser} />
          </label>

          <label>
            Repo:
            <input type="text" value={this.state.repo} onChange={this.handleChangeRepo} />
          </label>

          <input type="submit" value="Submit" />
        </form>*/}

        <ReactMarkdown source={this.state.markdown} />

        <Github user="vandreleal"></Github>
        <Github user="facebook" repo="react"></Github>
        
      </div>
    );
  }
}

export default App;
