import React, { Component } from 'react';
import './Tooltip.css';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Tooltip extends Component {

  constructor() {
    super();

  }

  componentDidMount() {

  }

  render() {

    let isOpen = this.props.open === true;

    let content = null;

    let anchorRight = 0;
    if (this.props.anchor) {
      anchorRight = this.props.anchor.getBoundingClientRect().right;
    }

    let anchorTop = 0;
    if (this.props.anchor) {
      anchorTop = this.props.anchor.getBoundingClientRect().top;
    }

    let style = {
      top: anchorTop,
      left: anchorRight + 10
    };

    if(isOpen) {
      content = (
        <div className="github-tooltip animation-container" key={isOpen} style={style}>
          {this.props.children}
        </div>
      );
    }

    return (

      <div
        className="github-tooltip"
        onClick={this.props.onClick}
        onBlur={this.props.onBlur}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
      >

        <ReactCSSTransitionGroup
          transitionName="github-tooltip-animation"
          transitionEnterTimeout={100}
          transitionLeaveTimeout={100}>

          {content}

        </ReactCSSTransitionGroup>

      </div>

    );
  }
}

export default Tooltip;
