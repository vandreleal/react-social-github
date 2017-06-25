import React, { Component } from 'react';
import { Github } from 'react-social-github';
import './Playground.css';
import './github-markdown.css';
import 'whatwg-fetch';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';

const styles = {
  block: {
    maxWidth: 200,
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
  customWidth: {
    width: 200,
  }
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
        repo: '',
        fabToggleVisible: false,
        fabCornersVisible: false
    };
  }

  handleChange(name, event, key, value) {
    let nValue = typeof value !== 'undefined' ? value : key;
    this.config[name] = nValue;

    let delta = {};
    if(name === 'type') {
        delta.fabToggleVisible = nValue === 'button';
    }

    if(name === 'fab') {
        delta.fabCornersVisible = nValue === true;
    }
    this.setState(delta);
  };

  update() {
    this.setState(this.config);
  }

  render() {
    let gh = null;

    if(typeof this.state.user === 'string' && this.state.user.length>0) {
        gh = <Github user={this.state.user} type={this.state.type} fab={this.state.fab} fabCorner={this.state.fabCorner} tooltipOnHover={true} key={this.state.user}></Github>;
    }

    if(typeof this.state.org === 'string' && this.state.org.length>0) {
        gh = <Github org={this.state.org} type={this.state.type} fab={this.state.fab} fabCorner={this.state.fabCorner} tooltipOnHover={true} key={this.state.org}></Github>;
    }

    if (typeof this.state.repo === 'string' && this.state.repo.length > 0) {
        gh = <Github user={this.state.user} repo={this.state.repo} type={this.state.type} fab={this.state.fab} fabCorner={this.state.fabCorner} tooltipOnHover={true} key={this.state+'/'+this.state.repo} ></Github>
    }

    return (
      <div className="playground">

        <div className="pure-g">
          <div className="pure-u-1 pure-u-sm-1-2 pure-u-md-1-3">
            <section className="form-section">
              <TextField hintText="User" onChange={this.handleChange.bind(this, 'user')} />
              <TextField hintText="Org" onChange={this.handleChange.bind(this, 'org')} />
              <TextField hintText="Repo" onChange={this.handleChange.bind(this, 'repo')} />
            </section>

            <section className="form-section">
              <div>
                <SelectField floatingLabelText="Type" style={styles.customWidth} onChange={this.handleChange.bind(this, 'type')}>
                  {
                    types.map((vtype, index) => {
                        return <MenuItem value={vtype.value} primaryText={vtype.label} key={index} />;
                    })
                  }
                </SelectField>
              </div>
              {
                this.state.fabToggleVisible ? <div style={styles.block}>
                    <Toggle
                    label="FAB"
                    labelPosition="right"
                    style={styles.toggle}
                    onToggle={this.handleChange.bind(this, 'fab')}
                    />
                </div> : null
              }

              {
                this.state.fabCornersVisible ?
                <div>
                    <SelectField floatingLabelText="Fab Corner" style={styles.customWidth} onChange={this.handleChange.bind(this, 'fabCorner')}>
                    {
                        fabCorners.map((vtype, index) => {
                            return <MenuItem value={vtype.value} primaryText={vtype.label} key={index} />;
                        })
                    }
                    </SelectField>
                </div> : null
               }

              <RaisedButton label="Update" primary={true} onClick={this.update.bind(this)} />
            </section>
          </div>

          <div className="pure-u-1 pure-u-md-1-2">
            { gh }
          </div>
        </div>

      </div>
    );
  }
}

export default Playground;
