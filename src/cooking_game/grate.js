import React, { useState } from 'react'
import Draggable from 'react-draggable'
import recipes from './recipes'
import './fridge.css'
import { useEffect } from 'react/cjs/react.development'

function resizeContainer (){
    return (1080/1920 * window.innerWidth)
}

const Grater = ({recipeNo = 1   , stepNo = 2, difficulty = 1}) =>{
    let task = recipes[recipeNo].step[stepNo]
    const [width, setWidth] = useState(20)
    const [dragno, setDragno] = useState(0)
    const [text, setText] = useState(null)
    const correctdrag= task.adapt.grate_no[difficulty]*971

    const Dragging = (e,ui) =>{
        let distdrag = Math.sqrt(Math.pow(ui.deltaX,2) + Math.pow(ui.deltaY,2))
        if(dragno >= correctdrag){
                setText('Great Job!')
                return
            }
        setDragno(dragno + distdrag)
        setWidth(24-dragno*(20/correctdrag))
    }

    useEffect(()=>{
        setTimeout(()=>{
            setText(null)
        }, 2000)
    },[text])

    return (
        <div className = 'background'>
        <div className= 'container'
        style = {{
                backgroundImage: `url(/general/bg/grater.png)`,
                height: `${resizeContainer()}px`,
                top: `${(window.innerHeight - resizeContainer())/2}px`,
        }}> 

        <div className='timebar'></div>

        <div className='timebar' style={{
            width: `${dragno*(80/correctdrag)}%`,
            backgroundColor: 'green',
        }}></div>

        <p> {text}</p>

        <Draggable onDrag={Dragging}>
            <div className='ingredients-r' style ={{
                backgroundImage: 'url(/fridge_pics/ingredient3.png)',
                width: `${width}%`,
                height: `20%`,
                backgroundSize: 'cover',
                left: '40%',
                top: '40%'
            }}> </div>
        </Draggable>

        </div></div>
    )
}

export default Grater