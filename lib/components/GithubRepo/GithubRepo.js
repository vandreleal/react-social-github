import React, { Component } from 'react';
import './GithubRepo.css';

import Tooltip from '../Tooltip/Tooltip';
import Widget from '../Widget/Widget';

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

    let content = (<div className="github-wrapper github-repo">

      <img className="avatar" src={this.state.user.avatar_url} alt="{this.state.user.login}" />
      <span className="name">{this.state.repo.full_name}</span>
      <span className="blog">{this.state.repo.description}</span>
      <span className="company">{this.state.repo.language}</span>

      <div className="counters">
        <span className="repos">Stars: {this.state.repo.stargazers_count}</span>
        <span className="gists">Watchers: {this.state.repo.watchers_count}</span>
      </div>
    </div>);

    if(this.props.presentation === 'tooltip') {
      content = <Tooltip>{content}</Tooltip>;
    } else {
      content = <Widget>{content}</Widget>;
    }

    return content;
  }
}

export default GithubRepo;
