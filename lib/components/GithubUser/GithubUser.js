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
      <div className="github-wrapper">

        User: { this.props.name }

      </div>
    );
  }
}

export default GithubUser;
