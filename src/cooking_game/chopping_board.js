import React, { useState, useEffect, useRef } from 'react'
import Draggable from 'react-draggable'
import recipes from './recipes'

function resizeContainer (){
    return (1080/1920 * window.innerWidth)
}

const ChoppingBoard = ({recipeNo = 2, stepNo = 2}) =>{
    let task = recipes[recipeNo].step[stepNo]

    return (
        <div className = 'background'>
        <div className= 'container'
        style = {{
                backgroundImage: `url(/general/bg/choppingboard.png)`,
                height: `${resizeContainer()}px`,
                top: `${(window.innerHeight - resizeContainer())/2}px`,
        }}> 

        <div className='ingredients' key='cut' style={{
             backgroundImage: `url(/fridge_pics/ingredientc-${task.ing[0]}.png)`,
             left: '25%',
             top: '28.5%',
             width: '50%',
             height: '50%',
        }}></div>

        <div className='ingredients' style = {{
            backgroundImage: `url(/fridge_pics/ingredienth-${task.ing[0]}.png)`,
            left: '25%',
            top: '30%',
            width: '50%',
            height: '50%',
            backgroundSize: 'cover',
            animation: 'chopchop 5s linear 0s 1 normal forwards running'
        }}> </div> 

        </div></div>



    )
}

export default ChoppingBoard