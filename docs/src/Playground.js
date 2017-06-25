import React, { Component } from 'react';
import { Github } from 'react-social-github';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';

import './Playground.css';
import 'whatwg-fetch';

const styles = {
  block: {
    maxWidth: 260,
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
    width: 260,
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
      user: '',
      org: '',
      repo: ''
    };
    this.state = {
        type: 'widget',
        fab: false,
        fabCorner: '',
        user: '',
        org: '',
        repo: '',
        fabToggleEnabled: false,
        fabCornersEnabled: false,
        buttonControlsEnabled: false,
        repoErrorText: '',
        iconColor: '',
        iconWidth: '',
        iconHeight: ''
    };
  }

  handleChange(name, event, key, value) {
    let nValue = typeof value !== 'undefined' ? value : key;
    this.config[name] = nValue;

    let delta = {};

    if(name === 'user') {
        delta.org = '';
        this.config.org = '';
        this.config.user = nValue;

        delta.repoErrorText = '';
    }

    if(name === 'org') {
        delta.user = '';
        this.config.user = '';
        this.config.org = nValue;

        delta.repoErrorText = '';
    }

    if(name === 'repo') {
        if(!this.config.user && !this.config.org && this.config.repo) {
            delta.repoErrorText = 'User or org missing';
        } else {
            delta.repoErrorText = '';
        }
    }

    if(name === 'type') {
        delta.fabToggleEnabled = nValue === 'button';
        delta.fabCornersEnabled = nValue === 'button' && this.config.fab === true;
        delta.buttonControlsEnabled = nValue === 'button';
    }

    if(name === 'fab') {
        delta.fabCornersEnabled = this.config.type === 'button' && this.config.fab === true && nValue === true;
    }

    this.setState(delta);
  };

  update() {
    this.setState(this.config);
  }

  transverseProps(ghProps) {
      let acc = '';

      Object.keys(ghProps).forEach((key, index) => {
        let value = ghProps[key];
        let jsType = typeof value !== 'string';

        acc += key + '=' + (jsType ? '{' : '"') + value + (jsType ? '}' : '"') + ' ';
      });

      return acc;
  }

  render() {
    let ghProps = {
        type: this.state.type,
        fab: this.state.fab,
        fabCorner: this.state.fabCorner,
        iconColor: this.state.iconColor,
        iconWidth: this.state.iconWidth,
        iconHeight: this.state.iconHeight,
        tooltipOnHover: true
    };

    if(typeof this.state.repo === 'string' && this.state.repo.length>0) {
        ghProps.repo = this.state.repo;
    }

    if(typeof this.state.user === 'string' && this.state.user.length>0) {
        ghProps.user = this.state.user;
    }

    if(typeof this.state.org === 'string' && this.state.org.length>0) {
        ghProps.org = this.state.org;
    }

    let gh = <Github
            { ...ghProps }
            key={this.state.org + ':' + this.state.user + '/' + this.state.repo}>
        </Github>;

    return (
      <div className="playground">

        <div className="pure-g">
          <div className="pure-u-1 pure-u-lg-2-3">
            <h4 className="form-title">Github Info</h4>
            <div className="pure-u-1 pure-u-md-1-2">
              <section>
                  <div>
                    <TextField value={this.config.user} hintText="Username" onChange={this.handleChange.bind(this, 'user')} />
                  </div>

                  <div>
                    <TextField value={this.config.org} hintText="Organization" onChange={this.handleChange.bind(this, 'org')} />
                  </div>

                  <div>
                    <TextField errorText={this.state.repoErrorText} hintText="Repository" onChange={this.handleChange.bind(this, 'repo')} />
                  </div>

                  <div>
                      <SelectField value={this.config.type} floatingLabelText="Type" style={styles.customWidth} onChange={this.handleChange.bind(this, 'type')}>
                          {
                              types.map((vtype, index) => {
                                  return <MenuItem value={vtype.value} primaryText={vtype.label} key={index} />;
                              })
                          }
                      </SelectField>
                  </div>

                  <div style={styles.block}>
                      <Toggle
                          className="form-button"
                          disabled={!this.state.fabToggleEnabled}
                          label="FAB (Floating Action Button)"
                          labelPosition="right"
                          style={styles.toggle}
                          onToggle={this.handleChange.bind(this, 'fab')}
                          defaultToggled={this.config.fab}
                      />
                  </div>
                </section>
              </div>

              <div className="pure-u-1 pure-u-md-1-2">
                <section>

                 <div>
                    <div>
                      <TextField hintText="Icon Color" onChange={this.handleChange.bind(this, 'iconColor')} disabled={!this.state.buttonControlsEnabled} />
                    </div>

                    <div>
                      <TextField hintText="Icon Width" onChange={this.handleChange.bind(this, 'iconWidth')} disabled={!this.state.buttonControlsEnabled} />
                    </div>

                    <div>
                      <TextField hintText="Icon Height" onChange={this.handleChange.bind(this, 'iconHeight')} disabled={!this.state.buttonControlsEnabled} />
                    </div>
                  </div>

                  <SelectField
                      value={this.config.fabCorner}
                      floatingLabelText="FAB Corner"
                      style={styles.customWidth}
                      onChange={this.handleChange.bind(this, 'fabCorner')}
                      disabled={!this.state.fabCornersEnabled}
                  >
                      {
                          fabCorners.map((vtype, index) => {
                              return <MenuItem value={vtype.value} primaryText={vtype.label} key={index} />;
                          })
                      }
                  </SelectField>

                  <div>
                    <RaisedButton className="form-button" label="Update" primary={true} onClick={this.update.bind(this)} />
                  </div>
                </section>
              </div>

              <div className="pure-u-1 form-code markdown-body">
                <h4>Generated Code</h4>
                <pre className="">
                    {`<Github ${this.transverseProps(ghProps)}>${ ghProps.type==='link' ? 'Hover here' : '' }</Github>`}
                </pre>
              </div>
            </div>

            <div className="pure-u-1 pure-u-lg-1-3">
              <section className="form-example form-centered">
                { gh }
              </section>
            </div>
          </div>

      </div>
    );
  }
}

export default Playground;
