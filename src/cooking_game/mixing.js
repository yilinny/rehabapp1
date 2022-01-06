import React, { useState, useEffect, useRef } from 'react'
import Draggable from 'react-draggable'
import recipes from './recipes'
import './stove.css'

//just need check if the same animation works without dedicated css file 

function resizeContainer (){
    return (1080/1920 * window.innerWidth)
}

function generateinitialcoords (ing){
    var arr
    if (ing === 2) {arr= [[10,50],[76,50]]}
    else if (ing ===3) {arr = [[10,50], [43,28], [76,50]]}
    else if (ing === 4) {arr= [[10,50], [30,28], [55,28], [76,50]]}
    else if (ing ===5) {arr = [[10,50], [30,28], [55,25], [76,60], [68,40]]}
    return arr
}//kinda tedious, but gives more control over the aesthtic to manually generate coords 


const Counter = ({recipeNo,stepNo , difficulty, next_step}) => {  
    console.log(difficulty)
    //variables for use 
    let task = recipes[recipeNo].step[stepNo]
    const seconds_arr= [15,20,30,40,50]
    const total_seconds = seconds_arr[difficulty[0]] //adapt based on sustained attention
    const ing_arr = task.ing[difficulty[1]]
    const  initialcoords =  generateinitialcoords(ing_arr.length) 

    //setting states
    const [ing, setIng] = useState(0)
    const [baring, setBar]= useState (0)
    const ingRef = useRef(null)
    const [lastUniqueID, setUid] = useState(ing_arr.length)
    const movingIngredient = useRef(null)
    const [seconds, setSeconds] = useState(0)
    const [text, setText] = useState(null)
   
    //set total --> to move on with the wait type. or to move on after totalsec for add. --> then call gameover with props  

    useEffect(() =>{
        setIng(()=> {
        let newState = ing_arr.map((ing, index)=>({
                ing_id: ing, 
                unique_id: index,
                background: `/fridge_pics/ingredient${ing}.png`,
                left: initialcoords[index][0],
                top: initialcoords[index][1]
        }));
        return newState}) //generate normal sized ingredients + positions 

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) //setup on load. empty array ensures only once, no re-renders 

    useEffect(() =>{
        //calculate x-coords based on no. of ingredients 
        // total width: 80. Starts at 10 %. width of each ing is 6
        //unaffected width without ing is 80 - 6 * n space is hence (80-6*n)/n +10 + 6*noof ing before it 
        let coords = []; 
        let n = ing_arr.length
        let space = (80- 6*n)/n
        for (var ingredient in ing_arr){
            //idk why ingredient = 0,1,2,3 but idc either LOL
            coords.push(10+ (ingredient)*(space) + space + 6*ingredient)
        }; 
        setBar(()=> {
        let newState = ing_arr.map((ing, index)=>({
                no: index,
                background: `/fridge_pics/ingredient${ing}.png`,
                left: coords[index],
                top: 10
        }));
        return newState}) 
        //small ones for the bar -- nondraggable
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) // generates timebar related stuff

    useEffect(()=>{
        let counting;
        counting = setInterval(()=>{setSeconds(seconds+ 1)},1000)
        return function cleanup(){
        clearInterval(counting)};
        
    }, [seconds]); //get seconds to check if correct 

    useEffect (()=>{
        setTimeout(()=>{
            setText(null)
        }, 2000)
    }, [text]) //perfect! or great! gives feedback on timing --> disappears after onesec

    useEffect(()=>{
        setTimeout(()=>{
            next_step()
        },(total_seconds+2)*1000)
}, [])//end step 

    function register(ing){
        movingIngredient.current = ing
    } //just to store details to a ref for easy access when checking
    
    const checkIng = (e, ui) => {
        let ing_id = movingIngredient.current.ing_id
        let unique_id = movingIngredient.current.unique_id
        //ing_id for checking, unique_id to ensure draggable and refs work properly. 
        const newPos = {
            x: (e.target.getBoundingClientRect().x / window.innerWidth) * 100,
            y: (e.target.getBoundingClientRect().y/resizeContainer()) * 100
        } //currentcoords in %

        if (newPos.x <70 && newPos.x >30 && newPos.y< 95 && newPos.y > 45){
            //ingredient is dragged to right position
            let ing_index = ing_arr.indexOf(ing_id)
            //now check timing 
            let correctSecond = total_seconds/ing_arr.length * (ing_index + 1)
            let error_margin =Math.abs(correctSecond-seconds)
            if (error_margin < 3){
                //if correct, ing disappears
                setIng(prevState=>{
                    let newState = [...prevState.filter(it=>it.unique_id!== unique_id)
                    ]
                    return newState
                });
                //bubbly text based on performance --> need css 
                (error_margin < 1.5)? setText('Perfect!'): setText('Great!');
            }
            else {
                //if not right time, return to original position by getting rid of current and then replacing w new one at original pos
                setIng(prevState=>{
                    let newState=[...prevState.filter(it=>it.unique_id!== unique_id),{
                        unique_id : lastUniqueID + 1,
                        ing_id: ing_id,
                        background: `/fridge_pics/ingredient${ing_id}.png`,
                        left: initialcoords[ing_index][0],
                        top: initialcoords[ing_index][1]
                    }]
                    return newState
                })
                setUid(lastUniqueID + 1)
            }

            return false           
        }
        return false

    } //chceks if correct (when added)
    

    return (
    <div className = 'background'>
        <div className= 'container'
        style = {{
                backgroundImage: `url(/general/bg/mixing.png)`,
                height: `${resizeContainer()}px`,
                top: `${(window.innerHeight - resizeContainer())/2}px`,
        }}>


        {ing && ing.map((food) =>
        <Draggable nodeRef={ingRef} key={`movinging-${food.unique_id}`} onStart={()=>{register(food)}} onStop={checkIng}>
            <div key = {`div-${food.unique_id}`} className='ingredients' ref={ingRef} style ={{
                    backgroundImage: `url(${food.background})`,
                    left: `${food.left}%`,
                    top: `${food.top}%`,
                    width: '22%',
                    height: '22%',
                }}
            >
            </div>
            </Draggable> 
        )}
        
        <div className='timebar'> </div>

        <div className='timebar' style = {{
            backgroundColor: 'green',
            animation: `progress ${total_seconds}s linear 0s 1 normal forwards`
        }}> </div>

        <h1>{text}</h1> 

        {baring && baring.map((food)=> 
        <div key = {`div-${food.no}`}>
        <div className='pointer' key={`p-${food.no}`} style ={{
            left: `${food.left+3.2}%`,
            top: `${food.top-3.5}%`, 
            borderWidth: `0 0 ${0.05*window.innerWidth}px ${0.05 * resizeContainer()}px`
        }}> </div>    
        
        <div className='ingredients' key={`i-${food.no}`}style ={{
            backgroundImage: `url(${food.background})`,
            left: `${food.left}%`,
            top: `${food.top}%`, 
            width: '6%',
            height: '6%',
            backgroundColor: 'white'
        }}>
        </div> 
        
        
        </div>
        )}

        

    </div>
    </div>
)}

export default Counter