import React, { Component } from 'react';
import { RepoIcon, GistIcon, MarkGithubIcon } from 'react-octicons';
import './GithubUser.css';

class GithubUser extends Component {

  constructor() {
    super();

    this.state = {
      user: {}
    };
  }

  componentWillMount() {
    window.fetch('https://api.github.com/users/' + this.props.name)
      .then(response => {
        return response.json()
      }).then(json => {
        this.setState({
          user: json || {}
        });
      }).catch(ex => {
        throw ex;
      });
  }

  render() {
    const isHireable = this.state.user.hireable;

    return (
      <div className="github-wrapper github-user">
        <img className="avatar" src={this.state.user.avatar_url || ''} alt="{this.state.user.login}" />
        <span className="name">{this.state.user.name}</span>

        {isHireable && <div className="status"><span className="available">Available for hire</span></div>}

        <a className="info" href={this.state.user.blog}>{this.state.user.blog}</a>
        <span className="info">{this.state.user.company}</span>
        <span className="info">{this.state.user.location}</span>

        <div className="counters">
          <div className="item">
            <div className="icon"><RepoIcon /></div>
            <div className="description">
              <div className="count">{ Number(this.state.user.public_repos).toLocaleString() }</div>
              <div className="label">Repos</div>
            </div>
          </div>
          <div className="item">
            <div className="icon"><GistIcon /></div>
            <div className="description">
              <div className="count">{ Number(this.state.user.public_gists).toLocaleString() }</div>
              <div className="label">Gists</div>
            </div>
          </div>
        </div>

        <a className="btn btn-github" href={"https://github.com/" + this.state.user.login}>
          <MarkGithubIcon className="icon" />
          <span className="text">Follow @{this.state.user.login}</span>
        </a>
      </div>
    );
  }
}

export default GithubUser;
