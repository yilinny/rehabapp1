import React, {useState} from 'react';
import { JigsawPuzzle } from './puzzle';
import ReactDOM from 'react-dom'
//import settings css if doneee 

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
        <div>
            <form onSubmit = {() => {
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
                <label>Dimensions of puzzle:</label>
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

                <label> Size of puzzle (this would be further affected by no. of pieces) </label>
                <select value = {size} onChange = {(e)=> {setSize(e.target.value)}}>
                    <option value= {0.3}> Extra Small </option>
                    <option value = {0.4}> Small </option>
                    <option value = {0.6}> Normal </option>
                    <option value = {0.8}> Large </option>
                </select>
                <br></br>
                <label> Use a half-solved puzzle? </label>
                <select value = {changePiece} onChange={(e)=> {setMode(e.target.value)}}>
                    <option value = 'yes' > Yes </option>
                    <option value = 'no' > No </option>
                </select>

                <label>If yes, how many pieces should be left to solve?</label>
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
                <br></br> 
                <p>Avoid placing pieces in certain quadrants?
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
                                    )})}
                </p>
                <p>Increase distribution of pieces in certain quadrants?
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
                <label> Insert image link to customize image (leave blank otherwise): </label>
                <input type='text' onChange= {(e) => {setSource(e.target.value);}}/>
                
                <input type='submit' value='Submit'/>

            </form>
        </div>
    )
}

