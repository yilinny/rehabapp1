//holds level up and gameover screen, to be reused across different games

import React from 'react';
import './index.css'


export function GameOver (props){
        return(
            <div className='container'> 
                <h1> Game over!</h1>
                <h2>Score:{props.score} </h2>
                <button onClick={props.onClick}> Retry</button>
            </div>
        )

}

export function LevelUp () {
    return (
        <div className='container'>
            <h1>Level up!</h1>
            <h4>Go faster now!!</h4> 
        </div>
    )
}
//can change go faster now to prop.unique_input

