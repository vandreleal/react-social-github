import React, { Component } from 'react';
import './Github.css';

import GithubOrg from '../GithubOrg/GithubOrg';
import GithubUser from '../GithubUser/GithubUser';
import GithubRepo from '../GithubRepo/GithubRepo';

class Github extends Component {
<<<<<<< HEAD
  static propTypes = {
    // custom ID for element
    id: PropTypes.string,

    // Github user
    user: PropTypes.string,

    // Github org
    org: PropTypes.string,

    // Github repo
    repo: PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentWillUnmount() {}
=======

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
>>>>>>> origin/master

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
<<<<<<< HEAD
      <div id={this.props.id} className="github">
        <span>Github</span>
=======
      <div className="github-wrapper">

      { child }

>>>>>>> origin/master
      </div>
    );
  }
}

export default Github;
