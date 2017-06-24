import React, { Component } from 'react';
import './GithubUser.css';

class GithubUser extends Component {

  constructor() {
    super();

    this.state = {};

  }

  render() {
    return (
      <div className="github-wrapper">

        User: { this.props.name }

      </div>
    );
  }
}

export default GithubUser;
