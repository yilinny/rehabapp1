

import React, { useState, useEffect } from 'react'
import './scene1.css'

function resizeContainer (){
    return (1080/1920 * window.innerWidth)
}

 //have to be globally defined if not no work???

 function TapOn(){

    const [playState, setPlay] = useState('paused')
    const [seconds, setSeconds] = useState(0)

    useEffect(()=> {
        var second_interval;
    if (playState === 'running'){
        if (second_interval){clearInterval(second_interval)}
        second_interval = setTimeout(()=> {setSeconds(seconds+ 1)},1000);
        
        if (seconds >= 17){
            setPlay('paused')
            alert ('Oh no, you went past the line! Try again.')
        }

    }

    else if (playState === 'paused') {clearInterval(second_interval)}; 
    
    return function cleanup(){clearInterval(second_interval)}
    }, [seconds, playState])


    return (

        <div>
            <div className= 'water'
            style = {{
                    animation: `drip 1s linear infinite normal forwards ${playState}`,
                    opacity : `${playState === 'paused' ? 0: 1}`,
                        
            }}></div>
    

            <div className= 'cup'> 
               <div className='waterlevel'
                style = {{
                    animation: `fade 25s ease-out 1 normal forwards ${playState}`
                }}></div>
            </div>

            <button className = 'btn' onClick = {() => {
                playState === 'paused' ? setPlay('running') : setPlay('paused') 
            }}></button>
        </div>

       
        
    )
}

function Instructions (props){
    const instructions = [
        'Fill the water',
        'Bring water to pot',
        'Add pasta'
    ];

    let required_instruction=[];

    for (let i = 0; i < 3 ;i ++ ){
        console.log('hi')
        required_instruction.push(instructions[i])} 

    console.log(required_instruction)
    
    return (
        <div className= 'stepscontainer'>
            {required_instruction.map(instruction => <p>{instruction}</p>)}
            <button onClick= {props.onClick}> Let's start!</button>
        </div>

    ) //instructions and container needs serious css

}

export function KitchenOne (steps = 3) {

    const [stepcount, setStep] = useState(0)
    const renderscenes = [
        function renderZero(){return(<Instructions steps = {steps} onClick={()=>{setStep(1)}} />)}, 
        function renderOne (){return(<TapOn/>)}
    ] //an array of functions, each rendering the desired scene. stepcount as index for the scene. Parent container of the scene is the div w background image 
    


    return (
        <div className = 'background'>
        <div className= 'container'
        style = {{
                height: `${resizeContainer()}px`,
                top: `${(window.innerHeight - resizeContainer())/2}px`,
        }}> 
        {renderscenes[stepcount]()} 
         </div>
    </div>)
    
}


//2 times water is water animation 
export default KitchenOne