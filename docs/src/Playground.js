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
      fabCorner: '',
      iconColor: '',
      iconHeight: '',
      iconWidth: '',
      linkText: '',
      repo: '',
      repoErrorText: '',
      type: 'widget',
      user: ''
    }

    this.state = {
        buttonControlsEnabled: false,
        fab: false,
        fabCorner: '',
        fabCornersEnabled: false,
        fabToggleEnabled: false,
        iconColor: '',
        iconHeight: '',
        iconWidth: '',
        linkText: '',
        repo: 'react',
        repoErrorText: '',
        type: 'widget',
        user: 'facebook'
    };
  }

  handleChange(name, event, key, value) {
    let nValue = typeof value !== 'undefined' ? value : key;
    this.config[name] = nValue;

    let delta = {};

    if(name === 'repo') {
        if(!this.config.user && this.config.repo) {
            delta.repoErrorText = 'User missing';
        } else {
            delta.repoErrorText = '';
        }
    }

    if(name === 'type') {
        delta.fabToggleEnabled = nValue === 'button';
        delta.buttonControlsEnabled = nValue === 'button';
        delta.fabCornersEnabled = nValue === 'button' && this.config.fab === true;
        delta.linkControlsEnabled = nValue === 'link';
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
        linkText: this.state.linkText,
        tooltipOnHover: true
    };

    if(typeof this.state.repo === 'string' && this.state.repo.length>0) {
        ghProps.repo = this.state.repo;
    }

    if(typeof this.state.user === 'string' && this.state.user.length>0) {
        ghProps.user = this.state.user;
    }

    let gh = <Github { ...ghProps } key={this.state.user + '/' + this.state.repo}> </Github>;

    return (
      <div className="playground">

        <div className="pure-g">
          <div className="pure-u-1">
            <div className="pure-u-1 pure-u-md-1-2 pure-u-lg-1-3">
              <section className="form-section">
                  <h4 className="form-title">Github Info</h4>

                  <div>
                    <TextField
                      hintText="Username"
                      onChange={this.handleChange.bind(this, 'user')}
                      value={this.config.user}
                    />
                  </div>

                  <div>
                    <TextField
                      errorText={this.state.repoErrorText}
                      hintText="Repository"
                      onChange={this.handleChange.bind(this, 'repo')}
                      value={this.config.repo}
                    />
                  </div>

                  <div>
                      <SelectField
                        floatingLabelText="Type"
                        onChange={this.handleChange.bind(this, 'type')}
                        style={styles.customWidth}
                        value={this.config.type}
                      >
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
                          onToggle={this.handleChange.bind(this, 'fab')}
                          style={styles.toggle}
                          value={this.config.fab}
                        />
                  </div>

                  { this.state.fabCornersEnabled &&
                    <SelectField
                        disabled={!this.state.fabCornersEnabled}
                        floatingLabelText="FAB Corner"
                        onChange={this.handleChange.bind(this, 'fabCorner')}
                        style={styles.customWidth}
                        value={this.config.fabCorner}
                    >
                    {
                      fabCorners.map((vtype, index) => {
                          return <MenuItem value={vtype.value} primaryText={vtype.label} key={index} />;
                      })
                    }
                    </SelectField>
                  }

                </section>
              </div>

              <div className="pure-u-1 pure-u-md-1-2 pure-u-lg-1-3">
                <section className="form-section">
                  <h4 className="form-title">Optional settings</h4>

                  { (!this.state.buttonControlsEnabled && !this.state.fabCornersEnabled && !this.state.linkControlsEnabled) &&
                    <div className="form-message">
                      More options will be available here once the type is changed to 'Link' or 'Button'.
                    </div>
                  }

                  { this.state.buttonControlsEnabled &&
                    <div>
                      <div>
                        <TextField
                          disabled={!this.state.buttonControlsEnabled}
                          hintText="Icon color (any CSS valid unit)"
                          onChange={this.handleChange.bind(this, 'iconColor')}
                          value={this.config.iconColor}
                        />
                      </div>

                      <div>
                        <TextField
                          disabled={!this.state.buttonControlsEnabled}
                          hintText="Icon width (any CSS valid unit)"
                          onChange={this.handleChange.bind(this, 'iconWidth')}
                          value={this.config.iconWidth}
                        />
                      </div>

                      <div>
                        <TextField
                          disabled={!this.state.buttonControlsEnabled}
                          hintText="Icon height (any CSS valid unit)"
                          onChange={this.handleChange.bind(this, 'iconHeight')}
                          value={this.config.iconHeight}
                        />
                      </div>
                    </div>
                  }

                  { this.state.linkControlsEnabled &&
                    <div>
                      <TextField
                        hintText="Link Text"
                        onChange={this.handleChange.bind(this, 'linkText')}
                        value={this.config.linkText}
                      />
                    </div>
                  }

                  <div>
                    <RaisedButton
                      className="form-button"
                      label="Generate"
                      onClick={this.update.bind(this)}
                      primary={true}
                    />
                  </div>

                </section>
              </div>

              <div className="pure-u-1 pure-u-md-1-2 pure-u-lg-1-3">
                <section className="form-section form-example">
                  <h4 className="form-title">Preview</h4>
                  <div className="preview">
                    { gh }
                  </div>
                </section>
              </div>

              <div className="pure-u-1 pure-u-md-1-2 pure-u-lg-1">
                <div className="form-section form-code markdown-body">
                  <h4 className="form-title">Generated Code</h4>
                  <pre className="">
                      {`<Github ${this.transverseProps(ghProps)}></Github>`}
                  </pre>
                </div>
              </div>

            </div>
          </div>
      </div>
    );
  }
}

export default Playground;
