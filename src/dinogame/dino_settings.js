import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import '../settings.css';
import {Popup, Image, Button} from 'semantic-ui-react'
import  Dino from './dino_jump';
import info from './dino_pics/Info-Button.png'


export const DinoSettings = () =>{
    
    const [finalProps, setProps] = useState([0,0,2,1])
    const fields = [
        {name:'Control', options:['Normal', 'Left', 'Right'], description: 'Normal mode allows for bimanual control. Controls can be placed on left or right side to promote use of one side, or increase attention paid to the side.'},
        {name:'Boost', options:['No', 'Yes'], description: 'Boost button, as an additional instruction challenges client\'s ability to process information and split their attention between navigating, and boosting where possible.' },
        {name:'Difficulty', options:['1', '2', '3', '4', '5'], description: 'Can be graded as per client\'s fustration tolerance, or provide the just right challenge to keep clients engaged.'},
        {name:'Sensitivity', options:['1', '2', '3'], description:'The less sensitive, the more presses required for the dinosaur to fly in the chosen direction. Can be adjusted based on personal preference, based on what clients find easier to control.'}
    ]

    //index in options is the value
    
    
    const submitForm = (e) => {
        e.preventDefault() //prevent warning on form is not connected
        ReactDOM.render(<Dino
        control={finalProps[0]}
        boost={finalProps[1]}
        difficulty={finalProps[2]}
        arrowsensitivity={finalProps[3]}
        />, document.getElementById('root'))
    }


    const handleChange = (e, index) =>{
        //-1 before storing in array

        setProps(prevState=>{
            let new_arr = prevState
            new_arr.splice(index, 1, parseInt(e.target.value))
            return new_arr
        }) //check .splice syntax

        console.log(finalProps)
    }

    //check console.log to ensure form settings are passed correctly 

    return(
        <div className='settings-container'>
           <Button style ={{position: 'absolute', left: '5%', top:'5%'}} href='/games'>  Back to Game menu</Button>
            <form className='cookingform' onSubmit={(e)=>{submitForm(e)}}>
            <h1 style={{fontSize: '3rem'}}> SETTINGS</h1> 
                {fields.map((item,index) => {
                return(
                    <div style={{textAlign:'center'}}>
                        <h4>
                        <Popup wide position='top left' trigger={<Image src={info} style ={{width: '1.5vw', height:'auto', position:'absolute'}}/>}>
                            <Popup.Header>{item.name}</Popup.Header>
                            <Popup.Content>
                                <p>{item.description}</p>    
                            </Popup.Content>
                            </Popup>{` ${item.name}: `}
                        <select  onChange = {(e)=>{handleChange(e,index)}}>
                        {item.options.map((thing, thingindex) => {return(<option value = {thingindex}>{thing}</option>)})}
                        </select> 
                        </h4>
                        <p> </p>
                    </div> 
                )})} 
                <input style={{position: 'absolute', left:'50%', top: '90%'}}type='submit' value='Submit'/>
            </form>
        </div>

    )

} 