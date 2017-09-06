import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RepoIcon, GistIcon, MarkGithubIcon, OrganizationIcon, OctofaceIcon } from 'react-octicons';
import './GithubUser.css';

class GithubUser extends Component {

  constructor() {
    super();

    this.state = {
      isLoading: true,
      user: {}
    };

    this.closing = false;
  }

  componentWillMount() {
    if (this.props.objUser) {
      this.setState({
        isLoading: false,
        user: this.props.objUser || {}
      });

    } else {
      window.fetch('https://api.github.com/users/' + this.props.name)
        .then(response => {
          return response.json();
        }).then(json => {
          if (this.closing) {
            return;
          }

          this.setState({
            isLoading: false,
            user: json || {}
          });

        }).catch(ex => {
          this.setState({
            isLoading: false
          });
          throw ex;
        });
    }
  }

  componentWillReceiveProps(props) {
    if (props.objUser) {
      this.setState({
        user: props.objUser || {}
      });
    }
  }

  componentWillUnmount() {
    this.closing = true;
  }

  fixHttp(url) {
    if (url && !url.startsWith('http')) {
      return 'http://'+url;
    }

    return url;
  }

  isEmpty(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        return false;
      }
    }

    return true;
  }

  render() {
    const isHireable = this.state.user.hireable;
    const accountType = this.state.user.type;

    let avatar = <span><OctofaceIcon className="rsg-loading-icon" /></span>;
    let classes = "rsg-github-wrapper rsg-github-user";

    if (this.state.user.avatar_url !== undefined) {
      avatar = (
        <img
          alt={this.state.user.login || ''}
          className="rsg-avatar"
          src={this.state.user.avatar_url || ''}
        />
      );
    } else {
      classes = "rsg-github-is-loading";
    }

    return (
      <div className={classes}>
        { avatar }
        <span className="rsg-name">{this.state.user.name}</span>

        { isHireable && <div className="rsg-status"><span className="rsg-available">Available for hire</span></div> }

        <a
          className="rsg-info"
          href={this.fixHttp(this.state.user.blog)}
          target="_blank"
        >
          {this.state.user.blog}
        </a>

        <span className="rsg-info">{this.state.user.company}</span>
        <span className="rsg-info">{this.state.user.location}</span>

        <div className="rsg-counters">
          <div className="rsg-item">
            <div className="rsg-icon"><RepoIcon /></div>
            <div className="rsg-description">
              <div className="rsg-count">{ Number(this.state.user.public_repos || 0).toLocaleString() }</div>
              <div className="rsg-label">{ this.state.user.public_repos > 1 ? "Repos" : "Repo" }</div>
            </div>
          </div>
          <div className="rsg-item">
            <div className="rsg-icon"><GistIcon /></div>
            <div className="rsg-description">
              <div className="rsg-count">{ Number(this.state.user.public_gists || 0).toLocaleString() }</div>
              <div className="rsg-label">{ this.state.user.public_gists > 1 ? "Gists" : "Gist" }</div>
            </div>
          </div>
        </div>

        { accountType === "User" &&
          <a
            className="rsg-btn rsg-btn-github"
            href={"https://github.com/" + this.state.user.login}
            target="_blank"
          >
            <MarkGithubIcon className="rsg-icon" />
            <span className="rsg-text">Follow @{this.state.user.login}</span>
          </a>
        }

        { accountType === "Organization" &&
          <a
            className="rsg-btn rsg-btn-github"
            href={"https://github.com/" + this.state.user.login}
            target="_blank"
          >
            <OrganizationIcon className="rsg-icon" />
            <span className="rsg-text">View @{this.state.user.login}</span>
          </a>
        }

      </div>
    );
  }
}

GithubUser.propTypes = {
  // name
  name: PropTypes.string,

  // objUser
  objUser: PropTypes.object
};

export default GithubUser;
