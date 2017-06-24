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
    return (
      <div className="github-user">
        <img className="avatar" src={this.state.user.avatar_url} alt="{this.state.user.login}" />
        <div>
          <span className="">{this.state.user.name}</span>
          <span className="">{this.state.user.company}</span>
        </div>

        <div>
          <span className="">Repos: {this.state.user.public_repos}</span>
          <span className="">Gists: {this.state.user.public_gists}</span>
        </div>

        <a className="github-button" href={this.state.user.html_url}>Follow @{this.state.user.login}</a>
      </div>
    );
  }
}

export default GithubUser;
