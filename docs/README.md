# React Social Github
[![Build Status](https://travis-ci.org/vandreleal/react-social-github.svg)](https://travis-ci.org/vandreleal/react-social-github)
[![NPM Version](https://badge.fury.io/js/react-social-github.svg)](http://badge.fury.io/js/react-social-github)
[![dependencies Status](https://david-dm.org/vandreleal/react-social-github/status.svg)](https://david-dm.org/vandreleal/react-social-github)
[![devDependencies Status](https://david-dm.org/vandreleal/react-social-github/dev-status.svg)](https://david-dm.org/vandreleal/react-social-github?type=dev)
[![Coverage Status](https://coveralls.io/repos/github/vandreleal/react-social-github/badge.svg?branch=master)](https://coveralls.io/github/vandreleal/react-social-github?branch=master)

Showcase your GitHub profile, organization or repository information in an elegant way.

---

## Install
React Social Github is available as the react-social-github package on npm.
```sh
$ npm install react-social-github --save
```
---

## Usage
```jsx
import { Github } from 'react-social-github';

ReactDOM.render(

  <GitHub user="torvalds" />

  <GitHub org="facebook" />

  <GitHub user="facebook" repo="react" />

);
```
---

## Reference

---

## Types

### Tooltip

Adaptive floating tooltips with anchor button

#### Options

Name | Type | Default | Description
:---: | :---: | :---: | :---
iconColor | `string` | `none` |
iconWidth | `number` | 48 |
iconHeight | `number` | 48 |
fab | `bool` | false | Android like Floating Action Button
fabCorner | `string` | bottom-right | Position of the FAB. Possible values: `bottom-right`, `bottom-left`, `top-right`, `top-left`
tooltipPosition | `string` | `auto` | Force a specific position to show the tooltip. Values: `left`, `right`, `top`, `bottom`, `auto` (will make the tooltip adaptive to avoid escaping from the view)

---

## Team
+ [Vandré Leal Cândido](https://github.com/vandreleal)
+ [Gustavo Sampaio](https://github.com/GustavoKatel)
+ [Emerson Jair Reis Oliveira da Silva](https://github.com/dungahk)

---

## Open source

React Social Github is available on GitHub for downloading, forking, or contributing.