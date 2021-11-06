import React, {useState} from 'react';
import { JigsawPuzzle } from './puzzle';

export function PuzzleSettings (){
    //trying to use function instead of class
    //setState instead of having constructor props etc 
    //didnt use this last time caus ei havent learn yet lmao 
    const [rows,setRows] = useState(0); 
    const [col,setCols] = useState(0);

    return (
        <div>
            <form> 
                <label>Pieces:</label>
                <select value ={this.state.mode} onChange = {this.ChangeMode}>
                                <option value = '0'> 6</option>
                                <option value = '0.5'> 12 </option>
                                <option value = '1'> 16</option>
                                <option value = '2'> 25</option>
                </select>
            </form>
        </div>
    )

}