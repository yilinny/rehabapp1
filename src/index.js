import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { SquareSettings } from './square/squaresettings';
import {JigsawPuzzle} from './puzzle/puzzle'
import {PuzzleSettings} from './puzzle/puzzlesettings'
import {Tap} from './cooking_game/scene1'
import {GameMenu} from './gamemenu/gamemenu'



ReactDOM.render(
  <Tap />, 
  document.getElementById('root')
);


