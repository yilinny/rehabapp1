//list of adaptations
//need to change contrast/color, depends on css rly should be able to pass down straight from settings to square
//2 game modes:
    // conflicting instructions --> new shape
    // Number on a square, to be tapped accordingly. 

function generate_coordinates(min, max, dim) {
    let coord;
    let strcoord;
    coord = Math.ceil(Math.random() * (max- min) + Math.random()* min)
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

    if(quad_name==='C'){
        x = generate_coordinates(25,75, 'x'); y = generate_coordinates(25,75,'y')}

    else if (quad_name === 'P'){
        if (randomint()%2 === 0){x=generate_coordinates(1,25,'x')} 
        else {x=generate_coordinates(75,100,'x')}
        if (randomint()%2 === 0){y=generate_coordinates(1,25,'y')}
        else {y=generate_coordinates(75,100,'y')} //two different instances of randomint so it would not be a certain quad 
    }

    if (quad_name[0]==='U'){ y=generate_coordinates(1,50,'y')}
    else if (quad_name[0]=== 'L') {y=generate_coordinates(50,100,'y')};
    

    if (quad_name[1]==='L'){x=generate_coordinates(1,50,'x')}
    else if (quad_name[1]==='R'){x=generate_coordinates(50,100,'y')}
    
    console.log([x,y])
    return ([x,y])
}

export function increase_distribution(quad, avoid) {
    //take quad as an array, quad.length would give number of quads to increase distribution over
    //quad should consist of 'UL', 'LL', 'UR', 'LR' only
    const all_quad = ['UL', 'LL', 'UR', 'LR']

    for (let i = 0; i ++ ; i<avoid.length){
        all_quad.filter(item => item!== avoid[i])
    }
    console.log(all_quad)
    //for avoid = p?

    if ('nil' in quad) {
        var marker = randomint()%4 // indicator for different cases would generate 0 to (n-1), same as item index
        console.log(all_quad[marker])
        return(place_in_quad(all_quad[marker])) //allquad no need to account for whether have central or peripheral, four quads cover all
    } 

    if (randomint()%2 !== 0){
        const n = quad.length
        var remedial = randomint()%n  // indicator for different cases would generate 0 to (n-1), same as item index
        console.log(quad[remedial])
        return(place_in_quad(quad[remedial]))
    }//equally distribute over selected quads

    else {
        var marker_2 = randomint()%4 // indicator for different cases would generate 0 to (n-1), same as item index
        console.log(all_quad[marker_2])
        return(place_in_quad(all_quad[marker_2])) //allquad no need to account for whether have central or peripheral, four quads cover all
    }
} 

// use of increase distribution to generate coordinates 
export function Circle (props){
    let coords= [];
    if (props.quad === 'nil'&& props.noquad==='nil'){
        coords = [generate_coordinates(1,100,'x'), generate_coordinates(1, 100,'y')]}
    
    else{
        let chosen_quad = props.quad;
        let unchosen = props.noquad;
        if (typeof chosen_quad === 'string'){chosen_quad=[chosen_quad]} 
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


   

