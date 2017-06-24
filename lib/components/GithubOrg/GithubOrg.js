import React, { Component } from 'react';
import { RepoIcon } from 'react-octicons';
import { GistIcon } from 'react-octicons';
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
      <div className="github-wrapper github-org">
        <img className="avatar" src={this.state.org.avatar_url} alt="{this.state.user.login}" />
        <span className="name">{this.state.org.name}</span>
        <a className="info" href={this.state.org.blog}>{this.state.org.blog}</a>
        <span className="info">{this.state.org.company}</span>
        <span className="info">{this.state.org.location}</span>

        <div className="counters">
          <div className="item">
            <div className="icon"><RepoIcon/></div>
            <div className="description">
              <div className="count">{this.state.org.public_repos}</div>
              <div className="label">Repos</div>
            </div>
          </div>
          <div className="item">
            <div className="icon"><GistIcon/></div>
            <div className="description">
              <div className="count">{this.state.org.public_gists}</div>
              <div className="label">Gists</div>
            </div>
          </div>
        </div>

        {/*
          <iframe className="github-button" src={"https://ghbtns.com/github-btn.html?user=" + this.state.org.login + "&type=follow&count=true&size=large"}></iframe>
        */}
      </div>
    );
  }
}

export default GithubOrg;
