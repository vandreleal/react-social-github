import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Github.css';

import { MarkGithubIcon } from 'react-octicons';
import Tooltip from '../Tooltip/Tooltip';
import Widget from '../Widget/Widget';

import GithubOrg from '../GithubOrg/GithubOrg';
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

  componentDidMount() {
    let isUser = typeof this.props.user === 'string';
    let isOrg = typeof this.props.org === 'string';
    let isRepo = typeof this.props.repo === 'string';

    if (isOrg && isUser) throw new Error('Cannot use org and user at the same time');

    if (isRepo) isUser = false;

    this.setState({
      isOrg: isOrg,
      isUser: isUser,
      isRepo: isRepo
    });
  }

  tooltipToggle() {
    this.setState({
      tooltipIsOpen: !this.state.tooltipIsOpen
    });
  }

  tooltipOpen() {
    if(this.tooltipCloseTimeout) {
      clearTimeout(this.tooltipCloseTimeout);
      this.tooltipCloseTimeout = null;
    }
    this.setState({
      tooltipIsOpen: true
    });
  }

  tooltipClose(t) {
    console.log('close: '+t);
    this.tooltipCloseTimeout = setTimeout(() => {
      this.setState({
        tooltipIsOpen: false
      });
    }, 50);
  }

  tooltipMouseEnter() {
    if (this.props.tooltipOnHover === true || this.props.type === 'link') {
      this.tooltipOpen();
    }
  }

  tooltipMouseLeave() {
    if (this.props.tooltipOnHover === true || this.props.type === 'link') {
      this.tooltipClose();
    }
  }

  tooltipWindowActivate() {

    this.tooltipOpen();

    if(this.refButton) {
      this.refButton.focus();
    } else if(this.refLinkButton) {
      this.refLinkButton.focus();
    }

  }

  render() {

    let type = this.props.type || 'tooltip';
    let text = this.props.text || 'Github';

    let child = null;
    if (this.state.isOrg) {
      child = <GithubOrg name={this.props.org} type={type} />
    } else if (this.state.isUser) {
      child = <GithubUser name={this.props.user} type={type} />
    } else if (this.state.isRepo) {
      child = <GithubRepo user={this.props.user} repo={this.props.repo} type={type} />
    }

    // type
    if (type === 'tooltip') {
      child = (
        <div>
          <Tooltip
            open={this.state.tooltipIsOpen}
            anchor={this.refButton}
            onClick={this.tooltipWindowActivate.bind(this)}
            onMouseEnter={this.tooltipWindowActivate.bind(this)}
            onMouseLeave={this.tooltipMouseLeave.bind(this)}
          >
            {child}
          </Tooltip>

          <button
            className="btn btn-icon"
            onClick={this.tooltipOpen.bind(this)}
            onBlur={this.tooltipClose.bind(this)}
            onMouseEnter={this.tooltipMouseEnter.bind(this)}
            onMouseLeave={this.tooltipMouseLeave.bind(this)}
            ref={el => this.refButton = el}
          >
            <MarkGithubIcon/>
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
          >
            {child}
          </Tooltip>

          <a
            onMouseEnter={this.tooltipMouseEnter.bind(this)}
            onMouseLeave={this.tooltipMouseLeave.bind(this)}
            ref={el => this.refLinkButton = el}
            style={{display: 'inline'}}
          >
            {text}
          </a>
        </div>
      );
    } else {
      child = <Widget>{child}</Widget>;
    }

    return (
      <div id={this.props.id} className="github">
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

  // Github org
  org: PropTypes.string,

  // Github repo
  repo: PropTypes.string,

  // type
  type: PropTypes.string,

  // text
  text: PropTypes.string,

  // tooltipOnHover
  tooltipOnHover: PropTypes.bool
};

export default Github;
