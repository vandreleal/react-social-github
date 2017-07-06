import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StarIcon, RepoIcon, RepoForkedIcon, OctofaceIcon } from 'react-octicons';
import './GithubRepo.css';

var emojiJs = require('emoji-js');

class GithubRepo extends Component {

  constructor() {
    super();

    this.state = {
      isLoading: true,
      repo: {},
      user: {},
      lastRelease: {
        name: '',
        zipUrl: '',
        tarUrl: ''
      }
    };

    this.closing = false;
  }

  componentWillMount() {
    var emoji = new emojiJs.EmojiConvertor();
    // convert colons to unicode
    emoji.init_env();
    emoji.replace_mode = 'unified';
    emoji.allow_native = true;
    // show the short-name as a `title` attribute for css/img emoji
    emoji.include_title = true;
    // Configure this library to use the sheets defined in `img_sets`
    emoji.use_sheet = true;
    // img_set
    emoji.img_set = 'emojione';

    if (this.props.objRepo) {
      let description = this.props.objRepo.description || '';
      description = this.truncate(description);
      description = emoji.replace_colons(description);

      this.props.objRepo.description = description;

      this.setState({
        repo: this.props.objRepo || {},
        user: this.props.objRepo.owner || {},
        isLoading: false
      });

    } else {
      window.fetch('https://api.github.com/repos/' + this.props.user + '/' + this.props.repo)
        .then(response => {
          return response.json();
        }).then(json => {
          if (this.closing) {
            return;
          }

          let description = json.description || '';
          description = this.truncate(description);
          description = emoji.replace_colons(description);

          json.description = description;

          this.setState({
            repo: json || {},
            user: json.owner || {},
            isLoading: false
          });

        }).catch(ex => {
          this.setState({
            isLoading: false
          });
          throw ex;
        });

      // retrieve last release
      window.fetch('https://api.github.com/repos/' + this.props.user + '/' + this.props.repo + '/releases')
        .then(response => {
          return response.json();
        }).then(json => {
          if (this.closing) {
            return;
          }

          if (typeof json === 'object' && json.length > 0) {
            this.setState({
              lastRelease: {
                name: json[0].name,
                tarUrl: json[0].tarball_url,
                zipUrl: json[0].zipball_url,
                date: json[0].published_at
              }
            });
          }

        }).catch(ex => {
          throw ex;
        });
    }
  }

  componentWillUnmount() {
    this.closing = true;
  }

  truncate(str, length, ending) {
    let strLength = 0,
      maxLength = 120,
      strEnding = '...';

    if (str !== undefined) {
      strLength = str.length;
    }

    if (length !== undefined) {
      maxLength = length;
    }

    if (ending !== undefined) {
      strEnding = ending;
    }

    if (strLength > maxLength) {
      return str.substring(0, maxLength - strEnding.length) + strEnding;
    } else {
      return str;
    }
  }

  render() {
    let avatar = (
      <img
        alt={this.state.user.login || ''}
        className="rsg-avatar"
        src={this.state.user.avatar_url || ''}
      />
    );

    let classes = "rsg-github-wrapper rsg-github-repo";

    if (this.state.isLoading) {
      avatar = <span><OctofaceIcon className="rsg-loading-icon" /></span>;
      classes = "rsg-github-is-loading";
    }

    return (
      <div className={classes}>
        {avatar}
        <span className="rsg-name">{this.state.repo.full_name}</span>
        <span className="rsg-info rsg-info--secondary">{this.state.repo.language}</span>
        <p className="rsg-info rsg-info--italic">{this.state.repo.description}</p>

        <div className="rsg-counters">
          <div className="rsg-item">
            <div className="rsg-icon"><StarIcon /></div>
            <div className="rsg-description">
              <div className="rsg-count">{ Number(this.state.repo.stargazers_count || 0).toLocaleString() }</div>
              <div className="rsg-label">{ this.state.repo.stargazers_count > 1 ? "Stars" : "Star" }</div>
            </div>
          </div>
          <div className="rsg-item">
            <div className="rsg-icon"><RepoForkedIcon /></div>
            <div className="rsg-description">
              <div className="rsg-count">{ Number(this.state.repo.forks || 0).toLocaleString() }</div>
              <div className="rsg-label">{ this.state.repo.forks > 1 ? "Forks" : "Fork" }</div>
            </div>
          </div>
        </div>

        <a
          className="rsg-btn rsg-btn-github"
          href={"https://github.com/" + this.state.repo.full_name}
          target="_blank"
        >
          <RepoIcon className="rsg-icon" />
          <span className="rsg-text">View Repository</span>
        </a>

      </div>
    );
  }
}

GithubRepo.propTypes = {
  // objRepo
  objRepo: PropTypes.object,

  // repo
  repo: PropTypes.string,

  // user
  user: PropTypes.string,
};

export default GithubRepo;
