import React, { useState, useEffect, useRef } from 'react'
import Draggable from 'react-draggable'
import './tap.css'
import recipes from './recipes'

function resizeContainer (){
    return (1080/1920 * window.innerWidth)
} //resized height in px 
 //have to be globally defined if not no work???

const potCoords = {
    x: 0.375*(window.innerWidth), // midpoint coordinates 
    y: 0.3*(resizeContainer()), //midpoint coordinates
    radiusX: 0.07*(window.innerWidth),
    radiusY: 0.07*(resizeContainer())
}

 function TapOn(props){

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

    else if (playState === 'paused') {
        clearInterval(second_interval)
        if (seconds >= 13){
            props.onPass()
        }
    }; 
    
    return function cleanup(){clearInterval(second_interval)}
    //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [seconds, playState])


    return (

        <div>
            <div className= 'tap_pot'></div>
            <div className= 'rice'></div>
            <div className= 'pasta'></div>
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
        'Fill the water to the red line.',
        `Add ${props.carbs}`,
        'Bring water to pot'
    ];

    let required_instruction=[];

    for (let i = 0; i < props.steps ;i ++ ){
        required_instruction.push(instructions[i])} 

    if (props.steps === 3) {
        required_instruction= [instructions[0], instructions[2], instructions[1]]
    }
    
    return (
        <div>
            <div className= 'tap_pot'></div>
            <div className= 'rice'></div>
            <div className= 'pasta'></div>
            <div className= 'stepscontainer'>
                {required_instruction.map((instruction, index) => <p key={`instruction-${index}`}>{instruction}</p>)}
                <button onClick= {props.onClick}> Let's start!</button>
        </div>
        </div>

    ) //instructions and container needs serious css

}

function DragCup (props){
    const cupRef = useRef(null);
    const [posX, setposX] = useState(0.71*window.innerWidth)
    const [posY, setposY] = useState(0.45*resizeContainer())

    
    const handleDrag = (e,ui) => {
        setposX (posX + ui.deltaX)
        setposY (posY + ui.deltaY) 
    }


    const handleCheck = (e, ui) => {
        if (Math.abs(posX - potCoords.x) < potCoords.radiusX && Math.abs(posY - potCoords.y) < potCoords.radiusY) {
           props.onPass()
        }
        return false
    }

    return(
        <div>
            <div className= 'tap_pot'></div>
            <div className= 'rice'></div>
            <div className= 'pasta'></div>
                <Draggable nodeRef = {cupRef} onDrag = {handleDrag} onStop = {handleCheck}>
                <div ref = {cupRef} className='cup'>
                    <div  className='waterlevel'
                    style= {{
                        opacity: '1',
                        height: '55%'
                    }}></div>
                </div>
                </Draggable>   
        </div>
    )
}

function AddCarbs (props){
    const riceRef = useRef(null)
    const pastaRef = useRef(null)
    const [initialX, setInitialX] = useState([0.05*window.innerWidth, 0.13*window.innerWidth])// initial x of rice, pasta 
    const [rice, setRice] = useState([0.05*(window.innerWidth),0.3*resizeContainer()])
    const [pasta, setPasta] = useState([0.13 * window.innerWidth, 0.3 * resizeContainer()])
    
    function handleRice(e, ui){
        let newRice =[rice[0]+ ui.deltaX, rice[1] + ui.deltaY]
        setRice(newRice)
    }
    function handlePasta(e, ui){
        let newPasta =[pasta[0]+ ui.deltaX, pasta[1] + ui.deltaY]
        setPasta(newPasta)
    }
    function handleCheck (){
        if (rice[0] !== initialX[0]) {
            //check for change, honestly just assume x will changed at least by 0.01 when moved. 
            if (Math.abs(rice[0]- potCoords.x) < potCoords.radiusX && Math.abs(rice[1]-potCoords.y)<potCoords.radiusY) {
                if (props.carbs === 'rice') {props.onPass()}
                else {setInitialX([rice[0], initialX[1]]); alert ('Please fill it with pasta instead!')} //changing initial means won't trigger repeated alerts
            }
        }
        else if (pasta[0] !== initialX[1]) {
            if (Math.abs(pasta[0]- potCoords.x) < potCoords.radiusX && Math.abs(pasta[1]-potCoords.y)<potCoords.radiusY) {
                if (props.carbs ==='pasta') {props.onPass()}
                else {setInitialX([initialX[0],pasta[0]]); alert ('Please fill it with rice instead!')} //changing initial means won't trigger repeated alerts
            }
        }

        return false
    }
    return (
        <div>
            <div className= 'tap_pot'></div>
            <Draggable nodeRef = {riceRef} onDrag = {handleRice} onStop = {handleCheck}> 
                <div ref = {riceRef} className= 'rice'></div> 
            </Draggable>
            <Draggable nodeRef = {pastaRef} onDrag = {handlePasta} onStop = {handleCheck}> 
                <div ref = {pastaRef} className= 'pasta'></div> 
            </Draggable>
                <div className='cup'
                style = {{
                    top: '20%',
                    left: '40%',
                    animation: `pour 3s linear 1 normal forwards`}}>
                    <div className='waterlevel'
                    style= {{
                        opacity: '1',
                        height: '55%'
                    }}></div>
                </div>
        </div>
    )

}

function PourCarbs (props) {
    let othercarb;
    (props.carbs === 'rice') ? othercarb= 'pasta' : othercarb= 'rice' 
    setTimeout(props.onPass, 3000)

    return (
        <div>
            <div className= 'tap_pot'></div> 
            <div className= {props.carbs}
            style = {{
                top: '20%',
                left: '40%',
                animation: `pour 3s linear 1 normal forwards`
            }}></div>
            <div className= {othercarb}
            style = {{
                animation: `disappear 3s ease-out 1 normal forwards`
            }}>
            </div>

        </div>
    )

}


export const KitchenOne =  ({recipeNo = 4, stepNo = 4, difficulty = 2, next_step}) => {
    console.log(recipeNo)
    console.log(recipes[0])
    let task = recipes[recipeNo].step[stepNo]
    
    const steps = task.adapt.steps[difficulty]
    const carbs = task.adapt.carbs
    const [stepcount, setStep] = useState(0)
    let targetstep;
    (steps > 2) ? targetstep = steps + 1 : targetstep = steps

    function stepDone(){
        (stepcount === targetstep) ?  setStep(5): setStep(stepcount + 1)
    }


    const renderscenes = [
        function renderZero(){return(<Instructions steps = {steps} carbs = {carbs} onClick={stepDone}/>)}, 
        function renderOne (){return(<TapOn onPass={stepDone}/>)},
        function renderTwo (){return <DragCup onPass ={stepDone}/>},
        function renderThree(){return <AddCarbs carbs = {carbs} onPass = {stepDone}/>},
        function renderFour (){return <PourCarbs carbs={carbs} onPass={stepDone}/>},
        function levelDone(){next_step()}
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