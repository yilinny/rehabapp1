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
import ReactDOM from 'react-dom';
import '../settings.css';
import {Popup, Image} from 'semantic-ui-react'

export const CookingSettings = () =>{
    
    const [chosenrecipe, setRecipe] = useState(0)
    const [finalSkills, setSkill] = useState([0,0,0,0,0])
    const difficultyScale = [1,2,3,4,5]
    const fields = ['Motor skills: ', 'Attention: ', 'Memory: ', 'Information Processing: ']
    const recipe = ['Pasta Bolognese', 'Carbonara', 'Fried rice', 'Japanese Curry', 'Sausage and Mash', 'Fish and Chips', 'Pasta Salad', 'Potato Salad']
    
    
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
        <div className='settings-container'>
            
            <form className='form' style ={{width:'50%', height: '45%'}}onSubmit={(e)=>{submitForm(e)}}>
            <Popup wide='very' position='bottom right' trigger={<Image src={`game_menu_pics/Info-Button.png`} style ={{width: '5%', height: 'auto', left: '93%' , top: '2%', position:'absolute'}}/>}>
                            <Popup.Header> Skills </Popup.Header>
                            <Popup.Content>
                                <p>Grade the difficulty of each skill -- the higher the number the more the skills would be challenged</p>
                                <p>In grading cognition skills, consider the cognitive hierarchy.</p>
                                <p> Motor skills are graded by no. of repetition</p>     
                            </Popup.Content>
                        </Popup>
            <h1 style ={{textAlign:'center', position: 'absolute', top: '10%', left:'38%'}}> Settings</h1> 
            <br/><br/><br/>
                {fields.map((item,index) => {
                return(
                    <div style={{textAlign:'center'}}>
                    <label>{item}</label>
                    <select  onChange = {(e)=>{handleChange(e,index)}}>
                    {difficultyScale.map(item => {return(<option value = {item}>{item}</option>)})}
                    </select>  
                    <br/><br/>
                    </div> 
                )})} 

            
                <label style={{left: '30%', position:'absolute'}}> Choose recipe: </label>
                    <select style={{left: '45%', position:'absolute'}} onChange={(e)=>setRecipe(e.target.value)}>
                    {recipe.map((item,index)=>{return(<option key= {`recipe-${index}`}value={index}>{item}</option>)
                    })} </select>
                
                <input style={{position: 'absolute', left:'90%', top: '90%'}}type='submit' value='Submit'/>
            </form>
        </div>

    )

} 
