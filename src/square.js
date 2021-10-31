import React from 'react';
import './index.css';
import TimeComponent from './countdown';
import {GameOver, LevelUp}from './screens';
import { increase_distribution, randomfive } from './adaptations';
import { SquareSettings } from './settings';
import {Circle} from './adaptations'

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
    let size = [];
    //chosen quad passed down as props.quad

   

    if (props.quad === 'nil'&& props.noquad==='nil'){
        coords = [generate_coordinates('x'), generate_coordinates('y')]}
    
    else{
        let chosen_quad = props.quad;
        let unchosen = props.noquad;
        if (typeof chosen_quad === 'string'){chosen_quad=[chosen_quad]} 
        if (typeof unchosen === 'string'){unchosen=[unchosen]}
        //convert string into array -if not the two letters would be read as a single array, and 'U' would not be recognized
        
        coords = increase_distribution(chosen_quad, unchosen)} 

    

    if (props.size === 's'){size = ['2.5vw', '5vh']}
    else if (props.size === 'l'){size = ['10vw', '20vh']}
    else{size = ['5vw', '10vh']}

    let no;

    if (props.square_no === 0) {no = ''}
    else {no =props.square_no} //for adapted one
    return(
        <button className='square' 
            style = {{left: coords[0], top: coords[1], width: size[0], height: size[1]}}
            onClick ={props.onClick}>
                {no}

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
          settings_page: false,
          game_mode: props.mode,
          lives: props.lives,
          circles: [0,1,2], //starts with 3 circles
          square_no: props.square_no
        };

        //need this to hold settings as well, passing the function to set state down into the settings function 

        this.handleClick= this.handleClick.bind(this);
        this.onTimeOut= this.onTimeOut.bind(this);
        this.gameOver= this.gameOver.bind(this);
        this.onReset= this.onReset.bind(this)
        this.onChangeSettings= this.onChangeSettings.bind(this)
        this.handleCircle= this.handleCircle.bind(this)
    };
    
    onTimeOut(){
        //what happens at the end of level up screen
        this.setState({
            level_up: false, 
            level_increment: updateTarget(this.state.level_increment), 
            next_level_score: score + this.state.level_increment})

        if (this.state.game_mode==='1'){
            let new_arr = []
            for (let i = 1; i <= this.state.circles.length + 2; i ++) {new_arr.push(i)} //2 new circles each round 
            this.setState({circles:new_arr})
        }
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

        if (this.game_mode === '1'){this.setState({lives:3})} 
    }

    onChangeSettings(){
        score = 0
        this.setState({settings_page: true})
    }

    handleCircle(){
        //lose one life 
        this.setState({lives:(this.state.lives)-1})
        //check for game over
        if (this.state.lives === 0){this.gameOver()}
    }

    changeNo(){
        if (this.square_no > 1)
        this.setState({})
    }
    
    render (){
        if (this.state.settings_page===true){
            return <SquareSettings/>
        }
        else if (this.state.game_over === true) {
            return <GameOver score={score} Settings = {()=> this.onChangeSettings()} onClick= {()=>{this.onReset();}}/>
        }
        
        else if (this.state.level_up === true) {
            return <LevelUp />
        }
        else if (this.state.game_mode === '1') {
            return(
            <div>
                <div className='navbar'>{this.state.score_display} lives left: {this.state.lives}</div>
                <TimeComponent time = {20} onGameOver = {()=> {this.gameOver()}}/>
                <Square onClick = {()=>{this.handleClick();}} quad = {this.props.quad} noquad={this.props.noquad} size={this.props.size} square_no={this.state.square_no}/> 
                {this.state.circles.map((circle, index) => (<Circle key={index} onClick = {()=>{this.handleCircle();}} quad = {this.props.quad} noquad={this.props.noquad}/>))}
            </div>
        )}

        else if (this.state.game_mode === '2') {
            return(
                <div>
                    <div className='navbar'>{this.state.score_display} lives left: {this.state.lives}</div>
                    <TimeComponent time = {20} onGameOver = {()=> {this.gameOver()}}/>
                    <Square onClick = {()=>{this.changeNo();}} quad = {this.props.quad} noquad={this.props.noquad} size={this.props.size} square_no={this.state.square_no}/> 
                </div>
            )}

        else {
        return(
        <div>
            <div className='navbar'>{this.state.score_display}</div>
            <TimeComponent time = {20} onGameOver = {()=> {this.gameOver()}}/>
            <Square onClick = {()=>{this.handleClick();}} quad = {this.props.quad} noquad={this.props.noquad} size={this.props.size} square_no={this.state.square_no}/> 
        </div>
        )};
        //passed down chosen quad from settings to square using quad = {this.props.quad}
    }
}

export default GameBoard;
