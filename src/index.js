import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css'

import { Home } from './misc_pages/home'
import { AboutUs } from './misc_pages/about_us';
import { WhyGames } from './misc_pages/whygame';
import { GameMenu } from './gamemenu/gamemenu';
import { SquareSettings } from './square/squaresettings';
import { PuzzleSettings } from './puzzle/puzzlesettings';
import { CookingSettings } from './cooking_game/cookingsettings';
import { DinoSettings } from './newdino/dinosettings';
import { LoginPage } from './user_logins/login';
import { SignUpForm } from './user_logins/newaccount';
import { UserPage } from './user_logins/pet'
import { ShopPage } from './user_logins/shop'
import { ReportPage } from './report/page';
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
        <Route path="/" element={<LoginPage />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/whygames" element={<WhyGames />} />
        <Route path="/games" element={<GameMenu />} />
        <Route path="/square" element={<SquareSettings />} />
        <Route path="/puzzle" element={<PuzzleSettings />} />
        <Route path="/cooking" element={<CookingSettings />} />
        <Route path="/dino" element={<DinoSettings />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path="/newuser" element={<SignUpForm />} />
        <Route path="/pet" element={<UserPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/report" element={<ReportPage />} />
      </Routes>
    </Router >
  );
};




ReactDOM.render(
  <React.StrictMode>
    <TitleSetter title="Gamified Rehab" />
    <Routing />
  </React.StrictMode>,
  document.getElementById('root')
);
