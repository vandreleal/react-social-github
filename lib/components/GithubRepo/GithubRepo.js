import React, { Component } from 'react';
import { StarIcon } from 'react-octicons';
import { EyeIcon } from 'react-octicons';
import './GithubRepo.css';

class GithubRepo extends Component {

  constructor() {
    super();

    this.state = {
      repo: {},
      user: {},
      lastRelease: {
        name: '',
        zipUrl: '',
        tarUrl: ''
      }
    };

  }

  componentDidMount() {

    window.fetch('https://api.github.com/repos/' + this.props.user+'/'+this.props.repo)
      .then(response => {
        return response.json()
      }).then(json => {
        this.setState({
          repo: json,
          user: json.owner
        });
      }).catch(ex => {
        throw ex;
      });

      // retrieve last release
      window.fetch('https://api.github.com/repos/' + this.props.user + '/' + this.props.repo + '/releases')
      .then(response => {
        return response.json()
      }).then(json => {

        if( typeof json === 'object' &&  json.length > 0) {
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
    return (
      <div className="github-wrapper github-repo">
        <img className="avatar" src={this.state.user.avatar_url} alt="{this.state.user.login}" />
        <span className="name">{this.state.repo.full_name}</span>
        <p className="info info--italic">{this.state.repo.description}</p>
        <span className="info">{this.state.repo.language}</span>

        <div className="counters">
          <div className="item">
            <div className="icon"><StarIcon/></div>
            <div className="description">
              <div className="count">{this.state.repo.stargazers_count}</div>
              <div className="label">Stars</div>
            </div>
          </div>
          <div className="item">
            <div className="icon"><EyeIcon/></div>
            <div className="description">
              <div className="count">{this.state.repo.watchers_count}</div>
              <div className="label">Watchers</div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default GithubRepo;
