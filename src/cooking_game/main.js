import KitchenOne from "./tap";
import Fridge from "./fridge"
import React, { useState, useEffect, useRef } from 'react'
import Stove from "./stove"
import ChoppingBoard from "./chopping_board";
import Counter from "./mixing";
import Grater from "./grate";
import recipes from "./recipes";



export const CurrentScene= ({recipe_no = 0, skills = [0,0,0,0,0]}) =>{
    const recipe = recipes[recipe_no]
    const [stepindex, setStepIndex]= useState(0)
    

    return (
        //<KitchenOne/>
        //<Fridge list ={[0,3,5,12]}/>
        <Stove/>
        //<Grater/>
    )
}
export default CurrentScene