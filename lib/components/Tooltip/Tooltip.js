import React, { Component } from 'react';
import './Tooltip.css';

class Tooltip extends Component {

  constructor() {
    super();

  }

  componentDidMount() {

  }

  render() {

    let isOpen = this.props.open === true;

    let animationClass = 'github-tooltip-animation-close';
    if(isOpen) {
      animationClass = 'github-tooltip-animation-open';
    }

    console.log(animationClass);

    return (

      <div className={"github-tooltip " + animationClass }>
        { this.props.children }
      </div>

    );
  }
}

export default Tooltip;
