function generate_coordinates(min, max) {
    let coord;
    coord = Math.random() * (max - min) + min
    return (coord)
}
//randomly places square edit the max coordinates to generate it on one side of the screen. 
//max, min + x,y means can split into quads, exclude quadrants

function randomint() {
    var int = Math.floor(Math.random() * 100)
    return (int)
}

function place_in_quad(quad_name, ratio) {
    let x;
    let y;
    let total = 0.8 + ratio;

    if (quad_name[0] === 'U') { y = generate_coordinates(-ratio, 0.4) }
    else if (quad_name[0] === 'L') { y = generate_coordinates(0.4, total) };


    if (quad_name[1] === 'L') { x = generate_coordinates(-ratio, 0.4) }
    else if (quad_name[1] === 'R') { x = generate_coordinates(0.4, total) };

    return ([x, y])
}

export function increase_distribution_p(quad, avoid, ratio) {
    //take quad as an array, quad.length would give number of quads to increase distribution over
    //quad should consist of 'UL', 'LL', 'UR', 'LR' only
    const all_quad = ['UL', 'LL', 'UR', 'LR']
    let new_quad = ['UL', 'LL', 'UR', 'LR']

    for (let i = 0; i < avoid.length; i++) {
        new_quad = all_quad.filter(item => item !== avoid[i])
    }


    if (quad.includes('NIL') === true) {
        var marker = randomint() % new_quad.length// indicator for different cases would generate 0 to (n-1), same as item index
        return (place_in_quad(new_quad[marker], ratio)) //allquad no need to account for whether have central or peripheral, four quads cover all
    }

    if (randomint() % 2 !== 0) {
        const n = quad.length
        var remedial = randomint() % n // indicator for different cases would generate 0 to (n-1), same as item index
        return (place_in_quad(quad[remedial], ratio))
    }//equally distribute over selected quads

    else {
        var marker_2 = randomint() % new_quad.length// indicator for different cases would generate 0 to (n-1), same as item index
        return (place_in_quad(new_quad[marker_2], ratio)) //allquad no need to account for whether have central or peripheral, four quads cover all
    }
}

export default increase_distribution_p