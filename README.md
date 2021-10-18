# Documentation
[![Build Status](https://travis-ci.org/vandreleal/react-social-github.svg)](https://travis-ci.org/vandreleal/react-social-github)
[![NPM Version](https://badge.fury.io/js/react-social-github.svg)](http://badge.fury.io/js/react-social-github)
[![dependencies Status](https://david-dm.org/vandreleal/react-social-github/status.svg)](https://david-dm.org/vandreleal/react-social-github)
[![devDependencies Status](https://david-dm.org/vandreleal/react-social-github/dev-status.svg)](https://david-dm.org/vandreleal/react-social-github?type=dev)

Showcase your GitHub profile, organization or repository information.

## Install
React Social Github is available as the `react-social-github` package on npm.
```sh
$ npm install react-social-github --save
```

## Usage
```jsx
import { Github } from 'react-social-github';
```

## Reference

### Options

<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>user</td>
    <td>string</td>
    <td>none</td>
    <td>Specify the user or organization to show info about.</td>
  </tr>
  <tr>
    <td>repo</td>
    <td>string</td>
    <td>none</td>
    <td>Specify the repository to show info about. Requires "user"</td>
  </tr>
  <tr>
    <td>objUser</td>
    <td>object</td>
    <td>none</td>
    <td>Specify user or organization object to show info about. The attribute "user" is not considered if the object is passed.</td>
  </tr>
  <tr>
    <td>objRepo</td>
    <td>object</td>
    <td>none</td>
    <td>Set repository object to show info about. The attributes "user" and "repo" are not considered if the object is passed.</td>
  </tr>
  <tr>
    <td>type</td>
    <td>string</td>
    <td>widget</td>
    <td>Specify the type of the component</td>
  </tr>
</table>


## Types


### Widget

The tooltip is inserted as a block element. This is the default type and doesn't require any configuration. The option `type="widget"` can be declared in the component if desired.

#### Example

```jsx
<Github user="facebook" repo="react"></Github>

{/* same as */}

<Github user="facebook" repo="react" type="widget"></Github>
```

### Link

The tooltip is anchored in an inline link. The option `type="link"` must be declared in the component.

#### Example

```jsx
<Github user="hackbit" type="link">Hover Here</Github>

<Github user="vandreleal" repo="vandreleal.github.io" type="link">Hover Here</Github>
```

#### Options

<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>linkText</td>
    <td>string</td>
    <td>"Github"</td>
    <td>Link text</td>
  </tr>
</table>

### Button

The tooltip is anchored in a button. The option `type="button"` must be declared in the component.

#### Options

<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>iconColor</td>
    <td>string</td>
    <td>#000</td>
    <td>Color name, RGB value, hexadecimal value, HSL value or HWB value</td>
  </tr>
  <tr>
    <td>iconWidth</td>
    <td>number</td>
    <td>48px</td>
    <td>Width followed by unit</td>
  </tr>
  <tr>
    <td>iconHeight</td>
    <td>number</td>
    <td>48px</td>
    <td>Height followed by unit</td>
  </tr>
  <tr>
    <td>fab</td>
    <td>bool</td>
    <td>false</td>
    <td>Floating Action Button</td>
  </tr>
  <tr>
    <td>fabCorner</td>
    <td>string</td>
    <td>bottom-right</td>
    <td>Position of the FAB. Possible values: bottom-right, bottom-left, top-right, top-left</td>
  </tr>
  <tr>
    <td>tooltipPosition</td>
    <td>string</td>
    <td>auto</td>
    <td>Force a specific position to show the tooltip. Values: left, right, top, bottom, auto (will make the tooltip adaptive to avoid escaping from the view)</td>
  </tr>
  <tr>
    <td>tooltipOnHover</td>
    <td>bool</td>
    <td>true</td>
    <td>Enable/disable mouse hover events</td>
  </tr>
</table>

#### Example

```jsx
<Github user="facebook" type="tooltip" tooltipOnHover={false} fab={true} fabCorner="top-left" iconColor="#3b5998" iconWidth={64} iconHeight={64}></Github>

<Github user="GustavoKatel" type="tooltip" tooltipOnHover={true} fab={true} fabCorner="bottom-left" iconColor="#888" iconWidth={32} iconHeight={32}></Github>
```


## Open source

React Social Github is available on GitHub for downloading, forking, or contributing.

## License

[The MIT License (MIT)](https://github.com/vandreleal/react-social-github/blob/master/LICENSE)
