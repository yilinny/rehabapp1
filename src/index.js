import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './index.css';

import { GameMenu } from './gamemenu/gamemenu';
import { SquareSettings } from './square/squaresettings';
import {PuzzleSettings} from './puzzle/puzzlesettings';

const Routing = () => {
  return(
    <Router>
      <Routes>
        <Route path="/" element={ <GameMenu /> } />
        <Route path="/square" element={ <SquareSettings /> } />
        <Route path="/puzzle" element={ <PuzzleSettings /> } />
      </Routes> 
    </Router >
  );
}



ReactDOM.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>,
  document.getElementById('root')
);
