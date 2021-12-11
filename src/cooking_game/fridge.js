import React, { useState, useCallback, useEffect, useRef } from 'react'
import Draggable from 'react-draggable'
import './fridge.css'

//basically this uses the tile method similar to puzzle. Tiles.map (tiles,index) => <draggable ref{index}=><div ref={index}> 
//just check ondragstop if coordinates are correct, use current index to streamline check
// return to initial if wrong 

function resizeContainer (){
    return (1080/1920 * window.innerWidth)
}

export function Fridge (props){
    const ingredientsref= useRef(null)
    const [ingredients, setIngredients] = useState(0)
    const initialXcoords = [5,14,25,8,20,28,5,15,25,40,53,40, 53] 
    const initialYcoords = [18,18,18,38,38,40,55,55,55,23,23,55,55]; 
    //im sure theres a more matheically correct way to generate coords, but this takes less line and gives me more precision
    const movingIngredient = useRef(null)
    const [totalCorrect, setTotal] = useState(0)
    const [highestKey, setHighKey] = useState (12)
    
    useEffect(()=>{
        setIngredients(Array.from(Array(13).keys()).map(x => ({
        unique_id : x,
        ing_id : x, // to check right 
        background: `/fridge_pics/ingredient${x}.png`,
        left: initialXcoords[x]/100 * window.innerWidth,
        top:initialYcoords[x]/100 * resizeContainer(),
        disabled: false //handlers would not be called if true -- ensure they dont move correct pieces anymore 
    })));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[] )

    function register (ing){
        movingIngredient.current = ing  
        //easier to get unique id etc  
    }

    const handleChange =(e, ui)=> {
        let ing_id = movingIngredient.current.ing_id
        let unique_id = movingIngredient.current.unique_id
        //ing_id for checking, unique_id to ensure draggable and refs work properly. 

        const newPos = {
            x: e.target.getBoundingClientRect().x,
            y: e.target.getBoundingClientRect().y
        } 
        console.log(newPos.y)

        if (newPos.x > 0.7*(window.innerWidth)){

                if (props.list.includes(ing_id)){
                    setTotal(totalCorrect + 1)
                    
                    setIngredients(prevState =>{
                        let newState = [...prevState.filter(it=>it.unique_id !== unique_id),
                        {
                            unique_id: highestKey + 1,
                            background:`/fridge_pics/ingredient${ing_id}.png`, 
                            left: initialXcoords[ing_id]/100* window.innerWidth,
                            top: initialYcoords[ing_id]/100* resizeContainer(),
                            ing_id : ing_id,
                            disabled: false
                        }, //replace at original position 
                        {
                            unique_id : highestKey + 2 ,
                            background: `/fridge_pics/ingredient${ing_id}.png`,
                            left: newPos.x,
                            top: newPos.y,
                            ing_id: ing_id,
                            disabled: true

                        }]; //stores ingredient at yellow part, regenrate unique key so drag will end 
                        setHighKey (highestKey + 2);
                        return newState
                    }
                        )
                }
                else {
                    setIngredients(prevState => {
                        let newIngredients = [...prevState.filter(it => it.unique_id !== unique_id),
                            {
                                unique_id: highestKey + 1,
                                background:`/fridge_pics/ingredient${ing_id}.png`, 
                                left: initialXcoords[ing_id]/100 * window.innerWidth,
                                top: initialYcoords[ing_id]/100* resizeContainer(),
                                ing_id: ing_id,
                                disabled: false
                            }, //replaces ingredient by generating new key 
                        ];
                        setHighKey(highestKey + 1)
    
                    return newIngredients
                    
                })} 
        }
      
    }

    return (
        <div className = 'f_background'>
        <div className= 'f_container'
        style = {{
                height: `${resizeContainer()}px`,
                top: `${(window.innerHeight - resizeContainer())/2}px`,
        }}>
            {ingredients && ingredients.map(
                (food) => <Draggable disabled={food.disabled} nodeRef={ingredientsref} key={`ingredients-${food.unique_id}`} onStart = {()=> {register(food)}} onStop={handleChange}>
                    <div key= {`food-${food.unique_id}`} ref = {ingredientsref} className='ingredients' style ={{
                    backgroundImage: `url(${food.background})`,
                    left: `${food.left}px`,
                    top: `${food.top}px`
                }}
            ></div>
            </Draggable>)} 
        </div>  
        </div>
    )
}

export default Fridge