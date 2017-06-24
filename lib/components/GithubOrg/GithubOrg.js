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

        Org: { this.props.name }
        <br/>
        Public repos: {this.state.org.public_repos }

      </div>
    );
  }
}

export default GithubOrg;
