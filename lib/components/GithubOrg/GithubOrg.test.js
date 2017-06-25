import React from 'react';
import ReactDOM from 'react-dom';
import GithubOrg from './GithubOrg';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GithubOrg />, div);
});
