import React, { Component } from 'react';
import './Github.css';

class Github extends Component {
  static propTypes = {
    // custom ID for element
    id: PropTypes.string,

    // Github user
    user: PropTypes.string,

    // Github org
    org: PropTypes.string,

    // Github repo
    repo: PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div id={this.props.id} className="github">
        <span>Github</span>
      </div>
    );
  }
}

export default Github;
