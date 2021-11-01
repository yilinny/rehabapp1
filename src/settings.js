// Settings as parent. Chosen state passed down to Gameboard as props

import React from 'react';
import GameBoard from './square';
import { randomfive } from './adaptations';


export class SquareSettings extends React.Component {
    // currently just basic functions to choose quadrant 
    //handleChange can just reflect different rendering 
    constructor(props){
        super(props);
        this.state = {
            quadrants: [
                {
                    id: 'NIL',
                    name: 'NIL',
                },

                {
                    id: 'UL',
                    name: 'Upper left'
                },

                {
                    id: 'LL',
                    name: 'Lower left'
                },

                {
                    id: 'UR',
                    name: 'Upper right'
                },

                {
                    id: 'LR',
                    name: 'Lower Right'
                }
            ],

            selected: [],

            // 'quadrant': 'nil', //basically if u replace '' with [] u can store multiple values in an array, and it passes down well. but it throws warning i gave up
            'gamestart': false,
            'noQuad': 'nil', //set nil as default
            'size': 'm',
            'mode': 0,
            'lives': 'nil',
            'square_no': 0,
            'color': '#000000'
        }
        
        this.handleChange= this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.handlenoQuad=this.handlenoQuad.bind(this)
        this.ChangeSize=this.ChangeSize.bind(this)
        this.ChangeMode= this.ChangeMode.bind(this)
        this.ChangeColor= this.ChangeColor.bind(this)
    }

    handleChange(event){
        // Testing multiple inputs
        // this.setState({quadrant:event.target.value})

        this.setState({selected:event.target.value})
        // this.setState({'quadrant': event.target.value})
    }
    handlenoQuad(event){
        if (event.target.value !== 'nil' && event.target.value === this.state.quadrant){
            alert('You cannot increase distribution and avoid the same quadrant....')
        }
        else{this.setState({'noQuad': event.target.value})}
    }

    ChangeSize(event){
        this.setState({'size': event.target.value})
    }
    
    ChangeMode(event){
        this.setState({'mode': event.target.value})
        if (event.target.value === '1') {this.setState({lives: 3})}
        if (event.target.value=== '2'){
            this.setState({square_no :randomfive()})
        }
    }

    ChangeColor(event){
        this.setState({'color': event.target.value})
    }

    onSubmit(event){
        // Testing multiple inputs
        // console.log(this.state.quadrant)
        console.log(this.state.selected)

        this.setState({gamestart: true})
        event.preventDefault()
    }

    // Testing multiple inputs
    onSelectQuadrant(id) {
        let selected = this.state.selected
        let find = selected.indexOf(id)

        if (find > -1) {
            selected.splice(find, 1)
        } 

        else {
            selected.push(id)
        }

        this.setState({ selected })

        this.disableOtherQuads(selected);
    }

    disableOtherQuads(selected) {
        if (selected.includes('NIL')) {
            document.getElementById('UL').disabled = true;
            document.getElementById('LL').disabled = true;
            document.getElementById('UR').disabled = true;
            document.getElementById('LR').disabled = true;

            document.getElementById('UL').checked = false;
            document.getElementById('LL').checked = false;
            document.getElementById('UR').checked = false;
            document.getElementById('LR').checked = false;
        }

        else {
            document.getElementById('UL').disabled = false;
            document.getElementById('LL').disabled = false;
            document.getElementById('UR').disabled = false;
            document.getElementById('LR').disabled = false;
        }
    }
    
    render() {
        if (this.state.gamestart=== true) {
            return (
                <GameBoard 
                    quad = { this.state.selected } 
                    noquad ={ this.state.noQuad } 
                    size = { this.state.size } 
                    mode = { this.state.mode } 
                    lives = { this.state.lives } 
                    square_no = { this.state.square_no } 
                    color ={ this.state.color }
                />
            )
        }

        else {
            return(
                <div className='settings-container'>
                    <div className='title'>
                        <h1> Game Settings </h1>
                    </div>

                    <form onSubmit = { this.onSubmit } >
                        <p> Increase frequency on: 
                            {
                                this.state.quadrants.map(item => {
                                    return (
                                        <label key={ item.id }>
                                            <input id={ item.id } 
                                                type="checkbox"
                                                onClick={ () => this.onSelectQuadrant(item.id) }
                                                // quad ={ this.state.selected.includes(item.id) }
                                            ></input>
                                            <span>{ item.name }</span>
                                        </label> 
                                    )
                                })
                            }
                        </p> 

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
                        <label> Game mode
                            <select value ={this.state.mode} onChange = {this.ChangeMode}>
                                <option value = '0'> Nil</option>
                                <option value = '1'> Extra shapes</option>
                                <option value = '2'> Counting taps</option>
                            </select>
                        </label>
                        <label> Square color 
                            <input type= 'color' value= {this.state.color} onChange={this.ChangeColor}></input>
                        </label>

                        <input type='submit' value='Submit'/>
                    </form>
                </div>
            )
        }
    }
}

//look into mapping options, but sort out the data passing before doing that