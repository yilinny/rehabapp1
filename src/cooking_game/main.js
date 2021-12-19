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
    const recipe = recipes[recipe_no]
    const [stepindex, setStepIndex]= useState(0)
    console.log(recipe.steps.length-1)


    const nextStep = () =>{
        setStepIndex(stepindex + 1)

    }

    const renderscenes = [
        function boilwater(){return (<KitchenOne recipeNo={recipe_no} stepNo={stepindex} next_step={()=>{nextStep()}}/>)},
        function fridge(){return (<Fridge recipeNo={recipe_no} stepNo={stepindex} next_step={()=>{nextStep()}}/>)},
        function panpot(){return(<Stove recipeNo={recipe_no} stepNo={stepindex} next_step={()=>{nextStep()}}/>)},
        function chopping(){return (<ChoppingBoard recipeNo={recipe_no} stepNo={stepindex} next_step={()=>{nextStep()}}/>)},
        function mixing(){return (<Counter recipeNo={recipe_no} stepNo={stepindex} next_step={()=>{nextStep()}}/>)},
        function grating(){return (<Grater recipeNo={recipe_no} stepNo={stepindex} next_step={()=>{nextStep()}}/>)},
        function yay(){
            return(
                <div style={{backgroundColor:'pink'}}>
                <h1>YAY</h1>
                </div>
            )
        }
    ]


    return (
        <div>
        {renderscenes[recipe.steps[stepindex]]()}
        </div>
    )
}
export default CurrentScene