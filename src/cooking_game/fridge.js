import React, { useState, useEffect, useRef } from 'react'
import Draggable from 'react-draggable'
import './fridge.css'
import recipes from './recipes'

//basically this uses the tile method similar to puzzle. Tiles.map (tiles,index) => <draggable ref{index}=><div ref={index}> 
//just check ondragstop if coordinates are correct, use current index to streamline check
// return to initial if wrong 

function resizeContainer (){
    return (1080/1920 * window.innerWidth)
}

function Instructions (props) {
    console.log(props.correct_ing)
    return(
        <div>
        <div key='instruction' style ={{backgroundColor:'white', width: '50%', height: '50%', top: '25%', left: '15%', position: 'absolute', display: 'flex', flexDirection: 'column',  borderRadius: '15px', 
                                        borderColor: '#e7e7e7', 
                                        boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
                                        transition: '0.3s'}}>
                <h2 style={{
                        marginTop: '3rem',
                        textAlign: 'center'
                }}> Gather these ingredients!</h2>
                {props.correct_ing.map(
                    (food,index) => 
                        <div key= {`instruction-${index}`}  className='ingredients' style ={{
                        backgroundImage: `url(/fridge_pics/ingredient${food}.png)`,
                        left: `${20*(index%3 + 1)}%`,
                        top: `${20*(Math.ceil((index + 1)/3))}%`,
                        margin: '4rem 0rem',
                    }}></div>)}
            </div>
            <button onClick={props.onclick} style = {{
                    margin: '8rem 3rem',
                    padding: '10px 25px',
                    border: 'none',
                    position:'absolute',
                    top: '55vh',
                    left:'50vw',
                    backgroundColor: '#e7e7e7'}}>Let's go!</button> 
            </div>
        
    )
}

//can leave props as props then props.sth 

export function Fridge ({recipeNo, stepNo, difficulty , next_step}){
    const task = recipes[recipeNo].step[stepNo]
    const[correct_ing_arr, setCorrectIngArr] = useState(task.ing[difficulty])

    const ingredientsref= useRef(null)
    const [ingredients, setIngredients] = useState(0)
    const initialXcoords = [5,14,25,8,20,28,5,15,25,40,53,43,55] 
    const initialYcoords = [18,18,18,38,38,40,55,55,55,23,23,58,55]; 
    //im sure theres a more matheically correct way to generate coords, but this takes less line and gives me more precision
    const movingIngredient = useRef(null)
    const [highestKey, setHighKey] = useState (12)
    const [instruction, setInstruction] = useState(1)
    
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
        console.log(correct_ing_arr)
        const newPos = {
            x: e.target.getBoundingClientRect().x,
            y: e.target.getBoundingClientRect().y
        } 

        if (newPos.x > 0.7*(window.innerWidth)){

                if (correct_ing_arr.includes(ing_id)){


                    setCorrectIngArr(prevState=>{
                        let uniqueIndex = prevState.indexOf(ing_id)
                        let new_arr = prevState
                        new_arr.splice(uniqueIndex, 1)
                        console.log(`new arr is ${new_arr}`)
                        return new_arr
                    }) //deletes repeat arr from ing_arr 

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

                    if (task.ing[difficulty].length === 0){
                        next_step()
                    }
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

    const Start = () =>{
        setInstruction(0)

    }

    return (
        <div className = 'background'>
        <div className= 'container'
        style = {{
                backgroundImage: `url(/fridge_pics/fridge.png)`,
                height: `${resizeContainer()}px`,
                top: `${(window.innerHeight - resizeContainer())/2}px`,
        }}>
        <div className = 'pepper'></div>
        <div className='egg'></div>
            {ingredients && ingredients.map(
                (food) => <Draggable disabled={food.disabled} nodeRef={ingredientsref} key={`ingredients-${food.unique_id}`} onStart = {()=> {register(food)}} onStop={handleChange}>
                    <div key= {`food-${food.unique_id}`} ref = {ingredientsref} className='ingredients' style ={{
                    backgroundImage: `url(${food.background})`,
                    left: `${food.left}px`,
                    top: `${food.top}px`
                }}
            ></div>
            </Draggable>)}

        {(instruction === 1)? <Instructions correct_ing={correct_ing_arr} onclick={Start}/>: <div/>}
            
        </div>  
        </div>
    )
}

export default Fridge