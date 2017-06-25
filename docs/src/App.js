import React, { Component } from 'react';
import { Github } from 'react-social-github';
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
      <div className="app">
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

        <Github user="vandreleal"></Github>
        <Github user="facebook" repo="react"></Github>

      </div>
    );
  }
}

export default App;
