import React, { Component } from 'react';
import './GithubRepo.css';

class GithubRepo extends Component {

  constructor() {
    super();

    this.state = {};

  }

  render() {
    return (
      <div className="github-wrapper">

        User: {this.props.user}
        <br/>
        Repo: {this.props.repo}

      </div>
    );
  }
}

export default GithubRepo;
