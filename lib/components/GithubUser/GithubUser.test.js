import React from 'react';
import ReactDOM from 'react-dom';
import GithubUser from './GithubUser';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GithubUser />, div);
});
