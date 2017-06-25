import React, { Component } from 'react';
import { Github } from 'react-social-github';
import './Playground.css';
import './github-markdown.css';
import 'whatwg-fetch';

class Playground extends Component {

  constructor(props) {
    super(props);
    this.state = {
        type: 'widget',
        user: '',
        org: '',
        repo: ''
    };
  }

  onChange(what, event) {
      let delta = {};
      delta[what] = event.target.value;
      this.setState(delta);
  }

  render() {

    let gh = <Github user={this.state.user} type={this.state.type} tooltipOnHover={true} key={this.state.user}></Github>;

    if (this.state.repo.length > 0) {
        console.log('repo_: ' + this.state.repo);
        gh = <Github user={this.state.user} repo={this.state.repo} type={this.state.type} tooltipOnHover={true} key={this.state+'/'+this.state.repo} ></Github>
    }

    return (
      <div className="playground">

      <select value={this.state.type} onChange={this.onChange.bind(this, 'type')}>
        <option value="link">Link</option>
        <option value="widget">Widget</option>
        <option value="button">Button</option>
      </select>

        User: <input type="text" value={this.state.user} onChange={this.onChange.bind(this, 'user')} /><br/>
        Org: <input type="text" value={this.state.org} onChange={this.onChange.bind(this, 'org')} /><br/>
        Repo: <input type="text" value={this.state.repo} onChange={this.onChange.bind(this, 'repo')} /><br/>

            { gh }

            <Github user="gustavokatel" type="widget" repo="clementine-info" ></Github>
      </div>
    );
  }
}

export default Playground;
