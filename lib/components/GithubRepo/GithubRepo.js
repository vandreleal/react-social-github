import React, { Component } from 'react';
import { StarIcon, RepoIcon, RepoForkedIcon, OctofaceIcon } from 'react-octicons';
import './GithubRepo.css';

class GithubRepo extends Component {

  constructor() {
    super();

    this.state = {
      isLoading: true,
      repo: {},
      user: {},
      lastRelease: {
        name: '',
        zipUrl: '',
        tarUrl: ''
      }
    };

    this.closing = false;
  }

  componentWillUnmount() {
    this.closing = true;
  }

  componentDidMount() {

    window.fetch('https://api.github.com/repos/' + this.props.user + '/' + this.props.repo)
      .then(response => {
        return response.json()
      }).then(json => {
        if (this.closing) return;

        this.setState({
          repo: json || {},
          user: json.owner || {},
          isLoading: false
        });
      }).catch(ex => {
        this.setState({
          isLoading: false
        });
        throw ex;
      });

    // retrieve last release
    window.fetch('https://api.github.com/repos/' + this.props.user + '/' + this.props.repo + '/releases')
      .then(response => {
        return response.json()
      }).then(json => {
        if (this.closing) return;

        if (typeof json === 'object' && json.length > 0) {
          this.setState({
            lastRelease: {
              name: json[0].name,
              tarUrl: json[0].tarball_url,
              zipUrl: json[0].zipball_url,
              date: json[0].published_at
            }
          });
        }

      }).catch(ex => {
        throw ex;
      });

  }

  render() {
    let avatar = <img className="rsg-avatar" src={this.state.user.avatar_url || ''} alt={this.state.user.login || ''} />;
    let classes = "rsg-github-wrapper rsg-github-repo";

    if (this.state.isLoading) {
      avatar = <span><OctofaceIcon className="rsg-loading-icon" /></span>;
      classes = "rsg-github-is-loading";
    }

    return (
      <div className={classes}>
        {avatar}
        <span className="rsg-name">{this.state.repo.full_name}</span>
        <span className="rsg-info rsg-info--secondary">{this.state.repo.language}</span>
        <p className="rsg-info rsg-info--italic">{this.state.repo.description}</p>

        <div className="rsg-counters">
          <div className="rsg-item">
            <div className="rsg-icon"><StarIcon /></div>
            <div className="rsg-description">
              <div className="rsg-count">{ Number(this.state.repo.stargazers_count || 0).toLocaleString() }</div>
              <div className="rsg-label">{ this.state.repo.stargazers_count > 1 ? "Stars" : "Star" }</div>
            </div>
          </div>
          <div className="rsg-item">
            <div className="rsg-icon"><RepoForkedIcon /></div>
            <div className="rsg-description">
              <div className="rsg-count">{ Number(this.state.repo.forks || 0).toLocaleString() }</div>
              <div className="rsg-label">{ this.state.repo.forks > 1 ? "Forks" : "Fork" }</div>
            </div>
          </div>
        </div>

        <a className="rsg-btn rsg-btn-github" target="_blank" href={"https://github.com/" + this.state.repo.full_name}>
          <RepoIcon className="rsg-icon" />
          <span className="rsg-text">View Repository</span>
        </a>

      </div>
    );
  }
}

export default GithubRepo;
