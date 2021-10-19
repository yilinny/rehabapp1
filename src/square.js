import React from 'react';
import './index.css';
import TimeComponent from './countdown';
import {GameOver, LevelUp}from './screens';

function generate_coordinates(max) {
    let coord = Math.floor(Math.random() * max)
    let strcoord = String(coord) + 'px'
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
        return(
        <button className='square' 
            style = {{left:generate_coordinates(1000), top:generate_coordinates(800)}}
            onClick ={props.onClick}>
        </button>
        );
}


class GameBoard extends React.Component { //react component starts with caps

    constructor(props) {
        super (props);
        this.state = {
          score_display: score,
          next_level_score:10,
          level_increment: 10,
          game_over: false,
          level_up : false
        };
        this.handleClick= this.handleClick.bind(this);
        this.onTimeOut= this.onTimeOut.bind(this);
        this.gameOver= this.gameOver.bind(this);
        this.onReset= this.onReset.bind(this)
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
        this.setState({
            score_display: score,
            next_level_score:10,
            level_increment: 10,
            game_over: false,
            level_up : false
        }) // reset states to initial state + change in state to trigger rerender?
    }
    
    render (){
        if (this.state.game_over === true) {
            return <GameOver score={score} onClick= {()=>{this.onReset();}}/>
        }
        
        else if (this.state.level_up === true) {
            return <LevelUp />
        }
        
        else {
        return(
        <div>
            <div className='navbar'>{this.state.score_display}</div>
            <TimeComponent time = {5} onGameOver = {()=> {this.gameOver()}}/>
            <Square onClick = {()=>{this.handleClick();}}/>
        </div>
        )};
    }
}

export default GameBoard;
