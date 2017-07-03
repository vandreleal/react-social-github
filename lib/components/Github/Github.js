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

    this.tooltipCloseTimeout = null;
  }

  componentWillUnmount() {
    if (this.tooltipCloseTimeout) {
      clearTimeout(this.tooltipCloseTimeout);
      this.tooltipCloseTimeout = null;
    }
  }

  componentDidMount() {
    let isUser = typeof this.props.user === 'string';
    let isRepo = typeof this.props.repo === 'string';
    let isObjUser = typeof this.props.objUser === 'object';
    let isObjRepo = typeof this.props.objRepo === 'object';

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

  tooltipToggle() {
    this.setState({
      tooltipIsOpen: !this.state.tooltipIsOpen
    });
  }

  tooltipOpen() {
    if (this.tooltipCloseTimeout) {
      clearTimeout(this.tooltipCloseTimeout);
      this.tooltipCloseTimeout = null;
    }
    this.setState({
      tooltipIsOpen: true
    });
  }

  tooltipClose() {
    this.tooltipCloseTimeout = setTimeout(() => {
      this.setState({
        tooltipIsOpen: false
      });
    }, 50);
  }

  tooltipMouseEnter() {
    if (this.props.tooltipOnHover !== false || this.props.type === 'link') {
      this.tooltipOpen();
    }
  }

  tooltipMouseLeave() {
    if (this.props.tooltipOnHover !== false || this.props.type === 'link') {
      this.tooltipClose();
    }
  }

  tooltipWindowActivate() {

    this.tooltipOpen();

    if (this.refButton) {
      this.refButton.focus();
    } else if (this.refLinkButton) {
      this.refLinkButton.focus();
    }

  }

  render() {
    let type = this.props.type || 'widget';
    let tooltipPosition = this.props.tooltipPosition || 'auto';
    let child = null;

    if(this.state.isObjUser || this.state.isObjRepo) {
      if (this.state.isObjUser) {
        child = <GithubUser objUser={this.props.objUser} type={type} />
      } else if (this.state.isObjRepo) {
        child = <GithubRepo objRepo={this.props.objRepo} type={type} />
      }
    } else {
      if (this.state.isUser) {
        child = <GithubUser name={this.props.user} type={type} />
      } else if (this.state.isRepo) {
        child = <GithubRepo user={this.props.user} repo={this.props.repo} type={type} />
      }
    }


    // type
    if (type === 'button') {
      var tooltipProps = {
        parentClass: 'rsg-github-tooltip-button',
        color: this.props.iconColor,
        width: this.props.iconWidth ? this.props.iconWidth : '48px',
        height: this.props.iconHeight ? this.props.iconHeight : '48px'
      }

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
            open={this.state.tooltipIsOpen}
            anchor={this.refButton}
            onClick={this.tooltipWindowActivate.bind(this)}
            onMouseEnter={this.tooltipWindowActivate.bind(this)}
            onMouseLeave={this.tooltipMouseLeave.bind(this)}
            position={tooltipPosition}
          >
            {child}
          </Tooltip>

          <button
            className='rsg-btn rsg-btn-icon'
            onClick={this.tooltipOpen.bind(this)}
            onBlur={this.tooltipClose.bind(this)}
            onMouseEnter={this.tooltipMouseEnter.bind(this)}
            onMouseLeave={this.tooltipMouseLeave.bind(this)}
            ref={el => this.refButton = el}
          >
            <MarkGithubIcon
              fill={tooltipProps.color}
              width={tooltipProps.width}
              height={tooltipProps.height}
            />
          </button>
        </div>
      );
    } else if (type === 'link') {
      child = (
        <div>
          <Tooltip
            open={this.state.tooltipIsOpen}
            anchor={this.refLinkButton}
            onMouseEnter={this.tooltipMouseEnter.bind(this)}
            onMouseLeave={this.tooltipMouseLeave.bind(this)}
            position={tooltipPosition}
          >
            {child}
          </Tooltip>

          <a
            className='rsg-inline-link rsg-github-tooltip-link'
            onMouseEnter={this.tooltipMouseEnter.bind(this)}
            onMouseLeave={this.tooltipMouseLeave.bind(this)}
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
      <div id={this.props.id} className="rsg-github rsg-github-tooltip-widget" style={this.props.style}>
        {child}
      </div>
    );
  }
}

Github.propTypes = {
  // custom ID for element
  id: PropTypes.string,

  // Github user
  user: PropTypes.string,

  // Github repo
  repo: PropTypes.string,

  // Github user object
  objUser: PropTypes.object,

  // Github repo object
  objRepo: PropTypes.object,

  // type
  type: PropTypes.string,

  // text
  text: PropTypes.string,

  // fab
  fab: PropTypes.bool,

  // fabCorner
  fabCorner: PropTypes.string,

  // iconColor
  iconColor: PropTypes.string,

  // iconWidth
  iconWidth: PropTypes.string,

  // iconHeight
  iconHeight: PropTypes.string,

  // linkText
  linkText: PropTypes.string,

  // tooltipOnHover
  tooltipOnHover: PropTypes.bool
};

export default Github;
