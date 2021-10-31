// Settings as parent. Chosen state passed down to Gameboard as props

import React from 'react';
import GameBoard from './square';

import './settings.css';

export class Settings extends React.Component {
    // currently just basic functions to choose quadrant 
    //handleChange can just reflect different rendering 
    constructor(props){
        super(props);
        this.state = {
            // 'quadrant': '',
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

            'gamestart': false
        }
        this.handleChange= this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    handleChange(event){
        // Testing multiple inputs
        // this.setState({quadrant:event.target.value})

        this.setState({selected:event.target.value})

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

    render(){
        if (this.state.gamestart=== true) {
            return(
                // <GameBoard quad={this.state.quadrant}/>

                // Testing multiple inputs
                <GameBoard selected={this.state.selected}/>
            )
        }

        else {
            return(
                <div className='settings-container'>
                    <div className='title'>
                        <h1> Game Settings </h1>
                    </div>
                
                    <form onSubmit= {this.onSubmit}>
                        <p>Increase frequency on: 
                            {/* <select value = {this.state.quadrant} onChange = {this.handleChange}>
                                <option value = 'UR'> UR </option>
                                <option value = 'LR'>LR</option>
                                <option value = 'UL'>UL</option>
                                <option value = 'LL'>LL</option>  
                                <option value='nil'>NIL </option> 
                            </select> */}

                            {/* Testing multiple inputs */}
                            {
                                this.state.quadrants.map(item => {
                                    return (
                                        <label key={ item.id }>
                                            <input id={ item.id } 
                                                type="checkbox"
                                                onClick={ () => this.onSelectQuadrant(item.id) }
                                                selected={ this.state.selected.includes(item.id) }
                                            ></input>
                                            <span>{ item.name }</span>
                                    </label> 
                                    )
                                })
                            }
                        </p>
                        <input type='submit' value='Submit'/>
                    </form>
                </div>    
            )
        }
    }
}