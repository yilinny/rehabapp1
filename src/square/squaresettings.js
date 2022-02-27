// Settings as parent. Chosen state passed down to Gameboard as props

import React from 'react';
import GameBoard from './square';
import { randomfive } from './adaptations';
import '../settings.css'
import { Popup, Image, Button } from 'semantic-ui-react';


export class SquareSettings extends React.Component {
    // currently just basic functions to choose quadrant 
    //handleChange can just reflect different rendering 
    constructor(props){
        super(props);
        this.state = {
            quadrants: [[
                {
                    id: 'UL',
                    name: 'Upper left'
                },

                {
                    id: 'LL',
                    name: 'Lower left'
                },],[

                {
                    id: 'UR',
                    name: 'Upper right'
                },

                {
                    id: 'LR',
                    name: 'Lower Right'
                },],[
                {
                    id: 'C',
                    name: 'Centre'
                },
                {
                    id: 'P',
                    name: 'Periphery'
                }]
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
            this.setState({selected:'NIL'})
        }
        if (this.state.noQuad.length === 0) {
            this.setState({noQuad: 'NIL'})
        }

        this.setState({gamestart: true})
    
        event.preventDefault()
    }

    // Testing multiple inputs
    onSelectQuadrant(event, id) {
        let s = this.state.selected
        let find = s.indexOf(id)
        
        if(this.state.noQuad.includes(id)) {
            alert('Can\'t avoid and increase frequency in the same quadrants...'); 
            event.preventDefault() //prevents box from being checked
        }
        else{
        if (find > -1) {s.splice(find, 1)} 
        else {s.push(id)}
        this.setState({selected: s});
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
                    <Button style ={{position: 'absolute', left: '5%', top:'5%'}} href='./games'>  Back to Game menu</Button>
                    <div style={{left: '50%', padding: '2%'}}>
                        <h1 style={{color:'#faf3dd'}}> SETTINGS </h1>    
                    </div>
                    <form className='form' onSubmit = { this.onSubmit }>
                        <div className='subform'>
                        <Popup wide position='bottom right' trigger={<Image src={`game_menu_pics/Info-Button.png`} style ={{width: '2vw', height: 'auto', alignSelf:'flex-end'}}/>}>
                            <Popup.Header> Increasing Frequency: </Popup.Header>
                            <Popup.Content>
                                <p>Encourage further practice in visual scanning to the lost visual field</p>
                                <p>Eg: If left visual field is lost but want to practice scanning to the left, increase frequency  in the left quadrants to encourage scanning to the left.</p>
                                <p>Useful for teaching compensation of scanning when limited by cognition</p>
                            </Popup.Content>
                        </Popup>
                        <h4 style={{marginTop:'0'}}> Increase frequency <br/> in these quadrants:</h4>
                            {
                                this.state.quadrants.map(item => {
                                    return (
                                        <div>
                                        <label key={ item[0].id }>
                                            <input id={ item[0].id } 
                                                type="checkbox"
                                                onClick={ (e) => this.onSelectQuadrant(e,item[0].id) }
                                            ></input>
                                            <span>{ item[0].name }&nbsp;&nbsp;</span>
                                            
                                        </label>
                                        <label key={ item[1].id }>
                                            <input id={ item[1].id } 
                                                type="checkbox"
                                                onClick={ (e) => this.onSelectQuadrant(e,item[1].id) }
                                            ></input>
                                            <span>{ item[1].name }</span>
                                            <br/>
                                        </label> 
                                        </div>
                                    )
                                })
                            }
                           
                        </div>
                        
                        <div className='subform'>
                        <Popup position = 'bottom right'trigger={<Image src={`game_menu_pics/Info-Button.png`} style ={{width: '2vw', height: 'auto', alignSelf:'flex-end'}} />} wide>
                            <Popup.Header> Avoiding Quadrants</Popup.Header>
                            <Popup.Content>
                                <p>Useful for assessment, when comorbidities complicates assessment of particular deficit.</p>
                                <p>Eg: When it is unclear if slow reaction to  left and right sides are from visual neglect or from poor control of said arm. Can be used in conjunction with instructions to further assess (eg. use only left arm to tap)</p>
                                <p>Can also be used to encourage scanning in other fields</p>
                            </Popup.Content>
                        </Popup>
                        <h4 style={{marginTop:'0'}}> Avoid the <br/>following quadrants:</h4>
        
                            {
                                this.state.quadrants.map(item => {
                                    return (
                                        <div>
                                        <label key={ item[0].id }>
                                            <input id={ item[0].id } 
                                                type="checkbox"
                                                onClick={ (e) => this.onSelectAvoidQuadrant(e,item[0].id) }
                                            ></input>
                                            <span>{ item[0].name }&nbsp;</span>
                                            
                                        </label>
                                        <label key={ item[1].id }>
                                            <input id={ item[1].id } 
                                                type="checkbox"
                                                onClick={ (e) => this.onSelectAvoidQuadrant(e,item[1].id) }
                                            ></input>
                                            <span>{ item[1].name }</span>
                                            <br/>
                                        </label> 
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div className='subform'>
                        <Popup position='bottom right' wide trigger={<Image src={`game_menu_pics/Info-Button.png`} style ={{width: '2vw', height: 'auto', alignSelf:'flex-end' }}/>}>
                            <Popup.Header> Color picker</Popup.Header>
                            <Popup.Content>
                                <p>Useful to assess if clients are more sensitive to particular colors. High contrast increases stimulation where there might be neglect/visual field loss, hence encouraging scanning</p>
                                <p>Can be used in a compensatory manner by selecting a suitable contrast most comfortable for clients allowing them to work on other skills, with the contrasting colours giving visual cues to complete the exercises.</p> 
                            </Popup.Content>
                            <br/>
                            <Popup.Header> Square Size</Popup.Header>
                            <Popup.Content>
                                <p>The variation of size from small, medium to large allows for grading of accuracy training of the fine motor skills. The smaller the square, the more accurate the client needs to be.</p>
                                <p>Fits in with the motor stage of motor learning, in which the focus is on the quality of the movement, mass practice and decreasing mistakes.</p>
                            </Popup.Content>
                        </Popup>
                   
                        <label> Square size:
                            <select value ={this.state.size} onChange = {this.ChangeSize}>
                                <option value = 's'> Small</option>
                                <option value = 'm'> Normal</option>
                                <option value = 'l'> Large</option>
                            </select>
                        </label>
                        
                        <label> Square color:    
                            <input type= 'color' value= {this.state.color} onChange={this.ChangeColor}></input>
                        </label>
                        
                        <label> Start from level:
                            <select value = {this.state.level} onChange = {this.ChangeLevel}>
                                <option value = {1}> 1</option>
                                <option value = {3}> 3</option>
                                <option value = {5}> 5</option>
                            </select>
                        </label>
                       
                        <label> Duration: 
                            <select value={this.state.duration} onChange={this.ChangeDuration}>
                                <option value ={15}>15 seconds</option>
                                <option value ={20}>20 seconds</option>
                                <option value ={30}>30 seconds</option>
                            </select>
                        </label>

                        </div>

                        <div className='subform'>
                        <Popup wide='very' position='top center' trigger={<Image src={`game_menu_pics/Info-Button.png`} style ={{width: '2vw', height: 'auto', alignSelf:'flex-end' }}/>}>
                            <Popup.Header>Distractions</Popup.Header>
                            <Popup.Content>
                                <p>Alongside the designated square, circles of a different color would appear. Clients are to only tap the square and would lose a life if they tap a circle.</p>
                                <p>This targets attention and information processing.</p>
                            </Popup.Content>
                            <br/>
                            <Popup.Header>Numbered taps</Popup.Header>
                            <Popup.Content>
                                <p>A number will appear on each square and that will be the number of times you will need to press the square before it disappears and the next square appears.</p>
                                <p>This targets sustained attention, information processing and short-term memory (remembering the number pressed) Increased repetition also targets UL.</p>
                            </Popup.Content>
                        </Popup>
                        <h4 style={{marginTop:'0'}}> Game mode: </h4>
                        
                        <label>
                            <label> <input type ='radio' value = '0' onChange={this.ChangeMode} id='nil'/> Normal   </label>
                            <br/>
                            <label><input type ='radio' value = '1' onChange={this.ChangeMode} id='one'/> Distractions   </label>
                            <br/>
                            <label><input type ='radio' value = '2' onChange={this.ChangeMode} id='two'/> Counting taps!  </label>
                        </label>
                        </div>

                        <input style={{position:'absolute', left: '90%', top: '90%'}} type='submit' value='Submit'/>
                    </form>
                </div>
            )
        }
    }
}

//look into mapping options, but sort out the data passing before doing that