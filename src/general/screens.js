//holds level up and gameover screen, to be reused across different games

import React from 'react';
import '../index.css'
import '../square/square.css'
import { Button } from 'semantic-ui-react';

export function GameOver(props) {
    return (
        <div className='gameover-container' style={{ rowGap: '2vh' }}>
            <h1> Game over!</h1>
            <h1>Score: {props.score} </h1>
            <div style={{
                display: 'flex',
                flexDirection: 'row'
            }}>
                <Button onClick={props.onClick}> Retry</Button>
                <Button onClick={props.Settings}> Change Settings</Button>
            </div>
            <Button href='./games'>Game menu</Button>

        </div>
    )

}

export function LevelUp() {
    return (
        <div className='levelup-container'>
            <h1>Level up!</h1>
            <h4>Go faster now!!</h4>
        </div>
    )
}

//can change go faster now to prop.unique_input

