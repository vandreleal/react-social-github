import React, { Component } from 'react';
import { RepoIcon, GistIcon, MarkGithubIcon, OctofaceIcon } from 'react-octicons';
import './GithubUser.css';

class GithubUser extends Component {

  constructor() {
    super();

    this.state = {
      isLoading: true,
      user: {}
    };

    this.closing = false;

  }

  componentWillUnmount() {
    this.closing = true;
  }

  componentDidMount() {
    window.fetch('https://api.github.com/users/' + this.props.name)
      .then(response => {
        return response.json()
      }).then(json => {
        if(this.closing) return;

        this.setState({
          isLoading: false,
          user: json || {}
        });
      }).catch(ex => {
        this.setState({
          isLoading: false
        });
        throw ex;
      });
  }

  fixHttp(url) {
    if (url && !url.startsWith('http')) {
      return 'http://'+url;
    }

    return url;
  }

  render() {
    const isHireable = this.state.user.hireable;

    let avatar = <img className="rsg-avatar" src={this.state.user.avatar_url || ''} alt={this.state.user.login || ''} />;
    let classes = "rsg-github-wrapper rsg-github-user";

    if(this.state.isLoading) {
      avatar = <span><OctofaceIcon className="rsg-loading-icon" /></span>;
      classes = "rsg-github-is-loading";
    }

    return (
      <div className={classes}>
        { avatar }
        <span className="rsg-name">{this.state.user.name}</span>

        {isHireable && <div className="rsg-status"><span className="rsg-available">Available for hire</span></div>}

        <a className="rsg-info" target="_blank" href={this.fixHttp(this.state.user.blog)}>{this.state.user.blog}</a>
        <span className="rsg-info">{this.state.user.company}</span>
        <span className="rsg-info">{this.state.user.location}</span>

        <div className="rsg-counters">
          <div className="rsg-item">
            <div className="rsg-icon"><RepoIcon /></div>
            <div className="rsg-description">
              <div className="rsg-count">{ Number(this.state.user.public_repos || 0).toLocaleString() }</div>
              <div className="rsg-label">{ this.state.user.public_repos > 1 ? "Repos" : "Repo" }</div>
            </div>
          </div>
          <div className="rsg-item">
            <div className="rsg-icon"><GistIcon /></div>
            <div className="rsg-description">
              <div className="rsg-count">{ Number(this.state.user.public_gists || 0).toLocaleString() }</div>
              <div className="rsg-label">{ this.state.user.public_gists > 1 ? "Gists" : "Gist" }</div>
            </div>
          </div>
        </div>

        <a className="rsg-btn rsg-btn-github" target="_blank" href={"https://github.com/" + this.state.user.login}>
          <MarkGithubIcon className="rsg-icon" />
          <span className="rsg-text">Follow @{this.state.user.login}</span>
        </a>
      </div>
    );
  }
}

export default GithubUser;
