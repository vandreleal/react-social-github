import React from 'react';
import ReactDOM from 'react-dom';
import Github from './Github';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Github />, div);
});
