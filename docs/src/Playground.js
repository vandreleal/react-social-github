import React, { Component } from 'react';
import { Github } from 'react-social-github';
import './Playground.css';
import './github-markdown.css';
import 'whatwg-fetch';

import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';
import Dropdown from 'react-toolbox/lib/dropdown';
// import Switch from 'react-toolbox/lib/switch';

const types = [
  { value: 'widget', label: 'Widget' },
  { value: 'link', label: 'Link' },
  { value: 'button', label: 'Button' }
];

const fabCorners = [
  { value: 'top-left', label: 'Top Left' },
  { value: 'top-right', label: 'Top Right' },
  { value: 'bottom-left', label: 'Bottom Left' },
  { value: 'bottom-right', label: 'Bottom Right' }
];

class Playground extends Component {

  constructor(props) {
    super(props);
    this.config = {
      type: 'widget',
      fab: false,
      fabCorner: 'bottom-right',
      user: '',
      org: '',
      repo: ''
    };
    this.state = Object.apply({}, this.config);
  }

  handleChange(name, value) {
    this.config({...this.state, [name]: value});
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
          <Input type='text' label='User' name='user' value={this.state.user} onChange={this.handleChange.bind(this, 'user')} />
          <Input type='text' label='Repo' name='repo' value={this.state.repo} onChange={this.handleChange.bind(this, 'repo')} />
        </section>

        <Dropdown
          auto
          onChange={this.handleChange.bind(this, 'type')}
          source={types}
          value={this.state.type}
        />

        {/*}<Switch
          checked={this.state.fab}
          label="FAB"
          onChange={this.handleChange.bind(this, 'fab')}
        />*/}

        <Dropdown
          auto
          onChange={this.handleChange.bind(this, 'fabCorner')}
          source={fabCorners}
          value={this.state.fabCorner}
        />

        <Button icon='bookmark' label='Update' onClick={this.update.bind(this)} />

        { gh }

      </div>
    );
  }
}

export default Playground;
