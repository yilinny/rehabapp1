import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { SquareSettings } from './square/squaresettings';
import {JigsawPuzzle} from './puzzle/puzzle'



ReactDOM.render(
  <JigsawPuzzle
  columns={6}
  imageSrc="https://images.unsplash.com/photo-1595045051853-05ef47bdfdbe?3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
  onSolved={alert('yay')}
  rows={3} />,
  document.getElementById('root')
);


