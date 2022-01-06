import KitchenOne from "./tap";
import Fridge from "./fridge"
import React, { useState } from 'react'
import Stove from "./stove"
import ChoppingBoard from "./chopping_board";
import Counter from "./mixing";
import Grater from "./grate";
import recipes from "./recipes";

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

    const nextStep = () =>{
        if (scenes[stepindex + 1]!==6){switchLevel(true)}
        setStepIndex(stepindex+1)
       //change back to normal after 5s
    }

    function levelUp(){
        setTimeout(()=>{switchLevel(false)}, 5000)
        const instructions = [
            'Boil water!',
            'Gather the ingredients!',
            'Time to cook! ',
            'Chop ingredients',
            'Mix ingredients.',
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

    const scenedifficulty = [skills[3], Math.floor(0.5*(skills[2] + skills[3])), [skills[1], skills[3]], skills[0], [skills[1], skills[3]], skills[0]]
    //scenes[stepindex] as a way to find index for difficulty in arr
    //to be tested!!

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
                    top: '40%',
                    position: 'absolute'
                }}>GREAT JOB!</h3>
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