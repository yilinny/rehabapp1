import React, { useState, useEffect, useRef } from 'react'
import Draggable from 'react-draggable'
import recipes from './recipes'

function resizeContainer (){
    return (1080/1920 * window.innerWidth)
}

const ChoppingBoard = ({recipeNo = 2, stepNo = 2, difficulty = 1}) =>{
    let task = recipes[recipeNo].step[stepNo]
    const [width, setWidth] = useState(50)
    const [chopno, setChopno] = useState(0)
    const correctchop = task.adapt.chop_no[difficulty]

    console.log(`correctchop is ${correctchop}`)

    const Chopping = () =>{
        //total width is 50
        //each chop should reduce width by correct chopno/50
        setWidth(50 - chopno*correctchop/50)
        console.log(`new width is ${50 - chopno*correctchop/50}`)
        setChopno(chopno + 1)

        if (chopno === correctchop){console.log('yay')}
    }

    return (
        <div className = 'background'>
        <div className= 'container'
        style = {{
                backgroundImage: `url(/general/bg/choppingboard.png)`,
                height: `${resizeContainer()}px`,
                top: `${(window.innerHeight - resizeContainer())/2}px`,
        }}> 

        <div className='timebar'></div>

        <div className='timebar' style={{
            backgroundColor: 'green',
            width: `${50-width}%`
        }}></div>

        <div className='ingredients' key='cut' style={{
             backgroundImage: `url(/fridge_pics/ingredientc-${task.ing[0]}.png)`,
             left: '25%',
             top: '28.5%',
             width: '50%',
             height: '50%',
        }}></div> 

        <div className='ingredients' onClick= {Chopping} style = {{
            backgroundImage: `url(/fridge_pics/ingredienth-${task.ing[0]}.png)`,
            left: '25%',
            top: '30%',
            width: `${width}%`,
            height: '50%',
            backgroundSize: 'cover'
        }} > </div> 

        </div></div>
    )
}

export default ChoppingBoard