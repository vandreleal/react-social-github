import React, { Component } from 'react';
import './GithubRepo.css';

class GithubRepo extends Component {

  constructor() {
    super();

    this.state = {
      repo: {},
      user: {}
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

  }

  render() {
    return (
      <div className="github-wrapper">

        User: {this.props.user}
        <br/>
        Repo: {this.props.repo}

      </div>
    );
  }
}

export default GithubRepo;
