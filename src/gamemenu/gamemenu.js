import React from 'react';
import {Button } from 'semantic-ui-react';
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
                    description: 'Jigsaw puzzles from 4-84 pieces to complete. Adaptations available include: uploading own photos, changing the number of pieces, working upon a half solved puzzle, visual quadrants the puzzle pieces appear in and more. Works upon: visual processing, sustained attention, gross motor skills (via dragging and dropping)',
                },

                {
                    id: 'square-game',
                    name: 'Tap the Square',
                    link: '/square',
                    description: 'Tap the square! High scores and level ups provide motivation to keep at repetition needed. Different game mode allows for games to assess information processing, and keeps things interesting. Works upon: gross motor/repetition, information processing, visual assessment, accuracy training'
                },
                {
                    id: 'cooking-game',
                    name: 'Cooking game',
                    link: '/cooking',
                    description: 'Choose from a variety of recipes, grade according to cognitive/physical skills. A way to be occupation-based and take risks within a virtual environment, before proceeding with a real kitchen tasks. Works upon: attention, working memory, information processing, gross motor'
                },
                {
                    id: 'dino-game',
                    name: 'Space Dino',
                    link: '/dino',
                    description: 'Help Dino navigate the platforms and explore deep into space. Don\'t let him fall! Adaptationd available include: unilateral control, difficlty, and different modes. Works upon: motor skill/repetition (via tapping; increase impact by challenging clients to tap with specific fingers), sustained attention, information processing'
                }
            ],

            chosenid: 0
        };

        this.onChangeDirection= this.onChangeDirection.bind(this);
    }

    onChangeDirection (direction) {
        let a= this.state.chosenid;
        (direction=== 'L')? a= a -1 : a = a+1
        if (a > 3 || a < 0) {
            (a > 3)? a=0 : a=3
        }
        this.setState({chosenid: a})

    }



    render() {
        return (
            <div className="menucontainer" style={{ backgroundColor: '#006D77' }}>
                <img class='poof' src={logo} alt='logo in brown' style={{position:'absolute', top: '5%', left:'5%',width: '100px'}}></img>
                <a href='./'><btn class='backbtn' style={{backgroundColor:'#ffddd2', top: '150px'}}> back </btn></a>
                <img style={{width:'400px'}}src={browsegames} alt='decorative'></img>
                <div className='gamecard'>
                    <img alt='game icon' src={`game_menu_pics/bg-${this.state.chosenid}.png`}></img>
                    <h2>{this.state.games[this.state.chosenid].name}</h2>
                    <p style={{color:'black'}}>{this.state.games[this.state.chosenid].description}</p>
                    <a href={this.state.games[this.state.chosenid].link}><btn className='gamecardbtn' > Play now!</btn></a>
                </div>
                <div>
                <Button icon='angle left' onClick={()=>{this.onChangeDirection('L')}}/>
                <Button  icon='angle right' onClick={()=>{this.onChangeDirection('R')}}/>
                </div>
            </div>
        );
    }
}


//


