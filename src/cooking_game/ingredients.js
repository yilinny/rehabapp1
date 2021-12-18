
import React from 'react'

function resizeContainer (){
    return (1080/1920 * window.innerWidth)
}

const Ingredients = (ing_id, xCoord, yCoord) => {
    //ingredients are to be called as separate objects 
    var x = ing_id
    const ing = {
    ing_id : x, 
    background: `/fridge_pics/ingredient${x}.png`,
    left: xCoord/100 * window.innerWidth,
    top:yCoord/100 * resizeContainer(),
    }
    
    return (
       <div id= {ing.ing_id} className='ingredients' style = {{
           backgroundImage: `url(${ing.background})`,
           left: `${ing.left}px`,
           top: `${ing.top}px`
       }}></div>

    )

}


export default Ingredients