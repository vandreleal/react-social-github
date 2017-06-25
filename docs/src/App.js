import React, { Component } from 'react';
import { Github } from 'react-social-github';
import logo from './logo.svg';
import './App.css';

import ReactMarkdown from 'react-markdown';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 'facebook',
      repo: 'react'
    };

    this.handleChangeUser = this.handleChangeUser.bind(this);
    this.handleChangeRepo = this.handleChangeRepo.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeUser(event) {
    this.setState({user: event.target.value});
  }

  handleChangeRepo(event) {
    this.setState({repo: event.target.value});
  }

  handleSubmit(event) {
    return (
      <Github user={this.state.user} repo={this.state.repo}></Github>
    )
    event.preventDefault();
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

        <ReactMarkdown source={'# h1'} />

        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.user} onChange={this.handleChangeUser} />
          </label>

          <label>
            Repo:
            <input type="text" value={this.state.repo} onChange={this.handleChangeRepo} />
          </label>

          <input type="submit" value="Submit" />
        </form>

        <Github user={this.state.user} repo={this.state.repo}></Github>

      </div>
    );
  }
}

export default App;
