import React, { Component } from 'react';
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
        <a href={this.state.user.blog} className="blog">{this.state.user.blog}</a>
        <span className="company">{this.state.user.company}</span>
        <span className="location">{this.state.user.location}</span>

        <div className="counters">
          <span className="repos">Repos: {this.state.user.public_repos}</span>
          <span className="gists">Gists: {this.state.user.public_gists}</span>
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
