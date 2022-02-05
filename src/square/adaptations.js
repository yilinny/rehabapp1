//list of adaptations
//need to change contrast/color, depends on css rly should be able to pass down straight from settings to square
//2 game modes:
    // conflicting instructions --> new shape
    // Number on a square, to be tapped accordingly. 

import { useState } from 'react/cjs/react.development';
import {check_brightness, LightenDarkenColor} from '../general/color'

function generate_coordinates(min, max, dim) {
    let coord;
    let strcoord;
    coord = Math.ceil(Math.random() * (max- min) +min)
    if  (dim === 'x') {strcoord = String(coord) + 'vw'}
    else if (dim === 'y'){ strcoord= String(coord) + 'vh'} 
    return (strcoord)
}
//randomly places square edit the max coordinates to generate it on one side of the screen. 
//max, min + x,y means can split into quads, exclude quadrants

function randomint(){
    var int = Math.floor(Math.random()*100)
    return (int)
}

function place_in_quad (quad_name) {
    console.log(`Placing in: ${quad_name}`);
    console.log(quad_name[0])

    let x;
    let y;

    if(quad_name==='C'){
        x = generate_coordinates(20,70, 'x'); y = generate_coordinates(20,70,'y')}

    else if (quad_name === 'P'){
        if (randomint()%2 === 0){x=generate_coordinates(1,20,'x')} 
        else {x=generate_coordinates(70,90,'x')}
        if (randomint()%2 === 0){y=generate_coordinates(1,20,'y')}
        else {y=generate_coordinates(70,90,'y')} //two different instances of randomint so it would not be a certain quad 
    }

    else{
    console.log(quad_name[0]);
    (quad_name[0]==='U') ? y= generate_coordinates(1,45,'y'):y=generate_coordinates(50,90,'y');
    (quad_name[1]==='L') ? x=generate_coordinates(1,45,'x'): x=generate_coordinates(50,90,'x');

    }

    let coords = [x,y]

    return (coords)
}

export function increase_distribution(quad, avoid) {
    //take quad as an array, quad.length would give number of quads to increase distribution over
    //quad should consist of 'UL', 'LL', 'UR', 'LR' only;
    const all_quad = ['UL', 'LL', 'UR', 'LR']
    let new_quad = all_quad

    for (let i = 0; i <avoid.length ; i ++){
        console.log(avoid[i])
        new_quad.splice(new_quad.indexOf(avoid[i]), 1) //splice modifies the array for good instead of reusing 
    }
    
    if (quad==='NIL') {
        var marker = randomint()%new_quad.length // indicator for different cases would generate 0 to (n-1), same as item index
        return(place_in_quad(new_quad[marker])) //allquad no need to account for whether have central or peripheral, four quads cover all
    } 

    if (randomint()%2 !== 0){
        const n = quad.length
        var remedial = randomint()%n  // indicator for different cases would generate 0 to (n-1), same as item index
        return(place_in_quad(new_quad[remedial]))
    }//equally distribute over selected quads

    else {
        var marker_2 = randomint()%new_quad.length // indicator for different cases would generate 0 to (n-1), same as item index
        return(place_in_quad(new_quad[marker_2])) //allquad no need to account for whether have central or peripheral, four quads cover all
    }
} 

// use of increase distribution to generate coordinates 
export function Circle (props){
    let coords= [];
    if (props.quad.includes('NIL') && props.noquad==='nil'){
        coords = [generate_coordinates(1,100,'x'), generate_coordinates(1, 100,'y')]}
    
    else{
        let chosen_quad = props.quad;
        let unchosen = props.noquad;
        // if (typeof chosen_quad === 'string'){chosen_quad=[chosen_quad]} 
        if (typeof unchosen === 'string'){unchosen=[unchosen]}
        //convert string into array -if not the two letters would be read as a single array, and 'U' would not be recognized
        
        coords = increase_distribution(chosen_quad, unchosen)}

    return(
        <button className='circle' 
            style = {{left: coords[0], top: coords[1]}}
            onClick ={props.onClick}>
        </button>

    //maybe return more circles as level increases, can be passed in as a prop.no and a state within the gameboard
    );
    //look into map to generate multiple circles



}


export function randomfive(){
    var int = Math.ceil(Math.random()*5)
    return (int)
} //for square tap a certain number 

let past_coords = [];

export function AdaptedSquare (props) {

    let size = [];
    if (props.size === 's'){size = ['2.5vw', '5vh']}
    else if (props.size === 'l'){size = ['10vw', '20vh']}
    else{size = ['5vw', '10vh']}
    
    if (props.count_one === true){
    //make number appear and change coords for first square 
        let coords = [];
        let wordcolor ;
        if (check_brightness(props.color) === true) {wordcolor = '#000000'}
        else {wordcolor = '#ffffff'}
        //chosen quad passed down as props.quad

    
        if (props.quad.includes('NIL') && props.noquad==='nil') {

            coords = [generate_coordinates(1,100,'x'), generate_coordinates(1,100,'y')]
        }
        
        else {
            let chosen_quad = props.quad;
            let unchosen = props.noquad;
            // if (typeof chosen_quad === 'string'){chosen_quad=[chosen_quad]} 
            if (typeof unchosen === 'string') {
                unchosen=[unchosen]
            }
            //convert string into array -if not the two letters would be read as a single array, and 'U' would not be recognized
            
            coords = increase_distribution(chosen_quad, unchosen)
        } 
        
        past_coords = coords
    
        return(
            <button className='square' 
                style = {{left: coords[0], top: coords[1], width: size[0], height: size[1], background: props.color, color: wordcolor}}
                onClick ={props.onClick}>
                {props.square_no}
            </button>
            );
        }
    //else, change color or make shake for subsequent taps 
    else {
        let color;
        if (props.square_no % 2 ===0) {color=LightenDarkenColor(props.color, -30)}//changes intensity of thecolor
        else {color=LightenDarkenColor(props.color, 30)}

        return (
            <button className='square'
                style = {{left: past_coords[0], top: past_coords[1],width: size[0], height: size[1], background: color}}
                onClick= {props.onClick}>
            </button>
        )
    }
}

