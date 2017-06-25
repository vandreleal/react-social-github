import React, { Component } from 'react';
import { Github } from 'react-social-github';
import './Playground.css';
import './github-markdown.css';
import 'whatwg-fetch';

import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';

class Playground extends Component {

  constructor(props) {
    super(props);
    this.config = {
        type: 'widget',
        user: '',
        org: '',
        repo: ''
    };
    this.state = Object.apply({}, this.config);
  }

  onChange(name, value) {
    this.config = {...this.config, [name]: value};
  };

  update() {
    this.setState(this.config);
  }

  render() {

    let gh = null;

    if(typeof this.state.user === 'string' && this.state.user.length>0) {
        gh = <Github user={this.state.user} type={this.state.type}  tooltipOnHover={true} key={this.state.user}></Github>;
    }

    if(typeof this.state.org === 'string' && this.state.org.length>0) {
        gh = <Github org={this.state.org} type={this.state.type}  tooltipOnHover={true} key={this.state.org}></Github>;
    }

    if (this.state.repo.length > 0) {
        console.log('repo_: ' + this.state.repo);
        gh = <Github user={this.state.user} repo={this.state.repo} type={this.state.type} tooltipOnHover={true} key={this.state+'/'+this.state.repo} ></Github>
    }

    return (
      <div className="playground">

        <section>
          <Input type='text' label='User' name='user' value={this.state.user} onChange={this.onChange.bind(this, 'user')} />
          <Input type='text' label='Repo' name='repo' value={this.state.repo} onChange={this.onChange.bind(this, 'repo')} />
        </section>

        <select value={this.state.type} onChange={this.onChange.bind(this, 'type')}>
          <option value="link">Link</option>
          <option value="widget">Widget</option>
          <option value="button">Button</option>
        </select>

        <Button icon='bookmark' label='Update' onClick={this.update.bind(this)} />

        { gh }

      </div>
    );
  }
}

export default Playground;
