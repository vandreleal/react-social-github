import React, { Component } from 'react';
import './Widget.css';

class Widget extends Component {

  constructor() {
    super();

    this.state = {
      isOpen: false
    };
  }

  render() {
    return (
      <div className="rsg-github-widget">
        { this.props.children }
      </div>
    );
  }
}

export default Widget;
