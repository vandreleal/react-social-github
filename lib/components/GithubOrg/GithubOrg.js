import React, { Component } from 'react';
import './GithubOrg.css';

class GithubOrg extends Component {

  constructor() {
    super();

    this.state = {
      org: {}
    };
  }

  componentDidMount() {
    window.fetch('https://api.github.com/orgs/'+this.props.name)
      .then(response => {
        return response.json()
      }).then(json => {
        this.setState({
          org: json
        });
      }).catch(ex => {
        throw ex;
      });
  }

  render() {
    return (
      <div className="github-org">
        <img className="avatar" src={this.state.org.avatar_url} alt="{this.state.user.login}" />
        <div>
          <span className="">{this.state.org.name}</span>
          <span className="">{this.state.org.company}</span>
          <span className="">{this.state.org.blog}</span>
        </div>

        <div>
          <span className="">Repos: {this.state.org.public_repos}</span>
          <span className="">Gists: {this.state.org.public_gists}</span>
        </div>

        <a className="github-button" href={this.state.org.html_url}>Follow @{this.state.org.login}</a>
      </div>
    );
  }
}

export default GithubOrg;
