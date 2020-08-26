import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Game';

ReactDOM.render(
  <React.StrictMode>
    <Game height='25' width='49'/>
  </React.StrictMode>,
  document.getElementById('root')
);
