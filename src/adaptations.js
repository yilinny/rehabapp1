//list of adaptations


function generate_coordinates(min, max, dim) {
    let coord;
    let strcoord;
    if (min===0) {coord = Math.floor(Math.random() * max)}
    else{coord = Math.floor(Math.random() * (max- min) + Math.random()* min)}
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
    let x;
    let y;

    if (quad_name === 'UL'){
        x = generate_coordinates(0,50,'x');
        y = generate_coordinates(0,50, 'y')}
    
    else if (quad_name === 'UR'){
        x = generate_coordinates(50, 100, 'x');
        y = generate_coordinates(0,50, 'y')}
 
    else if (quad_name === 'LL'){
        x = generate_coordinates(0,50, 'x');
        y = generate_coordinates(50,100, 'y')}
            
    
    else if (quad_name === 'UL'){
        x = generate_coordinates(50,100, 'x');
        y = generate_coordinates(50,100, 'y')}
    
    console.log([x,y])
    return ([x,y])
}

export function increase_distribution(quad) {
    //take quad as an array, quad.length would give number of quads to increase distribution over
    //quad should consist of 'UL', 'LL', 'UR', 'LR' only
    
    const all_quad = ['UL', 'LL', 'UR', 'LR']

    if (randomint()%2 !== 0){
        console.log('in right quad')
        const n = quad.length
        var remedial = randomint()%n  // indicator for different cases would generate 0 to (n-1), same as item index
        return(place_in_quad(quad[remedial]))
    }//equally distribute over selected quads

    else {
        var marker = randomint()%4 // indicator for different cases would generate 0 to (n-1), same as item index
        return(place_in_quad(all_quad[marker]))
    }
} 




