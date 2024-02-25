import React, { useState, useEffect } from 'react';
import { JigsawPuzzle } from './puzzle';
import ReactDOM from 'react-dom'
import '../settings.css';
import { Popup, Image, Button } from 'semantic-ui-react';
import { getDefaultSettings, updateDefaultSettings } from '../communication_backend/firebase';

export function PuzzleSettings() {
    const uid = window.sessionStorage.getItem("uID")
    const [rows, setRows] = useState(3);
    const [col, setCols] = useState(4);
    const [size, setSize] = useState(0.6);
    const [pieces, setPieces] = useState(12);
    const [changePiece, setMode] = useState('no')
    const choice = [1, 2, 3, 4, 5, 6, 7, 8] //anything above 8x8 would be quite long to render. I think it is sufficiently difficult at 64 pieces anyways 
    const quadrants = [{ id: 'UL', name: 'Upper Left' }, { id: 'LL', name: 'Lower Left' }, { id: 'UR', name: 'Upper Right' }, { id: 'LR', name: 'Lower Right' }]
    const [avoid, setAvoid] = useState(['NIL'])
    const [increase, setIncrease] = useState(['NIL'])
    const width = Math.floor(window.innerWidth)
    const height = Math.floor(window.innerHeight)
    const [imagesource, setSource] = useState(`https://source.unsplash.com/random/${width}x${height}`)
    const [change, setChange] = useState(false)


    //form ui -- javascript to set different tabs and display accordingly
    const [tab, setTab] = useState(0)

    const SubmitForm = (e) => {
        //check pieces here 

        if (isNaN(pieces)) { alert('Please input as a number: eg. 3 instead of three! Please edit, if not, the game would not work.'); e.preventDefault(); }
        else if (pieces === 0) { alert('0 is an invalid input.'); e.preventDefault(); }
        else if (pieces > rows * col) {
            alert('Puzzle pieces to be solved cannot exceed total number of pieces. Please edit, or the game would not work properly.');
            e.preventDefault();
        }

        else {
            //post settings here 
            updateDefaultSettings(uid, 'puzzle', {
                'rows': rows,
                'col': col,
                'percent': size,
                'increase': increase,
                'avoid': avoid,
                'pieces': pieces

            })
            ReactDOM.render(
                <JigsawPuzzle
                    imageSrc={imagesource} //random image for now 
                    rows={rows}
                    columns={col}
                    percent={size}
                    increase={increase}
                    avoid={avoid}
                    wrong_piece={pieces} />,
                document.getElementById('root')
            ) //not sure why return does not work but then again idc
        }
    }

    useEffect(() => {
        async function getDefault() {
            let resp = await getDefaultSettings(uid, 'puzzle')
            if (resp.status === 404 || resp.data === null || resp.data === "") {
                setChange(true)
                console.log('No default settings found.')
            }
            else {
                const defSettings = resp.data
                console.log(resp.data)
                setRows(defSettings['rows'])
                setCols(defSettings['col'])
                setIncrease(defSettings['increase'])
                setAvoid(defSettings['avoid'])
                setPieces(defSettings['pieces'])
            }
        }
        getDefault()
    }, []); //on load, set to default settings.


    return (
        <>
            {(uid && change === false) && (
                <div className='quick-settings'>
                    <btn className='btn' onClick={(e) => { SubmitForm(e) }}> Play</btn>
                    <btn className='btn' onClick={() => { setChange(true) }}>Change Settings </btn>
                </div>
            )}
            {(!uid || change === true) && (
                <div className='settings-container'>
                    <Button style={{ position: 'absolute', left: '5%', top: '5%' }} href='./games'>  Back to Game menu</Button>
                    <div style={{ padding: '2%', position: 'absolute', top: '20%', left: '40%' }}>
                        <h1 style={{ color: '#faf3dd' }}> SETTINGS </h1>
                    </div>
                    <div style={{
                        display: 'flex', flexDirection: 'row', columnGap: '3%',
                        position: 'absolute', top: '36.8%', left: '20%'
                    }}>
                        <div className='tabbutton'
                            style={{ zIndex: `${(tab === 0) ? 1 : 0}` }}
                            onClick={() => { setTab(0) }}>
                            <h3> Difficulty level</h3>
                        </div>
                        <div className='tabbutton' style={{ zIndex: `${(tab === 1) ? 1 : 0}` }} onClick={() => { setTab(1) }}>
                            <h3> Visual Compensations</h3>
                        </div>
                        <div className='tabbutton' style={{ zIndex: `${(tab === 2) ? 1 : 0}` }} onClick={() => { setTab(2) }}>
                            <h3> Customize puzzle</h3>
                        </div>
                    </div>
                    <form className='settings' style={{ width: '60%', height: '40% ', position: 'absolute', top: '45%' }}
                        onSubmit={(e) => SubmitForm(e)}>

                        {tab === 0 && (
                            <div className='puzzletab'>
                                <Popup wide position='bottom right' trigger={<Image src={`game_menu_pics/Info-Button.png`} style={{ width: '30px', alignSelf: 'flex-end', position: 'absolute' }} />}>
                                    <Popup.Header> Number of pieces </Popup.Header>
                                    <Popup.Content>
                                        <p>Grade the difficulty of the puzzle by adjusting the number of pieces.</p>
                                        <p>The more the number of pieces, the more repetition involved in dragging the tiles to the right spot, great for accuracy training and fine motor.</p>
                                        <p> Increased number of pieces challenges visual processing. Encourages practice in visual form consistency.</p>
                                        <p>A half-solved puzzle with some pieces already on provides visual cues for clients who may have initial difficulty with visual processing</p>
                                    </Popup.Content>
                                </Popup>
                                <div>
                                    <label className='subheading'>Dimensions of puzzle:</label>
                                    <br />
                                    <select value={col} onChange={(e) => { setCols(e.target.value); if (changePiece === 'no') { setPieces(rows * e.target.value) } }}>
                                        {choice.map(item => {
                                            return (<option key={item} value={item}>{item}</option>);
                                        })}
                                    </select>
                                    <label>x</label>
                                    <select value={rows} onChange={(e) => { setRows(e.target.value); if (changePiece === 'no') { setPieces(col * e.target.value) } }}>
                                        {choice.map(item => {
                                            return (<option key={item} value={item}>{item}</option>);
                                        })}
                                    </select>
                                </div>
                                <div>
                                    <label className='subheading'> Half-solved puzzle? </label>
                                    <select value={changePiece} onChange={(e) => { setMode(e.target.value) }}>
                                        <option value='yes' > Yes </option>
                                        <option value='no' > No </option>
                                    </select>
                                </div>
                                <div>
                                    <label className='subheading'>If yes, number of UN-solved pieces: </label>
                                    <input type='text' value={pieces} onChange={(e) => {
                                        if (changePiece === 'no') {
                                            alert('Only possible if using a half-solved puzzle. Else, change puzzle dimenstions directly to change no of pieces');
                                            e.preventDefault()
                                        }
                                        else {
                                            setPieces(e.target.value)
                                        }

                                    }} />
                                </div>
                            </div>)}

                        {tab === 1 && (
                            <div className='puzzletab'>
                                <Popup wide position='bottom right' trigger={<Image src={`game_menu_pics/Info-Button.png`} style={{ width: '30px', alignSelf: 'flex-end', position: 'absolute' }} />}>
                                    <Popup.Header>Visual Compensations</Popup.Header>
                                    <Popup.Content>
                                        <p>Size: Helps clients find pieces easily</p>
                                        <p>Increasing frequency can help teach scanning via the functional task of searching for pieces, especially where limited by cognition. </p>
                                        <p>Avoiding quadrants can help grade the activity, compensating for any neglect of visual quadrants. Useful for initial assessments, to isolate comorbidites</p>
                                    </Popup.Content>
                                </Popup>
                                <div><label className='subheading'> Size of puzzle: </label>
                                    <select style={{ width: '30%' }} value={size} onChange={(e) => { setSize(e.target.value) }}>
                                        <option value={0.3}> Extra Small </option>
                                        <option value={0.4}> Small </option>
                                        <option value={0.6}> Normal </option>
                                        <option value={0.8}> Large </option>
                                    </select> </div>
                                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', columnGap: '2%' }}>
                                    <h4>Avoid placing pieces in:</h4>
                                    {quadrants.map(item => {
                                        return (
                                            <label key={item.id}> <input id={item.id}
                                                type="checkbox"
                                                defaultChecked={avoid.includes(item.id) ? true : false}
                                                onClick={(e) => {
                                                    if (increase.includes(item.id)) { e.preventDefault(); alert('Cannot increase and avoid the same quadrants') }
                                                    else {
                                                        if (avoid.includes(item.id) === false) {
                                                            if (avoid.includes('NIL')) { setAvoid([item.id]) }
                                                            else { setAvoid([...avoid, item.id]); }
                                                        }
                                                        else {
                                                            let new_array = avoid.filter(quad => quad !== item.id)
                                                            if (new_array.length === 0) { setAvoid(['NIL']) }
                                                            else { setAvoid(new_array) }
                                                        }
                                                    }
                                                }}>
                                            </input>
                                                <span>{`${item.name} `}</span></label>)
                                    })}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', columnGap: '2%' }}>
                                    <h4>Increase distribution in:</h4>
                                    {quadrants.map(item => {
                                        return (
                                            <label key={item.id}> <input id={item.id}
                                                type="checkbox"
                                                defaultChecked={increase.includes(item.id) ? true : false}
                                                onClick={(e) => {
                                                    if (avoid.includes(item.id)) { e.preventDefault(); alert('Cannot increase and avoid same quadrants') }
                                                    else {
                                                        if (increase.includes(item.id) === false) {
                                                            if (increase.includes('NIL')) { setIncrease([item.id]) }
                                                            else { setIncrease([...increase, item.id]); }
                                                        }
                                                        else {
                                                            let new_array = increase.filter(quad => quad !== item.id);
                                                            if (new_array.length === 0) { setIncrease(['NIL']) }
                                                            else { setIncrease(new_array) }
                                                        }
                                                    }
                                                }}></input>
                                                <span>{`${item.name} `}</span>
                                            </label>
                                        )
                                    })}</div>
                            </div>)}

                        {tab === 2 && (
                            <div className='puzzletab'>
                                <Popup wide='very' position='top center' trigger={<Image src={`game_menu_pics/Info-Button.png`} style={{ width: '30px', position: 'absolute', alignSelf: 'flex-end' }} />}>
                                    <Popup.Header>How to Customize Puzzle Image:</Popup.Header>
                                    <Popup.Content>
                                        <Image src={`game_menu_pics/Settings.png`} size='massive'></Image>
                                    </Popup.Content>
                                </Popup>

                                <label className='subheading'> Insert image link to customize image (leave blank otherwise): </label>
                                <input type='text' onChange={(e) => { setSource(e.target.value); }} />
                            </div>)}
                        <input style={{ top: '90%', left: '80%', position: 'absolute' }} type='submit' value='Submit' />

                    </form>
                </div>)}
        </>
    )
}

