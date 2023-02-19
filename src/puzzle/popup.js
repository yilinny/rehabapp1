import { Button, Image } from 'semantic-ui-react';
import React, { useState } from 'react';
import './puzzle.css'


export function Puzzleright(props) {
    const [hide, setOpacity] = useState(true)
    const [text, setText] = useState('See Completed Image')

    function buttonClick() {
        if (hide === true) {
            setOpacity(false);
            setText('Hide Completed Image')
        }
        else {
            setOpacity(true);
            setText('See Completed Image')
        }

    }

    return (
        <div>
            <Button style={{ position: 'absolute', top: '5%', left: '85%' }} onClick={buttonClick}> {text} </Button>
            <Image src={props.src} hidden={hide} style={{ width: '20vw', height: 'auto', position: 'absolute', top: '10%', left: '80%' }}></Image>
        </div>
    )
}

export function EndGame(props) {
    return (
        <div className='loading'>
            <h1> Great job!</h1>
            <Image src={props.src} style={{ width: '40vw', height: 'auto' }}></Image>
            <h4> {props.time}</h4>
            <div><Button href='./puzzle'>Another Puzzle</Button>
                <Button href='./games'>Return to game menu</Button>
            </div>
        </div>
    )
}