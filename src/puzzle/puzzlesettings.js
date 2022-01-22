import React, {useState} from 'react';
import { JigsawPuzzle } from './puzzle';
import ReactDOM from 'react-dom'
import '../settings.css';
import { Popup, Image } from 'semantic-ui-react';

export function PuzzleSettings (){
    //trying to use function instead of class
    //setState instead of having constructor props etc 
    //didnt use this last time caus ei havent learn yet lmao 
    const [rows,setRows] = useState(3); 
    const [col,setCols] = useState(4);
    const [size, setSize] = useState(0.6);
    const [pieces, setPieces] = useState (12);
    const [changePiece, setMode] = useState('no')
    const choice = [1,2,3,4,5,6,7,8] //anything above 8x8 would be quite long to render. I think it is sufficiently difficult at 64 pieces anyways 
    const quadrants= [{id: 'UL', name: 'Upper Left'}, {id: 'LL', name: 'Lower Left'}, {id: 'UR', name: 'Upper Right'}, {id: 'LR', name:'Lower Right'}]
    const [avoid, setAvoid] = useState(['NIL'])
    const [increase, setIncrease]= useState(['NIL'])
    const [imagesource, setSource]= useState('https://source.unsplash.com/random/1000x800')
    return (
        <div className='settings-container'>
            
            <form className='form' style={{width: '60%', height: '60%'}} onSubmit = {() => {

                 ReactDOM.render(
                    <JigsawPuzzle
                    imageSrc= {imagesource} //random image for now 
                    rows = {rows}
                    columns = {col}
                    percent = {size}
                    increase= {increase}
                    avoid= {avoid}
                    wrong_piece= {pieces}/>,
                    document.getElementById('root')
                ) //not sure why return does not work but then again idc
            }}> 
            <div className='title' style={{left: '38%', top: '10%'}}>
                        <h1> Settings </h1>    
                    </div>
                <div className='subform' style ={{top: '25%', left: '10%', height: '42%', width: '28%'}}>
                <Popup wide position='bottom right' trigger={<Image src={`game_menu_pics/Info-Button.png`} style ={{width: '10%', height: 'auto', left: '93%' }}/>}>
                            <Popup.Header> Number of pieces </Popup.Header>
                            <Popup.Content>
                                <p>Grade the difficulty of the puzzle by adjusting the number of pieces.</p>
                                <p>The more the number of pieces, the more repetition involved in dragging the tiles to the right spot, great for accuracy training and fine motor.</p>
                                <p> Increased number of pieces challenges visual processing. Encourages practice in visual form consistency.</p>
                                <p>A half-solved puzzle with some pieces already on provides visual cues for clients who may have initial difficulty with visual processing</p>
                            </Popup.Content>
                        </Popup>
                <label>Dimensions of puzzle:</label>
                <br/>
                <select value = {col} onChange = {(e)=> {setCols(e.target.value); if (changePiece === 'no') {setPieces(rows * e.target.value)}}}>
                {choice.map(item => {
                    return(<option key={item} value = {item}>{item}</option>);
                })}
                </select>

                <label>x</label>
                <select value = {rows} onChange = {(e)=> {setRows(e.target.value);if (changePiece === 'no'){setPieces(col* e.target.value)}}}>
                {choice.map(item => {
                    return(<option key = {item} value = {item}>{item}</option>);
                })}
                </select>
                <br/>
                <label> Use a half-solved puzzle? </label>
                <select value = {changePiece} onChange={(e)=> {setMode(e.target.value)}}>
                    <option value = 'yes' > Yes </option>
                    <option value = 'no' > No </option>
                </select>
                <br/>
                <label>If yes, how many UN-solved pieces?</label>
                <input type='text' onKeyDown= {(e) => {
                   
                    if (changePiece === 'no'){alert ('Only possible if using a half-solved puzzle. Else, change puzzle dimenstions directly to change no of pieces'); e.preventDefault()}
                    else {
                    setTimeout(() => {
                        var num = parseInt(e.target.value)
                        if (isNaN(num) && e.target.value !== '')  {alert ('Please input as a number: eg. 3 instead of three! Please edit, if not, the game would not work.');}
                        else if (num === 0) {alert('0 is an invalid input.')}
                        else if (e.target.value < rows*col) {setPieces(num)}
                        else {alert ('Puzzle pieces to be solved cannot exceed total number of pieces. Please edit, or the game would not work properly.');}
                    }, 1000)}

                }} />
                </div>
                <div className='subform' style ={{top: '25%', left: '40%', height: '42%', width: '50%'}}>
                <Popup wide position='bottom right' trigger={<Image src={`game_menu_pics/Info-Button.png`} style ={{width: '5%', height: 'auto', left: '93%' }}/>}>
                            <Popup.Header>Visual Compensations</Popup.Header>
                            <Popup.Content>
                                <p>Size: Helps clients find pieces easily</p>
                                <p>Increasing frequency can help teach scanning via the functional task of searching for pieces, especially where limited by cognition. </p>
                                <p>Avoiding quadrants can help grade the activity, compensating for any neglect of visual quadrants. Useful for initial assessments, to isolate comorbidites</p>
                            </Popup.Content>
                        </Popup>
                <label style={{position:'absolute', top: '15%', left: '18%'}}> Size of puzzle (further affected by no. of pieces) </label>
                <br/>
                <select style={{position:'absolute', top: '28%', left: '40%'}} value = {size} onChange = {(e)=> {setSize(e.target.value)}}>
                    <option value= {0.3}> Extra Small </option>
                    <option value = {0.4}> Small </option>
                    <option value = {0.6}> Normal </option>
                    <option value = {0.8}> Large </option>
                </select>

                <br/>
                
                <p>Avoid placing pieces in certain quadrants?<br/>
                {quadrants.map(item => {return (
                                        <label key={ item.id }>
                                            <input id={ item.id } 
                                                type="checkbox"
                                                onClick={(e) => {
                                                    if (increase.includes(item.id)) {e.preventDefault(); alert('Cannot increase and avoid the same quadrants')}
                                                    else{
                                                    if (avoid.includes(item.id) === false){
                                                        if (avoid.includes('NIL')){setAvoid([item.id])}
                                                        else {setAvoid([...avoid, item.id]);}}
                                                    else {
                                                        let new_array = avoid.filter(quad => quad !== item.id);
                                                        if (new_array.length === 0){setAvoid(['NIL'])}
                                                        else {setAvoid(new_array)}
                                                    }}}}
                                            ></input>
                                            <span>{ item.name }</span>
                                        </label> 
                                    )})}</p>
                <p>Increase distribution of pieces in certain quadrants? <br/>
                {quadrants.map(item => {return (
                                        <label key={ item.id }>
                                            <input id={ item.id } 
                                                type="checkbox"
                                                onClick={(e) => {
                                                    if (avoid.includes(item.id)) {e.preventDefault (); alert('Cannot increase and avoid same quadrants')}
                                                    else{
                                                    if (increase.includes(item.id) === false){
                                                        if (increase.includes('NIL')){setIncrease([item.id])}
                                                        else {setIncrease([...increase, item.id]);}
                                                    }
                                                    else {
                                                        let new_array = increase.filter(quad => quad !== item.id);
                                                        if (new_array.length === 0){setIncrease(['NIL'])}
                                                        else {setIncrease(new_array)}
                                                    }
                                                }}}
                                            ></input>
                                            <span>{ item.name }</span>
                                        </label> 
                                    )})}
                </p>
                </div>
                <div className='subform' style ={{top: '70%', left: '10%', height: '13%', width: '80%'}}>
                <Popup wide='very' position='top center' style={{width: '80vw', height: 'auto'}} trigger={<Image src={`game_menu_pics/Info-Button.png`} style ={{width: 'auto', height: '60%', left: '98%' }}/>}>
                            <Popup.Header>How to Customize Puzzle Image:</Popup.Header>
                            <Popup.Content>
                                <Image src={`game_menu_pics/Settings.png`} size='massive'></Image>
                            </Popup.Content>
                        </Popup>
                    
                <label style={{position: 'absolute', top: '15%', left: '25%'}}> Insert image link to customize image (leave blank otherwise): </label>
                <input type='text' onChange= {(e) => {setSource(e.target.value);}}/>
                </div>
                <input style ={{top: '90%', left: '90%', position:'absolute'}}type='submit' value='Submit'/>

            </form>
        </div>
    )
}

