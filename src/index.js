import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { SquareSettings } from './square/squaresettings';
import {JigsawPuzzle} from './puzzle/puzzle'
import {PuzzleSettings} from './puzzle/puzzlesettings'



ReactDOM.render(
  <PuzzleSettings />, 
  document.getElementById('root')
);


