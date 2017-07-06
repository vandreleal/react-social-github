import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './Tooltip.css';

class Tooltip extends Component {

  constructor() {
    super();

    this.state = {};
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
    let styleMargin = 8;

    if (this.props.anchor) {
      anchor = this.props.anchor.getBoundingClientRect();
    }

    let style = {};

    if (windowHeight - anchor.bottom > anchor.top) {
      style.top = anchor.top + anchor.height + styleMargin;
    } else {
      style.bottom = (windowHeight + anchor.height + styleMargin) - anchor.bottom;
    }

    if (windowWidth - anchor.right > anchor.left) {
      style.left = anchor.left;
    } else {
      style.right = (windowWidth - anchor.right);
    }

    if (this.props.position === 'left') {

      style.right = windowWidth - anchor.right;
      delete style.left;

    } else if (this.props.position === 'right') {

      style.left = anchor.left;
      delete style.right;

    } else if (this.props.position === 'top') {

      style.bottom = windowHeight - anchor.bottom;
      delete style.top;

    } else if (this.props.position === 'bottom') {

      style.top = anchor.top;
      delete style.bottom;

    }

    if (isOpen) {
      content = (
        <div
          className="rsg-github-tooltip rsg-animation-container"
          key={isOpen}
          style={style}
        >
          {this.props.children}
        </div>
      );
    }

    return (
      <div
        className="rsg-github-tooltip"
        onBlur={this.props.onBlur}
        onClick={this.props.onClick}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
      >
        <ReactCSSTransitionGroup
          transitionEnterTimeout={100}
          transitionLeaveTimeout={100}
          transitionName="rsg-github-tooltip-animation"
        >
          {content}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

Tooltip.propTypes = {
  // anchor
  anchor: PropTypes.object,

  // children
  children: PropTypes.object,

  // onBlur
  onBlur: PropTypes.bool,

  // onClick
  onClick: PropTypes.func,

  // onMouseEnter
  onMouseEnter: PropTypes.func,

  // OonMouseLeave
  onMouseLeave: PropTypes.func,

  // open
  open: PropTypes.bool,

  // position
  position: PropTypes.string
};

export default Tooltip;
