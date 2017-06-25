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

        <Github type={this.state.type} user={this.state.user} repo={this.state.repo} tooltipOnHover={true} key={this.state.repo}></Github>
      </div>
    );
  }
}

export default Playground;
