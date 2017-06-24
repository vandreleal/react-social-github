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
          <a className="" href={this.state.user.html_url}>{this.state.user.name}</a>
          <span className="">{this.state.user.company}</span>
        </div>
        <div>Repos: { this.state.user.public_repos } </div>
        <div>Gists: { this.state.user.public_gists } </div>
        <br/>
      </div>
    );
  }
}

export default GithubUser;
