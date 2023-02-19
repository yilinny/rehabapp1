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

import React, { useState, useEffect } from 'react'
import CurrentScene from './main';
import ReactDOM from 'react-dom';
import '../settings.css';
import { Popup, Image, Button } from 'semantic-ui-react'
import { updateDefaultSettings, getDefaultSettings } from '../communication_backend/firebase';

export const CookingSettings = () => {

    const [chosenrecipe, setRecipe] = useState(0)
    const [finalSkills, setSkill] = useState([0, 0, 0, 0, 0])
    const difficultyScale = [1, 2, 3, 4, 5]
    const fields = ['Motor skills: ', 'Attention: ', 'Memory: ', 'Information Processing: ']
    const recipe = ['Pasta Bolognese', 'Carbonara', 'Fried rice', 'Japanese Curry', 'Sausage and Mash', 'Fish and Chips', 'Pasta Salad', 'Potato Salad']
    const uid = window.sessionStorage.getItem('uID')
    const [change, setChange] = useState(false)
    useEffect(() => {
        async function getDefault() {
            let resp = await getDefaultSettings(uid, 'cooking')
            console.log(resp)
            if (!resp.data || resp === 404) {
                setSkill([0, 0, 0, 0, 0])
                setChange(true)
            }
            else {
                console.log(`default is: ${resp.data}`)
                setSkill(resp.data)
            }
        }
        getDefault()
    }, []);

    const submitForm = (e) => {
        if (e.type === 'submit') {
            e.preventDefault()//prevent warning on form is not connected
            if (uid) { updateDefaultSettings(uid, 'cooking', finalSkills) }
        } //update as neccessary
        ReactDOM.render(<CurrentScene recipe_no={chosenrecipe} skills={finalSkills} />, document.getElementById('root'))
    }


    const handleChange = (e, index) => {
        //-1 before storing in array
        setSkill(prevState => {
            let new_arr = prevState
            new_arr.splice(index, 1, parseInt(e.target.value) - 1)
            return new_arr
        }) //check .splice syntax

        console.log(finalSkills)
    }

    //check console.log to ensure form settings are passed correctly 

    return (
        <>{(uid && change === false) && (
            <div className='quick-settings' style={{ flexDirection: 'column', rowGap: '3vh' }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyItems: 'center' }}>
                    <div><label className='heading' style={{ fontSize: 'large' }}> Choose recipe: </label>
                        <select onChange={(e) => setRecipe(e.target.value)}>
                            {recipe.map((item, index) => {
                                return (<option key={`recipe-${index}`} value={index}>{item}</option>)
                            })} </select>
                    </div>
                    <btn className='btn' onClick={(e) => { submitForm(e) }}> Play</btn>
                </div>
                <btn className='btn' onClick={() => { setChange(true) }}>Change Settings </btn>

            </div >
        )}
            {
                (!uid || change === true) && (<div className='settings-container'>
                    <Button style={{ position: 'absolute', left: '5%', top: '5%' }} href='/games'>  Back to Game menu</Button>

                    <form className='cookingform' onSubmit={(e) => { submitForm(e) }}>
                        <Popup wide='very' position='bottom right' trigger={<Image src={`game_menu_pics/Info-Button.png`} style={{ width: '5%', height: 'auto', left: '93%', top: '2%', position: 'absolute' }} />}>
                            <Popup.Header> Skills </Popup.Header>
                            <Popup.Content>
                                <p>Grade the difficulty of each skill; a higher number indicates a greater challenge.</p>
                                <p>In grading cognition skills, consider the cognitive hierarchy (eg. attention is prerequiste for memory)</p>
                                <p> Motor skills are graded by number of repetition</p>
                            </Popup.Content>
                        </Popup>
                        <h1 style={{ fontSize: '2rem' }}> SETTINGS</h1>

                        {fields.map((item, index) => {
                            return (
                                <div style={{ textAlign: 'center' }}>
                                    <h4>{item}</h4>
                                    <select onChange={(e) => { handleChange(e, index) }}>
                                        {difficultyScale.map(item => { return (<option value={item}>{item}</option>) })}
                                    </select>

                                </div>
                            )
                        })}


                        <div><label className='heading'> Choose recipe: </label>
                            <select onChange={(e) => setRecipe(e.target.value)}>
                                {recipe.map((item, index) => {
                                    return (<option key={`recipe-${index}`} value={index}>{item}</option>)
                                })} </select>
                        </div>
                        <input style={{ position: 'absolute', left: '50%', top: '90%' }} type='submit' value='Submit' />
                    </form>
                </div>)
            }
        </>

    )

} 
