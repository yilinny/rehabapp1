import KitchenOne from "./tap";
import Fridge from "./fridge"
import React, { useState } from 'react'
import Stove from "./stove"
import ChoppingBoard from "./chopping_board";
import Counter from "./mixing";
import Grater from "./grate";
import recipes from "./recipes";
import './main.css';
import { Button } from 'semantic-ui-react'

/*
    boilwater: 0
    fridge: 1
    pan/pot: 2
    Chopping: 3
    mix/mush: 4
    Cheese: 5 */

export const CurrentScene= ({recipe_no = 0, skills = [0,0,0,0,0]}) =>{
    console.log(`recipe_no is ${recipe_no}`)
    console.log(`skills is ${skills}`)
    //skills is: motor, attention, memory, info processing, visual guides. Higher more difficult (hence, 0 is have visual cue, 1 is dont have). USe index to refer cause i lazy make it a dict and define all variables sorry HAHAH
    const scenes =recipes[recipe_no].steps
    console.log(scenes)
    const [stepindex, setStepIndex]= useState(0)
    const [levelup, switchLevel] = useState(true)
    const scenedifficulty = [skills[3], Math.floor(0.5*(skills[2] + skills[3])), [skills[1], skills[3]], skills[0], [skills[1], skills[3]], skills[0]]
    //scenes[stepindex] as a way to find index for difficulty in arr
    //const measures = useState([])
    //motor attention memory. Motor = difficulty * 

    const nextStep = () =>{
        if (scenes[stepindex + 1]!==6){switchLevel(true)}
        setStepIndex(stepindex+1)
       //change back to normal after 5s
    }

    function levelUp(){
        setTimeout(()=>{switchLevel(false)}, 5000)
        const instructions = [
            'Boil water!',
            'Gather the ingredients-- drag ingredient to right of screen',
            'Time to cook! ',
            'Chop ingredients -- Tap to chop!',
            'Mix ingredients. Drag to add at the right time!',
            'Grate cheese!'
        ]

        return(
                <div className= "container" style={{
                    backgroundImage: `url(/general/bg/levelup.png)`,
                    height: `${1080/1920 * window.innerWidth}px`,
                    top: `${0.5*(window.innerHeight-(1080/1920*window.innerWidth))}px`
                }}> 
                <h3 style={{
                    left: '43%',
                    top: '40%',
                    position: 'absolute'
                }}>NEXT UP: </h3>
                <br/>
                <h3 style={{
                    left: '43%',
                    top: '50%',
                    position: 'absolute'
                }}>{instructions[scenes[stepindex]]}</h3>
                </div>
        ) //CSS HERE PLS 
    }

    function generateStats (){
        return(
            <div>
                <h2>Here are some useful outcome measures!</h2>
                <br/>
                <h4>Total no. of repetitions from chopping and grating :</h4>
                <br/>
                <h4>Attention:</h4> 
                <br/>
                <h4> Working memory </h4>
                
            </div>
        )
    }

    /*outcome measures
    motor: no. of repetition
    attention: sustained or divided, for how long (can go based on difficulty?)
    info processing: able to follow up to 3 steps instructions
    memory: working memory, able to hold up to () items for about 30seconds - 1min
    problem solving: able to figure out game mechanics without visual cues */

    const renderscenes = [
        function boilwater(){return (<KitchenOne recipeNo={recipe_no} stepNo={stepindex} next_step={()=>{nextStep()}} difficulty={scenedifficulty[scenes[stepindex]]} />)},
        function fridge(){return (<Fridge recipeNo={recipe_no} stepNo={stepindex} next_step={()=>{nextStep()}} difficulty={scenedifficulty[scenes[stepindex]]} />)},
        function panpot(){return(<Stove recipeNo={recipe_no} stepNo={stepindex} next_step={()=>{nextStep()}} difficulty={scenedifficulty[scenes[stepindex]]} />)}, //2 sets of difficulty, attention and info processing
        function chopping(){return (<ChoppingBoard recipeNo={recipe_no} stepNo={stepindex} next_step={()=>{nextStep()}} difficulty={scenedifficulty[scenes[stepindex]]} />)},
        function mixing(){return (<Counter recipeNo={recipe_no} stepNo={stepindex} next_step={()=>{nextStep()}} difficulty={scenedifficulty[scenes[stepindex]]} />)}, //2 sets of difficulty, attention and info processing
        function grating(){return (<Grater recipeNo={recipe_no} stepNo={stepindex} next_step={()=>{nextStep()}} difficulty={scenedifficulty[scenes[stepindex]]} />)},
        function yay(){
            return(
                <div className= "container" style={{
                    backgroundImage: `url(/general/bg/levelup.png)`,
                    height: `${1080/1920 * window.innerWidth}px`,
                    top: `${0.5*(window.innerHeight-(1080/1920*window.innerWidth))}px`
                }}> 
                <h3 style={{
                    left: '43%',
                    top: '25%',
                    position: 'absolute'
                }}>DISH COMPLETED!</h3>
                <div className="finalpic"></div>
                <div className="star"></div> 
                <Button href='/cooking' style={{width:'15%', height:'auto',top:'65%', left:'33%', position:'absolute'}}> Another recipe?</Button>
                <Button href='/' style={{width:'15%', height:'auto',top:'65%', left:'53%', position:'absolute'}}> Main menu</Button>
                </div>
                
            )
        }
    ]

    return (
        <div>
        {(levelup)? levelUp(): renderscenes[scenes[stepindex]]()}
        </div>
    )
}
export default CurrentScene

