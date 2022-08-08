import React from 'react';
import {Button, Item } from 'semantic-ui-react';
import './gamemenu.css'

import browsegames from './pics/browse game.png'
import logo from './pics/logo brown.png'

export class GameMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            games: [
                {
                    id: 'jigsaw-puzzle',
                    name: 'Jigsaw Puzzle',
                    link: '/puzzle',
                    description: 'Jigsaw puzzles from 4-84 pieces to complete. Adaptations available include: uploading own photos, changing the number of pieces, working upon a half solved puzzle, visual quadrants the puzzle pieces appear in and more.',
                    skills: 'Visual processing, Sustained Attention, Gross Motor',
                    side: 'pic'
                },

                {
                    id: 'square-game',
                    name: 'Tap the Square',
                    link: '/square',
                    description: 'Tap the square! High scores and level ups provide motivation to keep at repetition needed. Different game mode allows for games to assess information processing, and keeps things interesting.',
                    skills: 'Gross motor/repetition, information processing, visual assessment, accuracy training',
                    side:'pic'
                },
                {
                    id: 'cooking-game',
                    name: 'Cooking game',
                    link: '/cooking',
                    description: 'Choose from a variety of recipes, grade according to cognitive/physical skills. A way to be occupation-based and take risks within a virtual environment, before proceeding with a real kitchen tasks.',
                    skills: 'Attention, working memory, information processing, gross motor',
                    side:'pic'
                },
                {
                    id: 'dino-game',
                    name: 'Space Dino',
                    link: '/dino',
                    description: 'Help Dino navigate the platforms and explore deep into space. Don\'t let him fall! Adaptationd available include: unilateral control, difficlty, and different modes.', 
                    skills: 'Motor skill/repetition, sustained attention, information processing',
                    side:'pic'
                }
            ],
        };
    }

    changeSide (no, currentSide){
        let new_arr = this.state.games
        new_arr[no] = {
            ...this.state.games[no],
            side:currentSide === 'pic'? 'text': 'pic',
        }
        this.setState({games:new_arr})

    }



    render() {
        return (
            <div className="menucontainer" style={{ backgroundColor: '#006D77' }}>
                <img class='poof' src={logo} alt='logo in brown' style={{position:'absolute', top: '5%', left:'5%',width: '100px'}}></img>
                <a href='./'><btn class='backbtn' style={{backgroundColor:'#ffddd2', top: '150px'}}> back </btn></a>
                <img style={{width:'400px'}}src={browsegames} alt='decorative'></img>
                <div style={{
                    display:'flex', flexDirection:'row', width: '80vw', justifyContent:'center', flexWrap:'wrap'
                }}>
                {this.state.games.map (game=>{
                return(
                    <div className='gamecard' key= {game.id}>
                        {game.side === 'pic' && (
                        <>
                            <img alt='game icon' src={`game_menu_pics/bg-${this.state.games.indexOf(game)}.png`}></img>
                            <h4>{game.name}</h4></>)}
                        {game.side === 'text' &&(
                        <>
                            <h3> {game.name}</h3>
                            <h4> Works on: {game.skills}</h4>
                            <p style={{color:'black'}}>{game.description}</p></>)}
                        <div style={{display:'flex', flexDirection:'row', columnGap: '1vw'}}>
                            <a href={game.link}><btn className='gamecardbtn' > Play!</btn></a>
                            <btn className='gamecardbtn' onClick = {()=> {this.changeSide(this.state.games.indexOf(game), game.side)}}> Info</btn>
                        </div>
                </div>)})}
                </div>
            </div>
        );
    }
}


//


