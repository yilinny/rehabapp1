
import React, { useState, useEffect } from 'react'
import './scene1.css'

function resizeContainer (){
    return (1080/1920 * window.innerWidth)
}

 //have to be globally defined if not no work???

export function Tap (){
    const [playState, setPlay] = useState('paused')
    const [seconds, setSeconds] = useState(0)

    useEffect(()=> {
        var second_interval;
    if (playState === 'running'){
        second_interval = setInterval(()=> {setSeconds(seconds+ 1)},1000);
        console.log(seconds)
    }

    else if (playState === 'paused') {clearInterval(second_interval); 
    
    return function cleanup(){clearInterval(second_interval)
    }
    }}, [playState, seconds])


    return (
        <div className = 'background'>
        <div className= 'container'
        style = {{
                height: `${resizeContainer()}px`,
                top: `${(window.innerHeight - resizeContainer())/2}px`,
        }}> 

            <div className= 'water'
            style = {{
                    animation: `drip 1s linear infinite normal forwards ${playState}`,
                    opacity : `${playState === 'paused' ? 0: 1}`,
                        
            }}></div>
    

            <div className= 'cup'> 
               <div className='waterlevel'
                style = {{
                    animation: `fade 20s ease-out 1 normal forwards ${playState}`
                }}></div>
            </div>


            <button className = 'btn' onClick = {() => {
                playState === 'paused' ? setPlay('running') : setPlay('paused') 

            }}></button>
        </div>
    </div>
        
    )
}

//2 times water is water animation 
export default Tap