import React, { Component } from 'react';
import { RepoIcon, GistIcon, OrganizationIcon, OctofaceIcon } from 'react-octicons';
import './GithubOrg.css';

class GithubOrg extends Component {

  constructor() {
    super();

    this.state = {
      isLoading: true,
      org: {}
    };

    this.closing = false;

  }

  componentWillUnmount() {
    this.closing = true;
  }

  componentDidMount() {
    window.fetch('https://api.github.com/orgs/'+this.props.name)
      .then(response => {
        return response.json()
      }).then(json => {
        if(this.closing) return;

        this.setState({
          isLoading: false,
          org: json
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
      return 'http://' + url;
    }

    return url;
  }

  render() {

    let avatar = <img className="rsg-avatar" src={this.state.org.avatar_url || ''} alt={this.state.org.login || ''} />;

    if (this.state.isLoading) {
      avatar = <span><OctofaceIcon className="rsg-loading-icon" /></span>;
    }

    return (
      <div className="rsg-github-wrapper rsg-github-org">

        { avatar }

        <span className="rsg-name">{this.state.org.name}</span>
        <a className="rsg-info" target="_blank" href={this.fixHttp(this.state.org.blog)}>{this.state.org.blog}</a>
        <span className="rsg-info">{this.state.org.company}</span>
        <span className="rsg-info">{this.state.org.location}</span>

        <div className="rsg-counters">
          <div className="rsg-item">
            <div className="rsg-icon"><RepoIcon/></div>
            <div className="rsg-description">
              <div className="rsg-count">{ Number(this.state.org.public_repos || 0).toLocaleString() }</div>
              <div className="rsg-label">Repos</div>
            </div>
          </div>
          <div className="rsg-item">
            <div className="rsg-icon"><GistIcon/></div>
            <div className="rsg-description">
              <div className="rsg-count">{ Number(this.state.org.public_gists || 0).toLocaleString() }</div>
              <div className="rsg-label">Gists</div>
            </div>
          </div>
        </div>

        <a className="rsg-btn rsg-btn-github" target="_blank" href={"https://github.com/" + this.state.org.login}>
          <OrganizationIcon className="rsg-icon" />
          <span className="rsg-text">View @{this.state.org.login}</span>
        </a>
      </div>
    );
  }
}

export default GithubOrg;
