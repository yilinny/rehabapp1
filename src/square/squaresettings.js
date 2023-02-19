// Settings as parent. Chosen state passed down to Gameboard as props

import React, { useEffect, useState } from 'react';
import GameBoard from './square';
import { randomfive } from './adaptations';
import '../settings.css'
import { Popup, Image, Button } from 'semantic-ui-react';
import './square.css'
import { updateDefaultSettings, getDefaultSettings } from '../communication_backend/firebase';


export function SquareSettings() {
    const quadrants = [
        [{ id: 'UL', name: 'Upper left' }, { id: 'LL', name: 'Lower left' }],
        [{ id: 'UR', name: 'Upper right' }, { id: 'LR', name: 'Lower Right' }],
        [{ id: 'C', name: 'Centre' }, { id: 'P', name: 'Periphery' }]]
    const [selected, setSelected] = useState([]);
    const [noQuad, setnoQuad] = useState([]);
    const [gamestart, setgame] = useState(false);
    const [size, setSize] = useState('m');
    const [mode, setMode] = useState(0);
    const [lives, setLives] = useState('nil');
    const [square_no, setSquareNo] = useState(0);
    const [level, setLevel] = useState(1);
    const [tab, setTab] = useState(0);
    const [duration, setDuration] = useState(20)
    const uid = window.sessionStorage.getItem('uID')
    const [color, setColor] = useState('#000')
    const [change, setChange] = useState(false)

    // on default : selected, size, lives, square_no, color, level, duration 

    useEffect(() => {
        async function getDefault() {
            try {
                let resp = await getDefaultSettings(uid, 'square')
                console.log(resp.data)
                if (resp.status === 404 || resp.data === null) {
                    setChange(true)
                }
                else {
                    console.log(resp.data)
                    setSelected(resp.data.selected)
                    setnoQuad(resp.data.noQuad)
                    setSize(resp.data.size)
                    setMode(resp.data.mode)
                    setLives(resp.data.lives)
                    setSquareNo(resp.data.square_no)
                    setColor(resp.data.color)
                    setLevel(resp.data.level)
                    setDuration(resp.data.duration)
                }
            }
            catch {
                console.log('No default settings found')
                setChange(true)
            }
        }
        if (uid) { getDefault() }
    }, [])

    const ChangeMode = (event) => {
        setMode(event.target.value)
        if (event.target.value === '1') { setLives(3) }
        if (event.target.value === '2') {
            let num = randomfive()
            setSquareNo(num)
        }
    }

    const onSubmit = (event) => {
        let quad = selected
        let avoid = noQuad
        if (selected.length === 0) {
            setSelected('NIL')
            quad = 'NIL'//changes in state is not reflected when we post the data
        }
        if (noQuad.length === 0) {
            setnoQuad('NIL')
            avoid = 'NIL'
        }
        setgame(true)
        console.log(selected)
        if (uid) {
            updateDefaultSettings(uid, 'square', {
                'selected': quad,
                'noQuad': avoid,
                'size': size,
                'mode': mode,
                'lives': lives,
                'square_no': square_no,
                'color': color,
                'level': level,
                'duration': duration
            })
        }
        event.preventDefault()
    }

    // Testing multiple inputs
    const SelectQuadrant = (event) => {
        let s
        (selected === 'NIL') ? s = 'NIL' : s = selected
        let id = event.target.value
        let find = s.indexOf(id)

        if (noQuad.includes(id)) {
            alert('Can\'t avoid and increase frequency in the same quadrants...');
            event.preventDefault() //prevents box from being checked
        }
        else {
            if (find > -1) { s.splice(find, 1) } //when already inside selected, takes it out from array
            else {
                if (s === 'NIL') { s = [] }
                s.push(id)
            }
            setSelected(s);
        }

    }

    const SelectAvoidQuadrant = (event) => {
        let unselected = noQuad
        let id = event.target.value
        let find = unselected.indexOf(id)

        if (selected.includes(id)) {
            alert('Can\'t avoid and increase frequency in the same quadrants...');
            event.preventDefault() //box wouldnt be checked
        }
        else {
            if (find > -1) { unselected.splice(find, 1) }
            else { unselected.push(id) }
            setnoQuad(unselected)
        }
    }
    //if uid and no change, then render default page 

    return (
        <>

            {(gamestart === true) && (
                <GameBoard
                    quad={selected}
                    noquad={noQuad}
                    size={size}
                    mode={mode}
                    lives={lives}
                    square_no={square_no}
                    color={color}
                    level={level}
                    duration={duration}
                />
            )}

            {(uid && change === false && gamestart === false) && (
                <div className='quick-settings'>
                    <btn className='btn' onClick={() => { setgame(true) }}> Play</btn>
                    <btn className='btn' onClick={() => { setChange(true) }}>Change Settings </btn>
                </div>
            )}

            {(!uid || change === true) && gamestart === false && (
                <div className='settings-container'>
                    <Button style={{ position: 'absolute', left: '5%', top: '5%' }} href='./games '>  Back to Game menu</Button>
                    <div style={{ left: '50%', padding: '2%' }}>
                        <h1 style={{ color: '#faf3dd' }}> SETTINGS </h1>
                    </div>
                    <div style={{
                        display: 'flex', flexDirection: 'row', columnGap: '3%', width: '60vw', zIndex: 1, transform: 'translateY(10px)'
                    }}>
                        <div className='tabbutton'
                            style={{ zIndex: `${(tab === 0) ? 1 : 0}` }}
                            onClick={() => { setTab(0) }}>
                            <h3> Quadrants adjustments</h3>
                        </div>
                        <div className='tabbutton' style={{ zIndex: `${(tab === 1) ? 1 : 0}` }} onClick={() => { setTab(1) }}>
                            <h3> Difficulty</h3>
                        </div>
                        <div className='tabbutton' style={{ zIndex: `${(tab === 2) ? 1 : 0}` }} onClick={() => { setTab(2) }}>
                            <h3> Game Mode</h3>
                        </div>
                    </div>

                    <form className='settings' onSubmit={(e) => { onSubmit(e) }} style={{ width: '60%', height: '40%', boxShadow: '#ffddd2', justifyContent: 'normal' }}>
                        {tab === 0 && (
                            <div style={{ display: 'flex', flexDirection: 'row', columnGap: '5vw' }}><div>
                                <Popup wide position='bottom right' trigger={<Image src={`game_menu_pics/Info-Button.png`} style={{ width: '2vw', height: 'auto', alignSelf: 'flex-end' }} />}>
                                    <Popup.Header> Increasing Frequency: </Popup.Header>
                                    <Popup.Content>
                                        <p>Encourage further practice in visual scanning to the lost visual field</p>
                                        <p>Eg: If left visual field is lost but want to practice scanning to the left, increase frequency  in the left quadrants to encourage scanning to the left.</p>
                                        <p>Useful for teaching compensation of scanning when limited by cognition</p>
                                    </Popup.Content>
                                </Popup>
                                <h4 style={{ marginTop: '0' }}> Increase frequency <br /> in these quadrants:</h4>
                                {
                                    quadrants.map(item => {
                                        return (
                                            <div>
                                                <label key={item[0].id}>
                                                    <input id={item[0].id}
                                                        type="checkbox"
                                                        onClick={(e) => SelectQuadrant(e)}
                                                        defaultChecked={(selected.indexOf(item[0].id) === -1) ? false : true}
                                                        value={item[0].id}
                                                    ></input>
                                                    <span>{item[0].name}&nbsp;&nbsp;</span>

                                                </label>
                                                <label key={item[1].id}>
                                                    <input id={item[1].id}
                                                        type="checkbox"
                                                        defaultChecked={(selected.indexOf(item[1].id) === -1) ? false : true}
                                                        onClick={(e) => SelectQuadrant(e)}
                                                        value={item[1].id}
                                                    ></input>
                                                    <span>{item[1].name}</span>
                                                    <br />
                                                </label>
                                            </div>
                                        )
                                    })}
                            </div>
                                <div >
                                    <Popup position='bottom right' trigger={<Image src={`game_menu_pics/Info-Button.png`} style={{ width: '2vw', height: 'auto', alignSelf: 'flex-end' }} />} wide>
                                        <Popup.Header> Avoiding Quadrants</Popup.Header>
                                        <Popup.Content>
                                            <p>Useful for assessment, when comorbidities complicates assessment of particular deficit.</p>
                                            <p>Eg: When it is unclear if slow reaction to  left and right sides are from visual neglect or from poor control of said arm. Can be used in conjunction with instructions to further assess (eg. use only left arm to tap)</p>
                                            <p>Can also be used to encourage scanning in other fields</p>
                                        </Popup.Content>
                                    </Popup>
                                    <h4 style={{ marginTop: '0' }}> Avoid the <br />following quadrants:</h4>

                                    {
                                        quadrants.map(item => {
                                            return (
                                                <div>
                                                    <label key={item[0].id}>
                                                        <input id={item[0].id}
                                                            type="checkbox"
                                                            defaultChecked={(noQuad.indexOf(item[0].id) === -1) ? false : true}
                                                            onClick={(e) => SelectAvoidQuadrant(e)}
                                                            value={item[0].id}
                                                        ></input>
                                                        <span>{item[0].name}&nbsp;</span>

                                                    </label>
                                                    <label key={item[1].id}>
                                                        <input id={item[1].id}
                                                            type="checkbox"
                                                            defaultChecked={(noQuad.indexOf(item[1].id) === -1) ? false : true}
                                                            onClick={(e) => SelectAvoidQuadrant(e)}
                                                            value={item[1].id}
                                                        ></input>
                                                        <span>{item[1].name}</span>
                                                        <br /></label> </div>)
                                        })}</div> </div>)}

                        {tab === 1 && (
                            <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', padding: '10px 10px 10px 10px', rowGap: '2vh', maxHeight: '100%' }}>
                                <Popup position='bottom right' wide trigger={<Image src={`game_menu_pics/Info-Button.png`} style={{ position: 'absolute', height: 'auto', width: '2vw', left: '90%' }} />}>
                                    <Popup.Header> Color picker</Popup.Header>
                                    <Popup.Content>
                                        <p>Useful to assess if clients are more sensitive to particular colors. High contrast increases stimulation where there might be neglect/visual field loss, hence encouraging scanning</p>
                                        <p>Can be used in a compensatory manner by selecting a suitable contrast most comfortable for clients allowing them to work on other skills, with the contrasting colours giving visual cues to complete the exercises.</p>
                                    </Popup.Content>
                                    <br />
                                    <Popup.Header> Square Size</Popup.Header>
                                    <Popup.Content>
                                        <p>The variation of size from small, medium to large allows for grading of accuracy training of the fine motor skills. The smaller the square, the more accurate the client needs to be.</p>
                                        <p>Fits in with the motor stage of motor learning, in which the focus is on the quality of the movement, mass practice and decreasing mistakes.</p>
                                    </Popup.Content>
                                </Popup>

                                <label> Square size:
                                    <select value={size} onChange={(e) => setSize(e.target.value)}>
                                        <option value='s'> Small</option>
                                        <option value='m'> Normal</option>
                                        <option value='l'> Large</option>
                                    </select>
                                </label>

                                <label> Square color:
                                    <input type='color' value={color} onChange={(e) => { setColor(e.target.value) }}></input>
                                </label>

                                <label> Start from level:
                                    <select value={level} onChange={(e) => { setLevel(e.target.value) }}>
                                        <option value={1}> 1</option>
                                        <option value={3}> 3</option>
                                        <option value={5}> 5</option>
                                    </select>
                                </label>

                                <label> Duration:
                                    <select value={duration} onChange={(e) => { setDuration(e.target.value) }}>
                                        <option value={15}>15seconds</option>
                                        <option value={20}>20 seconds</option>
                                        <option value={30}>30 seconds</option>
                                        <option value={45}>45 seconds</option>
                                        <option value={60}>60 seconds</option>
                                    </select>
                                </label>
                            </div>)}

                        {tab === 2 && (<div className='subform'>
                            <Popup wide='very' position='top center' trigger={<Image src={`s_menu_pics/Info-Button.png`} style={{ width: '2vw', height: 'auto', alignSelf: 'flex-end' }} />}>
                                <Popup.Header>Distractions</Popup.Header>
                                <Popup.Content>
                                    <p>Alongside the designated square, circles of a different color would appear. Clients are to only tap the square and would lose a life if they tap a circle.</p>
                                    <p>This targets attention and information processing.</p>
                                </Popup.Content>
                                <br />
                                <Popup.Header>Numbered taps</Popup.Header>
                                <Popup.Content>
                                    <p>A number will appear on each square and that will be the number of times you will need to press the square before it disappears and the next square appears.</p>
                                    <p>This targets sustained attention, information processing and short-term memory (remembering the number pressed) Increased repetition also targets UL.</p>
                                </Popup.Content>
                            </Popup>
                            <h4 style={{ marginTop: '0' }}> Game mode: </h4>

                            <label>
                                <label> <input type='radio' value='0' checked={mode === '0' ? true : false} onChange={(e) => { ChangeMode(e) }} id='nil' /> Normal   </label>
                                <br />
                                <label><input type='radio' value='1' checked={mode === '1' ? true : false} onChange={(e) => { ChangeMode(e) }} id='one' /> Distractions   </label>
                                <br />
                                <label><input type='radio' value='2' checked={mode === '2' ? true : false} onChange={(e) => { ChangeMode(e) }} id='two' /> Counting taps!  </label>
                            </label>
                        </div>)}

                        <input class='btn' style={{ position: 'absolute', left: '75%', top: '75%' }} type='submit' value='Submit' />
                    </form>
                </div>
            )}
        </>
    )
}