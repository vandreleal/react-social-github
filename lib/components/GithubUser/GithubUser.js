import React, { Component } from 'react';
import { RepoIcon } from 'react-octicons';
import { GistIcon } from 'react-octicons';
import './GithubUser.css';

class GithubUser extends Component {

  constructor() {
    super();

    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    window.fetch('https://api.github.com/users/' + this.props.name)
      .then(response => {
        return response.json()
      }).then(json => {
        this.setState({
          user: json
        });
      }).catch(ex => {
        throw ex;
      });
  }

  render() {
    const isHireable = this.state.user.hireable;

    return (
      <div className="github-wrapper github-user">
        <img className="avatar" src={this.state.user.avatar_url} alt="{this.state.user.login}" />
        <span className="name">{this.state.user.name}</span>
        <a className="info" href={this.state.user.blog}>{this.state.user.blog}</a>
        <span className="info">{this.state.user.location}</span>
        <span className="info">{this.state.user.company}</span>

        <div className="counters">
          <div className="item">
            <div className="icon"><RepoIcon/></div>
            <div className="description">
              <div className="count">{this.state.user.public_repos}</div>
              <div className="label">Repos</div>
            </div>
          </div>
          <div className="item">
            <div className="icon"><GistIcon/></div>
            <div className="description">
              <div className="count">{this.state.user.public_gists}</div>
              <div className="label">Gists</div>
            </div>
          </div>
        </div>

        <div className="status">
          {isHireable && <span className="available">Available for hire</span>}
        </div>

        {/*
        <iframe className="github-button" src={"https://ghbtns.com/github-btn.html?user=" + this.state.user.login + "&type=follow&count=true&size=large"}></iframe>
        */}
      </div>
    );
  }
}

export default GithubUser;
