import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Github.css';

import { MarkGithubIcon } from 'react-octicons';
import Tooltip from '../Tooltip/Tooltip';
import Widget from '../Widget/Widget';
import GithubUser from '../GithubUser/GithubUser';
import GithubRepo from '../GithubRepo/GithubRepo';

class Github extends Component {
  constructor() {
    super();

    this.state = {
      tooltipIsOpen: false
    };

    this.handleTooltipCloseTimeout = null;
  }

  componentWillMount() {
    this.setState({
      isUser: this.props.user,
      isRepo: this.props.repo,
      isObjUser: this.props.objUser,
      isObjRepo: this.props.objRepo
    });
  }

  componentWillReceiveProps(props) {
    let isUser = typeof props.user === 'string';
    let isRepo = typeof props.repo === 'string';
    let isObjUser = typeof props.objUser === 'object';
    let isObjRepo = typeof props.objRepo === 'object';

    if (isRepo || isObjRepo) {
      isUser = false;
      isObjUser = false;
    }

    this.setState({
      isUser: isUser,
      isRepo: isRepo,
      isObjUser: isObjUser,
      isObjRepo: isObjRepo
    });
  }

  componentWillUnmount() {
    if (this.handleTooltipCloseTimeout) {
      clearTimeout(this.handleTooltipCloseTimeout);
      this.handleTooltipCloseTimeout = null;
    }
  }

  handleTooltipToggle() {
    this.setState({
      tooltipIsOpen: !this.state.tooltipIsOpen
    });
  }

  handleTooltipOpen() {
    if (this.handleTooltipCloseTimeout) {
      clearTimeout(this.handleTooltipCloseTimeout);
      this.handleTooltipCloseTimeout = null;
    }
    this.setState({
      tooltipIsOpen: true
    });
  }

  handleTooltipClose() {
    this.handleTooltipCloseTimeout = setTimeout(() => {
      this.setState({
        tooltipIsOpen: false
      });
    }, 50);
  }

  handleTooltipMouseEnter() {
    if (this.props.tooltipOnHover !== false || this.props.type === 'link') {
      this.handleTooltipOpen();
    }
  }

  handleTooltipMouseLeave() {
    if (this.props.tooltipOnHover !== false || this.props.type === 'link') {
      this.handleTooltipClose();
    }
  }

  handleTooltipWindowActivate() {
    this.handleTooltipOpen();

    if (this.refButton) {
      this.refButton.focus();
    } else if (this.refLinkButton) {
      this.refLinkButton.focus();
    }
  }

  render() {
    let type = this.props.type || 'widget';
    let tooltipPosition = 'auto';
    let child = null;

    if (this.state.isObjUser || this.state.isObjRepo) {
      if (this.state.isObjUser) {
        child = (
          <GithubUser
            objUser={this.props.objUser}
            type={type}
          />
        );
      } else if (this.state.isObjRepo) {
        child = (
          <GithubRepo
            objRepo={this.props.objRepo}
            type={type}
          />
        );
      }
    } else {
      if (this.state.isUser) {
        child = (
          <GithubUser
            name={this.props.user}
            type={type}
          />
        );
      } else if (this.state.isRepo) {
        child = (
          <GithubRepo
            repo={this.props.repo}
            type={type}
            user={this.props.user}
          />
        );
      }
    }

    // type
    if (type === 'button') {
      var tooltipProps = {
        parentClass: 'rsg-github-tooltip-button',
        color: this.props.iconColor,
        width: this.props.iconWidth ? this.props.iconWidth : '48px',
        height: this.props.iconHeight ? this.props.iconHeight : '48px'
      };

      if (this.props.fab) {
        tooltipProps.parentClass = tooltipProps.parentClass.concat('rsg-btn rsg-btn-fab');

        if (this.props.fabCorner) {
          tooltipProps.parentClass = tooltipProps.parentClass.concat(' rsg-btn-fab--' + this.props.fabCorner);
        } else {
          tooltipProps.parentClass = tooltipProps.parentClass.concat(' rsg-btn-fab--bottom-right');
        }
      }

      child = (
        <div className={tooltipProps.parentClass}>
          <Tooltip
            anchor={this.refButton}
            onClick={() => this.handleTooltipWindowActivate()}
            onMouseEnter={() => this.handleTooltipWindowActivate()}
            onMouseLeave={() => this.handleTooltipMouseLeave()}
            open={this.state.tooltipIsOpen}
            position={tooltipPosition}
          >
            {child}
          </Tooltip>

          <button
            className='rsg-btn rsg-btn-icon'
            onBlur={() => this.handleTooltipClose()}
            onClick={() => this.handleTooltipOpen()}
            onMouseEnter={() => this.handleTooltipMouseEnter()}
            onMouseLeave={() => this.handleTooltipMouseLeave()}
            ref={el => this.refButton = el}
          >
            <MarkGithubIcon
              fill={tooltipProps.color}
              height={tooltipProps.height}
              width={tooltipProps.width}
            />
          </button>
        </div>
      );
    } else if (type === 'link') {
      child = (
        <div>
          <Tooltip
            anchor={this.refLinkButton}
            onMouseEnter={() => this.handleTooltipMouseEnter()}
            onMouseLeave={() => this.handleTooltipMouseLeave()}
            open={this.state.tooltipIsOpen}
            position={tooltipPosition}
          >
            {child}
          </Tooltip>

          <a
            className='rsg-inline-link rsg-github-tooltip-link'
            onMouseEnter={() => this.handleTooltipMouseEnter()}
            onMouseLeave={() => this.handleTooltipMouseLeave()}
            ref={el => this.refLinkButton = el}
            style={{ display: 'inline' }}
          >
            {this.props.linkText || 'Github'}
          </a>
        </div>
      );
    } else {
      child = <Widget>{child}</Widget>;
    }

    return (
      <div
        className="rsg-github rsg-github-tooltip-widget"
        id={this.props.id}
        style={this.props.style}
      >
        {child}
      </div>
    );
  }
}

Github.propTypes = {
  // fab
  fab: PropTypes.bool,

  // fabCCorner
  fabCorner: PropTypes.string,

  // iconColor
  iconColor: PropTypes.string,

  // iconHeight
  iconHeight: PropTypes.string,

  // iconWidth
  iconWidth: PropTypes.string,

  // id
  id: PropTypes.string,

  // linkText
  linkText: PropTypes.string,

  // objRepo
  objRepo: PropTypes.object,

  // objUser
  objUser: PropTypes.object,

  // repo
  repo: PropTypes.string,

  // style
  style: PropTypes.string,

  // tooltipOnHover
  tooltipOnHover: PropTypes.bool,

  // type
  type: PropTypes.string,

  // user
  user: PropTypes.string
};

export default Github;
