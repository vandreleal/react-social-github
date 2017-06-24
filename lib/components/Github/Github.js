import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    let isUser = typeof this.props.user === 'string';
    let isOrg = typeof this.props.org === 'string';
    let isRepo = typeof this.props.repo === 'string';

    if (isOrg && isUser) throw new Error('Cannot use org and user at the same time');

    if (isRepo) isUser = false;

    this.setState({
      isOrg: isOrg,
      isUser: isUser,
      isRepo: isRepo
    });
  }

  render() {

    let child = null;
    if (this.state.isOrg) {
      child = <GithubOrg name={this.props.org} />
    } else if (this.state.isUser) {
      child = <GithubUser name={this.props.user} />
    } else if (this.state.isRepo) {
      child = <GithubRepo user={this.props.user} repo={this.props.repo} />
    }

    return (
      <div id={this.props.id} className="github">
        <div className="github-wrapper">
          {child}
        </div>
      </div>
    );
  }
}

Github.propTypes = {
  // custom ID for element
  id: PropTypes.string,

  // Github user
  user: PropTypes.string,

  // Github org
  org: PropTypes.string,

  // Github repo
  repo: PropTypes.string
};

export default Github;
