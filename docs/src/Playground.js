import React, { Component } from 'react';
import { Github } from 'react-social-github';
import './Playground.css';
import './github-markdown.css';
import 'whatwg-fetch';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';

const styles = {
  block: {
    maxWidth: 250,
  },
  toggle: {
    marginBottom: 16,
  },
  thumbOff: {
    backgroundColor: '#ffcccc',
  },
  trackOff: {
    backgroundColor: '#ff9d9d',
  },
  thumbSwitched: {
    backgroundColor: 'red',
  },
  trackSwitched: {
    backgroundColor: '#ff9d9d',
  },
  labelStyle: {
    color: 'red',
  },
};

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
      user: 'vandreleal',
      org: '',
      repo: ''
    };
    this.state = {
        type: 'widget',
        fab: false,
        fabCorner: 'bottom-right',
        user: '',
        org: '',
        repo: ''
    };
  }

  handleChange(name, event, key, value) {
    let nValue = typeof value !== 'undefined' ? value : key;
    this.config[name] = nValue;
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

    if (typeof this.state.repo === 'string' && this.state.repo.length > 0) {
        gh = <Github user={this.state.user} repo={this.state.repo} type={this.state.type} tooltipOnHover={true} key={this.state+'/'+this.state.repo} ></Github>
    }

    return (
      <div className="playground">
        <section>
          <TextField hintText="User" onChange={this.handleChange.bind(this, 'user')} />
          <TextField hintText="Org" onChange={this.handleChange.bind(this, 'org')} />
          <TextField hintText="Repo" onChange={this.handleChange.bind(this, 'repo')} />
        </section>

        <div>
          <Toggle
           label="FAB"
           labelPosition="right"
           valueLink={this.state.fab}
           style={styles.toggle}
          />
        </div>

        <DropDownMenu value={this.state.type} onChange={this.handleChange.bind(this, 'type')}>
          {
            types.map((vtype, index) => {
                return <MenuItem value={vtype.value} primaryText={vtype.label} key={index} />;
            })
          }
        </DropDownMenu>

        <DropDownMenu value={this.state.fabCorner} onChange={this.handleChange.bind(this, 'fabCorner')}>
          {
            fabCorners.map((vtype, index) => {
                return <MenuItem value={vtype.value} primaryText={vtype.label} key={index} />;
            })
          }
        </DropDownMenu>

        <RaisedButton label="Update" primary={true} onClick={this.update.bind(this)} />

        <div>
          { gh }
        </div>

      </div>
    );
  }
}

export default Playground;
