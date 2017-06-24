import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Github.css';

import GithubOrg from '../GithubOrg/GithubOrg';
import GithubUser from '../GithubUser/GithubUser';
import GithubRepo from '../GithubRepo/GithubRepo';

class Github extends Component {
  constructor() {
    super();
    this.state = {
      childActive: false
    };
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

  toggleActive() {
    this.setState({
      childActive: !this.state.childActive
    });
  }

  render() {

    let presentation = this.props.presentation || 'tooltip';

    let child = null;
    if (this.state.isOrg) {
      child = <GithubOrg name={this.props.org} presentation={presentation} active={this.state.childActive} />
    } else if (this.state.isUser) {
      child = <GithubUser name={this.props.user} presentation={presentation} active={this.state.childActive} />
    } else if (this.state.isRepo) {
      child = <GithubRepo user={this.props.user} repo={this.props.repo} presentation={presentation} active={this.state.childActive} />
    }

    return (
      <div id={this.props.id} className="github">
        {child}
        <button onClick={this.toggleActive.bind(this)}>Github</button>
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
  repo: PropTypes.string,

  // presentation
  presentation: PropTypes.string
};

export default Github;
