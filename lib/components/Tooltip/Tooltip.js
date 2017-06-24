import React, { Component } from 'react';
import './Tooltip.css';

class Tooltip extends Component {

  constructor() {
    super();

    this.state = {
      isOpen: true
    };

  }

  componentDidMount() {

  }

  render() {

    let animationClass = 'github-tooltip-animation-close';
    if(this.state.isOpen) {
      animationClass = 'github-tooltip-animation-open';
    }

    return (

      <div className={"github-tooltip " + animationClass }>
        { this.props.children }
      </div>

    );
  }
}

export default Tooltip;
