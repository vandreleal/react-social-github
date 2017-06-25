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

    let windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    let windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    if (this.props.anchor) {
      anchor = this.props.anchor.getBoundingClientRect();
    }

    let style = {};

    if (windowHeight - anchor.bottom > anchor.top) {
      style.top = anchor.top;
    } else {
      style.bottom = windowHeight - anchor.bottom;
    }

    if (windowWidth - anchor.right > anchor.left) {
      style.left = anchor.left + anchor.width;
    } else {
      style.right = (windowWidth - anchor.right) + anchor.width;
    }

    if(this.props.position === 'left') {

      style.right = (windowWidth - anchor.right) + anchor.width;
      delete style.left;

    } else if(this.props.position === 'right') {

      style.left = anchor.left + anchor.width;
      delete style.right;

    } else if(this.props.position === 'top') {

      style.bottom = windowHeight - anchor.bottom;
      delete style.top;

    } else if(this.props.position === 'bottom') {

      style.top = anchor.top;
      delete style.bottom;

    }

    if(isOpen) {
      content = (
        <div className="rsg-github-tooltip rsg-animation-container" key={isOpen} style={style}>
          {this.props.children}
        </div>
      );
    }

    return (

      <div
        className="rsg-github-tooltip"
        onClick={this.props.onClick}
        onBlur={this.props.onBlur}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
      >

        <ReactCSSTransitionGroup
          transitionName="rsg-github-tooltip-animation"
          transitionEnterTimeout={100}
          transitionLeaveTimeout={100}>

          {content}

        </ReactCSSTransitionGroup>

      </div>

    );
  }
}

export default Tooltip;
