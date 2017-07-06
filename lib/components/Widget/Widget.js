import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

Widget.propTypes = {
  // children
  children: PropTypes.object
};

export default Widget;
