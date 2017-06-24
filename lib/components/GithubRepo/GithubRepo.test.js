import React from 'react';
import ReactDOM from 'react-dom';
import GithubRepo from './GithubRepo';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GithubRepo />, div);
});
