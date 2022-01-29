import React, { useState, useEffect, useRef } from 'react'
import Draggable from 'react-draggable'
import recipes from './recipes'
import './stove.css'

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


function generateinitialcoords_wait (ing){
    var arr
    if (ing === 1) {arr= [[43,50]]}
    else if (ing ===2) {arr = [[20,50], [65,53]]}
       return arr
}


const Stove = ({recipeNo, stepNo,  difficulty, next_step}) => {  
    console.log(difficulty)
    //variables for use 
    let task = recipes[recipeNo].step[stepNo]
    const time_arr= [15,20,30,40,50]
    const total_seconds = time_arr[difficulty[0]] //adapt based on sustained attention
    const ing_arr = (task.adapt.type === 'add') ? task.ing[difficulty[1]]: task.ing// ingredient list no change for other mode
    const  initialcoords = (task.adapt.type ==='add') ? generateinitialcoords(ing_arr.length) : generateinitialcoords_wait (ing_arr.length)
    const opacity = (task.adapt.type === 'add') ? 1: 0 // hides timebar and related divs

    //setting states
    const [ing, setIng] = useState(0)
    const [baring, setBar]= useState (0)
    const ingRef = useRef(null)
    const [lastUniqueID, setUid] = useState(ing_arr.length)
    const movingIngredient = useRef(null)
    const [seconds, setSeconds] = useState(0)
    const [correctseconds, setCorrect] = useState(0)
    const [text, setText] = useState(null)
    const [cook,setCooking] = useState('paused')
    const [correct, setTotalCorrect] = useState(0)
    let imgSrc; 
    (task.adapt.fireNo === 1)? imgSrc = '/general/bg/onefire.png': imgSrc = '/general/bg/twofire.png';

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

        if (task.adapt.type === 'wait'){
            let correct_arr = [];
            for (var c = 0; c < ing_arr.length; c++){
                let a = 30;
                correct_arr.push(a);} //correct time would be half of this, when brightness 100%
            setCorrect(correct_arr);
            setCooking(Array(ing_arr.length).fill('running'));
        } //sets correct time for wait mode 

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

    useEffect(()=>{
            setTimeout(()=>{
                next_step()
            },(total_seconds+2)*1000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect (()=>{
        setTimeout(()=>{
            setText(null)
        }, 2000)
    }, [text]) //perfect! or great! gives feedback on timing --> disappears after onesec


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
                console.log('checking')
                
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

    const checkTime = (food) =>{
        console.log(food.ing_id)
        if (task.adapt.type ==='wait'){
            //get id index
            let ing_index = ing_arr.indexOf(food.ing_id)
            //check time
            if (seconds > 0.35* correctseconds[ing_index] && seconds < 0.6*correctseconds[ing_index]) {
                setTotalCorrect(correct + 1)
                let current_state = cook;
                current_state.splice(ing_index,1,'paused')
                setCooking(current_state);
                (seconds > 0.45* correctseconds[ing_index] && seconds < 0.5*correctseconds[ing_index]) ? setText('Perfect!') : setText('Great!')
            }
            if (correct === ing_arr.length -1){
                next_step()
            }
        }
    }

    return (
    <div className = 'background'>
        <div className= 'container'
        style = {{
                backgroundImage: `url(${imgSrc})`,
                height: `${resizeContainer()}px`,
                top: `${(window.innerHeight - resizeContainer())/2}px`,
        }}>
        {(task.adapt.fireNo === 1)? <div className={task.adapt.cookery}></div> : <div> 
            <div  className= {task.adapt.cookery} style = {{
                left: '10%'
            }}></div>
            <div className={task.adapt.cookery} style = {{
                left: '55%'
            }}> </div>
            </div>} 

        {(task.adapt.type === 'add' && task.adapt.cookery === 'pan') ?<div className='finalfood' style = {{
            backgroundImage: `url(/final_pics/final-r${recipeNo}.png)`,
            animation: `foodin ${total_seconds}s linear 0s 1 normal forwards`
            

        }}> </div>: <div> </div>}

        {ing && ing.map((food) =>
        <Draggable disabled={(task.adapt.type==='add')? false: true}nodeRef={ingRef} key={`movinging-${food.unique_id}`} onMouseDown={()=>{checkTime(food)}}onStart={()=>{register(food)}} onStop={checkIng}>
            <div key = {`div-${food.unique_id}`} className='ingredients' ref={ingRef} style ={{
                    backgroundImage: `url(${food.background})`,
                    left: `${food.left}%`,
                    top: `${food.top}%`,
                    width: '18%',
                    height: '18%',
                    animation: `cooking ${correctseconds[food.unique_id]}s linear 0s 1 normal forwards ${(task.adapt.type === 'add')? 'paused': cook[food.unique_id]}`
                }}
            >
            </div>
            </Draggable> 
        )}
        
        <div className='timebar' style = {{
            opacity: `${opacity}`
        }}> </div>

        <div className='timebar' style = {{
            opacity: `${opacity}`,
            backgroundColor: 'green',
            animation: `progress ${total_seconds}s linear 0s 1 normal forwards`
        }}> </div>
        <h2 style={{top:'20%', left: '15%',opacity: `${(opacity === 0)? 0 :1 }`}}> Add ingredient to pot at the right time by dragging!!</h2>
        <h2 style={{top:'10%', opacity: `${(opacity === 1)? 0 :1 }`}}> Tap when the food is golden-brown and ready!!</h2>
        <div></div>

        <h1>{text}</h1> 

        {baring && baring.map((food)=> 
        <div key = {`div-${food.no}`}>
        <div className='pointer' key={`p-${food.no}`} style ={{
            opacity: `${opacity}`,
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
            backgroundColor: 'white',
            opacity: `${opacity}`
        }}>
        </div> 
        
        
        </div>
        )}

        

    </div>
    </div>
)}

export default Stove