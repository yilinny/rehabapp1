import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css'

import {Home} from './misc_pages/home'
import { AboutUs } from './misc_pages/about_us';
import  {WhyGames}  from './misc_pages/whygame';
import { GameMenu } from './gamemenu/gamemenu';
import { SquareSettings } from './square/squaresettings';
import { PuzzleSettings } from './puzzle/puzzlesettings';
import { CookingSettings } from './cooking_game/cookingsettings';
import { DinoSettings } from './dinogame/dino_settings';

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
        <Route path="/" element={<Home/>} />
        <Route path ="/aboutus" element ={<AboutUs/>} />
        <Route path ="/whygames" element ={<WhyGames/>} />
        <Route path="/games" element={<GameMenu />} />
        <Route path="/square" element={<SquareSettings />} />
        <Route path="/puzzle" element={<PuzzleSettings />} />
        <Route path="/cooking" element={<CookingSettings />} />
        <Route path="/dino" element={<DinoSettings />} />
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
