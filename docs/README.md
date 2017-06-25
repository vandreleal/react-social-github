# React Social Github
[![Build Status](https://travis-ci.org/vandreleal/react-social-github.svg)](https://travis-ci.org/vandreleal/react-social-github)
[![NPM Version](https://badge.fury.io/js/react-social-github.svg)](http://badge.fury.io/js/react-social-github)
[![dependencies Status](https://david-dm.org/vandreleal/react-social-github/status.svg)](https://david-dm.org/vandreleal/react-social-github)
[![devDependencies Status](https://david-dm.org/vandreleal/react-social-github/dev-status.svg)](https://david-dm.org/vandreleal/react-social-github?type=dev)
[![Coverage Status](https://coveralls.io/repos/github/vandreleal/react-social-github/badge.svg?branch=master)](https://coveralls.io/github/vandreleal/react-social-github?branch=master)

Showcase your GitHub profile, organization or repository information in an elegant way.

---

## Install
React Social Github is available as the `react-social-github` package on npm.
```sh
$ npm install react-social-github --save
```
---

## Usage
```jsx
import { Github } from 'react-social-github';
```
---

## Reference

#### Attributes

<table>
  <tr>
    <th>Name</th>
    <th>Default</th>
  </tr>
  <tr>
    <td>min-width</td>
    <td>`240px`</td>
  </tr>
  <tr>
    <td>max-width</td>
    <td>`320px`</td>
  </tr>
</table>

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
    <td>`string`</td>
    <td>none</td>
    <td>Specify the username to show info about. Conflicts with `org`</td>
  </tr>
  <tr>
    <td>repo</td>
    <td>`string`</td>
    <td>none</td>
    <td>Specify the repository to show info about. Requires `user`</td>
  </tr>
  <tr>
    <td>org</td>
    <td>`string`</td>
    <td>none</td>
    <td>Specify the organization to show info about. Conflicts with `user`</td>
  </tr>
  <tr>
    <td>type</td>
    <td>`string`</td>
    <td>`widget`</td>
    <td>Specify the type of the component. See [types](#Types).</td>
  </tr>
</table>

---

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
<Github user="gustavokatel" type="link">Hover Here</Github>
```

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
    <td>`string`</td>
    <td>#000</td>
    <td>Color name, RGB value, hexadecimal value, HSL value or HWB value.</td>
  </tr>
  <tr>
    <td>iconWidth</td>
    <td>`number`</td>
    <td>48</td>
    <td>px.</td>
  </tr>
  <tr>
    <td>iconHeight</td>
    <td>`number`</td>
    <td>48</td>
    <td>px.</td>
  </tr>
  <tr>
    <td>fab</td>
    <td>`bool`</td>
    <td>false</td>
    <td>Floating Action Button</td>
  </tr>
  <tr>
    <td>fabCorner</td>
    <td>`string`</td>
    <td>bottom-right</td>
    <td>Position of the FAB. Possible values: `bottom-right`, `bottom-left`, `top-right`, `top-left`</td>
  </tr>
  <tr>
    <td>tooltipPosition</td>
    <td>`string`</td>
    <td>`auto`</td>
    <td>Force a specific position to show the tooltip. Values: `left`, `right`, `top`, `bottom`, `auto` (will make the tooltip adaptive to avoid escaping from the view)</td>
  </tr>
  <tr>
    <td>tooltipOnHover</td>
    <td>`bool`</td>
    <td>`true`</td>
    <td>Enable/disable mouse hover events</td>
  </tr>
</table>

#### Example

```jsx
<Github org="facebook" type="tooltip" tooltipOnHover={false} fab={true} fabCorner="top-left" iconColor="#3b5998" iconWidth={64} iconHeight={64}></Github>
```

---

## More Examples

Please proceed to the official page for more examples.

---

## Team
+ [Vandré Leal Cândido](https://github.com/vandreleal)
+ [Gustavo Sampaio](https://github.com/GustavoKatel)
+ [Emerson Jair Reis Oliveira da Silva](https://github.com/dungahk)

---

## Open source

React Social Github is available on GitHub for downloading, forking, or contributing.