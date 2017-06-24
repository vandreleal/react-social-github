import React, { Component } from 'react';
import './Github.css';

import GithubOrg from '../GithubOrg/GithubOrg';
import GithubUser from '../GithubUser/GithubUser';
import GithubRepo from '../GithubRepo/GithubRepo';

class Github extends Component {

  constructor() {
    super();

    this.state = {};

  }

  componentDidMount() {

    let isOrg = typeof this.props.org === 'string';
    let isUser = typeof this.props.user === 'string';
    let isRepo = typeof this.props.repo === 'string';

    if (isOrg && isUser) throw new Error('Cannot use org and user at eh same time');

    if (isRepo) isUser = false;

    this.setState({
      isOrg: isOrg,
      isUser: isUser,
      isRepo: isRepo
    });
  }

  render() {

    let child = null;
    if(this.state.isOrg) {
      child = <GithubOrg name={this.props.org} />
    } else if(this.state.isUser) {
      child = <GithubUser name={this.props.user} />
    } else if(this.state.isRepo) {
      child = <GithubRepo user={this.props.user} repo={this.props.repo} />
    }

    return (
      <div className="github-wrapper">

      { child }

      </div>
    );
  }
}

export default Github;
