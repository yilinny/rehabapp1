import KitchenOne from "./tap";
import Fridge from "./fridge"
import React, { useState, useEffect, useRef } from 'react'
import Stove from "./stove"



export const CurrentScene= () =>{
    //recipearray to be an array of dicts. Dicts contain neccessay info as parameters for each scene 
    //recipearray to be held in separate .json file, for game to choose based on goals identified

    return (
        //<KitchenOne/>
        //<Fridge list ={[0,3,5,12]}/>
        <Stove/>
    )
}
export default CurrentScene