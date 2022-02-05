import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css'

import { GameMenu } from './gamemenu/gamemenu';
import { SquareSettings } from './square/squaresettings';
import { PuzzleSettings } from './puzzle/puzzlesettings';
import { CookingSettings } from './cooking_game/cookingsettings';
import {Dino} from './dinogame/dino_jump';

const TitleSetter = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
  return null;
};

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GameMenu />} />
        <Route path="/square" element={<SquareSettings />} />
        <Route path="/puzzle" element={<PuzzleSettings />} />
        <Route path="/cooking" element={<CookingSettings />} />
        <Route path="/dino" element={<Dino />} />
      </Routes>
    </Router >
  );
};



ReactDOM.render(
  <React.StrictMode>
    <TitleSetter title="Rehab app" />
    <Routing />
  </React.StrictMode>,
  document.getElementById('root')
);
