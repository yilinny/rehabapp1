// Settings as parent. Chosen state passed down to Gameboard as props

import React from 'react'
import GameBoard from './square';

export class SquareSettings extends React.Component {
    // currently just basic functions to choose quadrant 
    //handleChange can just reflect different rendering 
    constructor(props){
        super(props);
        this.state = {
            'quadrant': '', //basically if u replace '' with [] u can store multiple values in an array, and it passes down well. but it throws warning i gave up
            'gamestart': false,
            'noQuad': '',
            'size': '',
        }
        this.handleChange= this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.handlenoQuad=this.handlenoQuad.bind(this)
        this.ChangeSize=this.ChangeSize.bind(this)
    }

    handleChange(event){
        this.setState({'quadrant': event.target.value})
    }
    handlenoQuad(event){
        if (event.target.value !== 'NIL' && event.target.value === this.state.quadrant){
            alert('You cannot increase distribution and avoid the same quadrant....')
        }
        else{this.setState({'noQuad': event.target.value})}
    }

    ChangeSize(event){
        this.setState({'size': event.target.value})
    }

    onSubmit(event){
        console.log(this.state.quadrant)
        console.log(this.state.size)
        this.setState({gamestart: true})
        event.preventDefault()
    }
    render(){
        if (this.state.gamestart=== true){return(<GameBoard quad={this.state.quadrant} noquad={this.state.noQuad} size={this.state.size}/>)}
        else{
        return(
            <form onSubmit= {this.onSubmit}>
                <label>Increase frequency on: 
                    <select value = {this.state.quadrant} onChange = {this.handleChange}>
                        <option value = 'UR'> UR </option>
                        <option value = 'LR'>LR</option>
                        <option value = 'UL'>UL</option>
                        <option value = 'LL'>LL</option>  
                        <option value = 'C'> Center</option>
                        <option value = 'P'> Periphery</option>
                        <option value = 'nil'>NIL </option> 
                    </select>
                </label> 
                <label> Avoid the following:
                <select value = {this.state.noQuad} onChange = {this.handlenoQuad}>
                        <option value = 'UR'> UR </option>
                        <option value = 'LR'>LR</option>
                        <option value = 'UL'>UL</option>
                        <option value = 'LL'>LL</option>  
                        <option value = 'nil'>NIL </option> 
                    </select>
                </label> 
                <label> Square size:
                    <select value ={this.state.size} onChange = {this.ChangeSize}>
                        <option value = 's'> Small</option>
                        <option value = 'm'> Normal</option>
                        <option value = 'l'> Large</option>
                    </select>
                </label>

                <input type='submit' value='Submit'/>
            </form>
        )
        }
    }
}

//look into mapping options, but sort out the data passing before doing that