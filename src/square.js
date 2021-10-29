import React from 'react';
import './index.css';
import TimeComponent from './countdown';
import {GameOver, LevelUp}from './screens';
import { increase_distribution } from './adaptations';
import { Settings } from './settings';

function generate_coordinates(side) {
    let coord = Math.floor(Math.random() * 100) + 1
    let strcoord;
    if (side ==='x') {strcoord= String(coord) + 'vw'}
    else if (side ==='y') {strcoord= String(coord) + 'vh'}
    return (strcoord)
}//randomly places square

const updateTarget = (level_increment) => {
    // y =  0.8x + 3 (x is current increment to level up)
    // y-3/0.8 = x (y is new increment to level up)
   let currentX = (level_increment-3)/(1.4)
   currentX ++ 
   level_increment = Math.ceil((currentX*1.4 + 3))
   return (level_increment)
} //ie. need to tap more squares /20s --> difficulty increases

  
let score = 0


function Square (props){
    let coords = [];
    //chosen quad passed down as props.quad
    if (props.quad === 'nil'){
        coords = [generate_coordinates('x'), generate_coordinates('y')]}
    else{
    coords = increase_distribution([props.quad])}

    console.log(coords)

    return(
        <button className='square' 
            style = {{left: coords[0], top: coords[1]}}
            onClick ={props.onClick}>
        </button>
        );
} //can i input left and top coords in props so then i can have - blocked out, increased disribution, total random


class GameBoard extends React.Component { //react component starts with caps

    constructor(props) {
        super (props);
        this.state = {
          score_display: score,
          next_level_score:10,
          level_increment: 10,
          game_over: false,
          level_up : false,
          settings_page: false
        };

        //need this to hold settings as well, passing the function to set state down into the settings function 

        this.handleClick= this.handleClick.bind(this);
        this.onTimeOut= this.onTimeOut.bind(this);
        this.gameOver= this.gameOver.bind(this);
        this.onReset= this.onReset.bind(this)
        this.onChangeSettings= this.onChangeSettings.bind(this)
    };
    
    onTimeOut() {
        this.setState({
            level_up: false, 
            level_increment: updateTarget(this.state.level_increment), 
            next_level_score: score + this.state.level_increment})
    }
    handleClick(){
        score += 1
        this.setState({score_display: score})
        //if level up
        if (score === this.state.next_level_score)
            {setTimeout(() => {this.onTimeOut()}, 3000);
            this.setState({level_up: true})}
    }

    gameOver (){this.setState({game_over: true})} //rerender is triggered with change of state
    
    onReset(){
        score = 0
        this.setState({
            score_display: score,
            next_level_score:10,
            level_increment: 10,
            game_over: false,
            level_up : false
        }) // reset states to initial state + change in state to trigger rerender
    }

    onChangeSettings(){
        score = 0
        this.setState({settings_page: true})
    }
    
    render (){
        if (this.state.settings_page===true){
            return <Settings/>
        }
        else if (this.state.game_over === true) {
            return <GameOver score={score} Settings = {()=> this.onChangeSettings()} onClick= {()=>{this.onReset();}}/>
        }
        
        else if (this.state.level_up === true) {
            return <LevelUp />
        }
        
        else {
        return(
        <div>
            <div className='navbar'>{this.state.score_display}</div>
            <TimeComponent time = {20} onGameOver = {()=> {this.gameOver()}}/>
            <Square onClick = {()=>{this.handleClick();}} quad = {this.props.quad}/> 
        </div>
        )};
        //passed down chosen quad from settings to square using quad = {this.props.quad}
    }
}

export default GameBoard;
