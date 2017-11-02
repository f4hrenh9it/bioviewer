import React from 'react';
import ReactDOM from 'react-dom';
import CardBoard from "./CardBoard";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CardBoard />, div);
});
