//holds level up and gameover screen, to be reused across different games

import React from 'react';
import '../index.css'
import {Button } from 'semantic-ui-react';

export function GameOver (props){
        return(
            <div className='gameover-container'> 
                <h1> Game over!</h1>
                <br/>
                <div className='score'>
                    <h2>Score:{props.score} </h2>
                    <br/>
                    <Button onClick={props.onClick}> Retry</Button>
                    <Button onClick={props.Settings}> Change Settings</Button>
                    <br/>
                    <br/>
                    <Button href='./'>Game menu</Button>
                </div>
            </div>
        )

}

export function LevelUp () {
    return (
        <div className='levelup-container'>
            <h1>Level up!</h1>
            <h4>Go faster now!!</h4> 
        </div>
    )
}
//can change go faster now to prop.unique_input

