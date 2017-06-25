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

    let anchor = {
      right: 0,
      left: 0,
      bottom: 0,
      top: 0,
      height: 0,
      width: 0
    };

    if (this.props.anchor) {
      anchor = this.props.anchor.getBoundingClientRect();
    }

    let style = {};

    if(this.props.position === 'left') {

      style = {
        top: anchor.top,
        right: anchor.right - anchor.left
      };

    } else if(this.props.position === 'right') {

      style = {
        top: anchor.top,
        left: anchor.right + 10
      };

    } else if(this.props.position === 'top') {

      style = {
        bottom: anchor.bottom - anchor.height,
        left: anchor.left
      };
      console.log(style);

    } else if(this.props.position === 'bottom') {

      style = {
        top: anchor.bottom,
        left: anchor.left
      };

    }

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
