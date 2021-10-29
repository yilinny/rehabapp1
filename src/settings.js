// Settings as parent. Chosen state passed down to Gameboard as props

import React from 'react'
import GameBoard from './square';

export class Settings extends React.Component {
    // currently just basic functions to choose quadrant 
    //handleChange can just reflect different rendering 
    constructor(props){
        super(props);
        this.state = {
            'quadrant': '',
            'gamestart': false
        }
        this.handleChange= this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    handleChange(event){
        this.setState({quadrant:event.target.value})

    }

    onSubmit(event){
        console.log(this.state.quadrant)
        this.setState({gamestart: true})
        event.preventDefault()
    }
    render(){
        if (this.state.gamestart=== true){return(<GameBoard quad={this.state.quadrant}/>)}
        else{
        return(
            <form onSubmit= {this.onSubmit}>
                <label>Increase frequency on: 
                    <select value = {this.state.quadrant} onChange = {this.handleChange}>
                        <option value = 'UR'> UR </option>
                        <option value = 'LR'>LR</option>
                        <option value = 'UL'>UL</option>
                        <option value = 'LL'>LL</option>  
                        <option value='nil'>NIL </option> 
                    </select>
                </label> 
                <input type='submit' value='Submit'/>
            </form>
        )
        }
    }
}