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
            noQuad: [],

            'gamestart': false, 
            'size': 'm',
            'mode': 0,
            'lives': 'nil',
            'square_no': 0,
            'color': '#000000',
            'level': 1,
            duration: 20
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.ChangeSize=this.ChangeSize.bind(this)
        this.ChangeMode= this.ChangeMode.bind(this)
        this.ChangeColor= this.ChangeColor.bind(this)
        this.onSelectAvoidQuadrant=this.onSelectAvoidQuadrant.bind(this)
        this.onSelectQuadrant= this.onSelectQuadrant.bind(this)
        this.ChangeLevel = this.ChangeLevel.bind(this)
        this.ChangeDuration= this.ChangeDuration.bind(this)
    }

    ChangeSize(event){this.setState({'size': event.target.value})}
    
    ChangeMode(event){
        this.setState({'mode': event.target.value})
        if (event.target.value === '1') {this.setState({lives: 3})}
        if (event.target.value=== '2'){
            this.setState({square_no :randomfive()})
        }
    }

    ChangeLevel(event){this.setState({level: event.target.value})}

    ChangeColor(event){this.setState({'color': event.target.value})}
    
    ChangeDuration(event){this.setState({duration:event.target.value})}

    onSubmit(event){
        // Testing multiple inputs
        if (this.state.selected.length === 0) {
            this.setState({selected:['NIL']})
        }
        if (this.state.noQuad.length === 0) {
            this.setState({noQuad: ['NIL']})
        }

        this.setState({gamestart: true})
        event.preventDefault()
    }

    // Testing multiple inputs
    onSelectQuadrant(event, id) {
        let selected = this.state.selected
        let find = selected.indexOf(id)
        
        if(this.state.noQuad.includes(id)) {
            alert('Can\'t avoid and increase frequency in the same quadrants...'); 
            event.preventDefault() //prevents box from being checked
        }
        else{
        if (find > -1) {selected.splice(find, 1)} 
        else {selected.push(id)}
        this.setState({ selected });
        }
    
    }

    onSelectAvoidQuadrant(event,id) {
        let unselected = this.state.noQuad
        let find = unselected.indexOf(id)
        if(this.state.selected.includes(id)) {
            alert('Can\'t avoid and increase frequency in the same quadrants...'); 
            event.preventDefault() //box wouldnt be checked
        }
        else{
            if (find > -1) {unselected.splice(find, 1)} 
            else {unselected.push(id)}

        this.setState({noQuad: unselected });
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
                    level = {this.state.level}
                    duration = {this.state.duration}
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
                                                onClick={ (e) => this.onSelectQuadrant(e,item.id) }
                                                // quad ={ this.state.selected.includes(item.id) }
                                            ></input>
                                            <span>{ item.name }</span>
                                        </label> 
                                    )
                                })
                            }
                        </p> 
                        <p>Avoid following quadrants:
                            {
                                this.state.quadrants.map(item => {
                                    return (
                                        <label key={ item.id }>
                                            <input id={ item.id } 
                                                type="checkbox"
                                                onClick={ (e) => this.onSelectAvoidQuadrant(e,item.id) }
                                                // quad ={ this.state.selected.includes(item.id) }
                                            ></input>
                                            <span>{ item.name }</span>
                                        </label> 
                                    )
                                })
                            }
                        </p> 

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
                        <label> Start from level:
                            <select value = {this.state.level} onChange = {this.ChangeLevel}>
                                <option value = {1}> 1</option>
                                <option value = {3}> 3</option>
                                <option value = {5}> 5</option>
                            </select>
                        </label>
                        <label> Duration: (of each level)
                            <select value={this.state.duration} onChange={this.ChangeDuration}>
                                <option value ={15}>15 seconds</option>
                                <option value ={20}>20 seconds</option>
                                <option value ={30}>30 seconds</option>
                            </select>
                        </label>
                        <input type='submit' value='Submit'/>
                    </form>
                </div>
            )
        }
    }
}

//look into mapping options, but sort out the data passing before doing that