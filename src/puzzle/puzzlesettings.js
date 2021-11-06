import React, {useState} from 'react';
import { JigsawPuzzle } from './puzzle';
import ReactDOM from 'react-dom'


export function PuzzleSettings (){
    //trying to use function instead of class
    //setState instead of having constructor props etc 
    //didnt use this last time caus ei havent learn yet lmao 
    const [rows,setRows] = useState(3); 
    const [col,setCols] = useState(4);
    const choice = [1,2,3,4,5,6]

    return (
        <div>
            <form onSubmit = {() => {
                 ReactDOM.render(
                    <JigsawPuzzle
                    imageSrc= 'https://source.unsplash.com/random/1000x800' //random image for now 
                    rows = {rows}
                    columns = {col}
                    onSolved= {()=>{alert('yay')}}/>,
                    document.getElementById('root')
                ) //npt sure why return does not work but then again idc
            }}> 
                <label>Rows:</label>
                <select value = {rows} onChange = {(e)=> {setRows(e.target.value)}}>
                {choice.map(item => {
                    return(<option key={item} value = {item}>{item}</option>);
                })}
                </select>

                <label>Columns:</label>
                <select value = {col} onChange = {(e)=> {setCols(e.target.value)}}>
                {choice.map(item => {
                    return(<option key = {item} value = {item}>{item}</option>);
                })}
                </select>
                <input type='submit' value='Submit'/>
            </form>
        </div>
    )
}

