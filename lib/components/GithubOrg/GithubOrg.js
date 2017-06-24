import React, { Component } from 'react';
import './GithubOrg.css';

class GithubOrg extends Component {

  constructor() {
    super();

    this.state = {};

  }

  render() {
    return (
      <div className="github-org">

        Org: { this.props.name }

      </div>
    );
  }
}

export default GithubOrg;
