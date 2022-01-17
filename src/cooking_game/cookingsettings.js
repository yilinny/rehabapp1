/* settings/skills:
     motor: 1-5: chopping, grating 
     attention: timebar -- total time stove, mixing, no of steps 
     memory: no of ingredients fridge, no of steps
     information processing: no of steps tap, stove, mix 
     visual cues: boolean yes no
     
     cognitive hierachy: attention, memory, information processing
     - if attention is set as 1, memory and information processing would be set as attention max 
     - if memory is set as 1, information processing would be set as mem max
*/


//form to take in recipe and skills
//auto chosee most suitable recipe? -- drop down list? sth more visual for recipe choice 

import React, { useState } from 'react'
import CurrentScene from './main';
import ReactDOM from 'react-dom'

export const CookingSettings = () =>{
    
    const [chosenrecipe, setRecipe] = useState(0)
    const [finalSkills, setSkill] = useState([0,0,0,0,0])
    const difficultyScale = [1,2,3,4,5]
    const fields = ['Motor skills: ', 'Attention: ', 'Memory: ', 'Information Processing: ']
    const recipe = ['Pasta Bolognese', 'Carbonara', 'Japanese Curry', 'Sausage and Mash']
    
    
    const submitForm = (e) => {
        e.preventDefault() //prevent warning on form is not connected
        ReactDOM.render(<CurrentScene recipe_no={chosenrecipe} skills={finalSkills}/>, document.getElementById('root'))
    }


    const handleChange = (e, index) =>{
        //-1 before storing in array
        setSkill(prevState=>{
            let new_arr = prevState
            new_arr.splice(index, 1, parseInt(e.target.value) - 1)
            return new_arr
        }) //check .splice syntax

        console.log(finalSkills)
    }

    //check console.log to ensure form settings are passed correctly 

    return(
        <div>
            <p> Adjust the difficulty of the following skills. The higher the number, the more difficult it would be. Hover over the little i for more information!</p> 
            <form onSubmit={(e)=>{submitForm(e)}}>
                {fields.map((item,index) => {
                return(
                    <div>
                    <label>{item}</label>
                    <select  onChange = {(e)=>{handleChange(e,index)}}>
                    {difficultyScale.map(item => {return(<option value = {item}>{item}</option>)})}
                    </select>  
                    </div> 
                )})} 

                <label> Visual Cues?</label>
                    <select  onChange={(e)=>{handleChange(e,4)}}> 
                        <option value = {0}> Yes</option>
                        <option value = {1}>No</option> 
                    </select>
                
                <label> Choose recipe: </label>
                    <select onChange={(e)=>setRecipe(e.target.value)}>
                    {recipe.map((item,index)=>{return(<option key= {`recipe-${index}`}value={index}>{item}</option>)
                    })} </select>
                
                <input type='submit' value='Submit'/>
            </form>
        </div>

    )

} 
