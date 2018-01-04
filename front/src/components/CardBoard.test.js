import React from 'react';
import ReactDOM from 'react-dom';
import CardBoard from "./ProfileBoard";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CardBoard />, div);
});
