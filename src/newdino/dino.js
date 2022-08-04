    import { useState, useEffect } from 'react';
    import { Button } from 'semantic-ui-react';
    import AnimatedDino from './pics/dinospace.gif'
    import './dino.css'

    function DinoAvatar (props) {
        return (
        <div
            className="doodler"
            style={{
            left: `${props.dino.left}%`,
            bottom: `${props.dino.bottom}%`,
            }}
        />
        );
    }

    function Obstacles (props){
    let obstacleList = props.obstacle
        return (
            obstacleList.map(
                (obstacle)=>
                    <div
                        className="obstacle"
                        style = {{
                            left: `${obstacle.left}%`,
                            bottom : `${obstacle.bottom}%`
                        }}
                    />
        ))

    }

    export function Dino ({control=2, progressive = 1, difficulty = 0, arrowsensitivity = 2}){
        const [dino, SetDino] = useState({})
        const [isGameOver, setIsGameOver] = useState(true)
        const [obstacle, setObstacle] = useState ([])
        const [score, setScore] = useState() 
        const [text, setText] = useState ()
        const displacement = (arrowsensitivity+1) * 2
        const [currentDiff, setDiff] = useState(difficulty)
        const [speed, setSpeed] = useState(100-((difficulty+1)*10))
        const [pause, setPause] = useState(false)
        const [stop, setStop] = useState(false) //stop checking for correct if stop === true, then no check 


        const buttonsLocation=[
            {score: 10, scoretop:20, top:48, left:74, right:74, boost:74, boosttop: 80}, 
            {scoretop: 23, score: 10, top:75, left:18, right:88, boost:7, boosttop: 60}, 
            {scoretop:23, score:83, top:75, left:90, right:15, boost:81, boosttop: 60} ]
        
        //speed = array[difficulty]; or write a equation with decreasing gradient for when difficulty increases, at multiple of 15000
        // if progressive, useeffect to change speed using the equation. use effect only changes when dependency change. 
        
        function createDino (){
            return({
                left: 50,
                bottom : 30
            })}

        function createNewObstacle (){
            return([{
                left : Math.random() * 100,
                bottom: 80
            }])} //different list based on difficulty level

        function start(){
            setIsGameOver(false)
            setStop(false)
            setPause(false)
            setScore(0)
            SetDino(createDino())
            const newObstacles = createNewObstacle()
            if (currentDiff > 5){
                console.log(currentDiff)
                console.log('extra set being pushed')
                newObstacles.push({
                left: Math.random() * 100,
                bottom: 120
            })} 
            setObstacle(newObstacles)
        }

        function turn(direction){
            let newXCoord
            (direction === 'left')? newXCoord = dino.left - displacement: newXCoord = dino.left + displacement
            if (newXCoord< 0) {newXCoord = 0}
            else if (newXCoord > 94){newXCoord =94}
            if (pause === false){SetDino({
                bottom: 30,
                left: newXCoord
        })}}

        
        //score given based on time passed
        useEffect(()=>{
            let interval;
            if (pause === false){
            interval = setInterval(()=>{
            if (isGameOver===false && typeof(score) =='number'){
            setScore(score + 10);
            if ((score + 10)%1500 ===0 && progressive === 1){
                setDiff(currentDiff + 1)
                if (speed > 5){setSpeed(5 + speed -10)} //ensure interval does not go down to 0
            }
        
        }},100)}
            
            return function cleanup(){
            clearInterval(interval)};
                
        }, [score, pause]); 
        
        //keep obstacles moving, generate new ones at the bottom 
        useEffect(()=>{
            let interval;
            if (pause === false){
            interval = setInterval(()=>{
            let obsPerRow = Math.ceil(currentDiff/4 + 0.1);
            let bottomLine = 20-obsPerRow;

            if (obstacle.length > 0){
                if (obstacle[0].bottom<=20 && obstacle[0].bottom >bottomLine){
                    obstacle.push({
                        left: Math.random()*100,
                        bottom: 80
                    }) 
            }
                if (obstacle[0].bottom <=0){obstacle.shift()}
        }
            
            setObstacle(
                obstacle.map((rock) => {
                  return { ...rock, bottom: rock.bottom - 1};
                }),
            )},speed) }

            return function cleanup(){
            clearInterval(interval)};
                
        }, [obstacle,pause]); 
        
        //function to check collision 
        useEffect (()=>{
            let interval;
            console.log(speed)
            if (pause === false){
            interval = setInterval (()=>{
                console.log('hi i am checking')
                if (obstacle.length > 0){
                    var i;
                    for (i=0; i<obstacle.length; i++){
                        console.log(obstacle[i]);
                        if (obstacle[i].bottom < 40 && obstacle[i].bottom> 25){
                            let difference = Math.abs(obstacle[i].left - dino.left)
                            if (difference<10 && stop === false){
                                setText ('GAME OVER')
                                setTimeout(()=>{setIsGameOver(true); setText()}, 2000)
                                setStop(true)
                            }}}}
            }, speed)}

            return function cleanup(){
                clearInterval(interval)};

        })
     
        return (
            <>
            <div style={{backgroundColor:'black', width:'100vw', height:'100vh', position:'absolute'}}></div>
            
            <Button href='/dino' style={{top:'5%', left:'5%', position:'absolute'}}> Back to settings</Button>
            <Button icon='angle left' size='big' style={{position:'absolute', top:`${buttonsLocation[control].top}vh`, right:`${buttonsLocation[control].right}vw`}} onClick={()=>{turn('left')}}/>
            <Button  icon='angle right' size ='big'style={{ position:'absolute', top:`${buttonsLocation[control].top}vh`, left:`${buttonsLocation[control].left}vw`}} onClick={()=>{turn('right')}}/>
            <div  className="score" style={{position:'absolute', left:`${buttonsLocation[control].score -1}vw `, top:`${buttonsLocation[control].scoretop}vh`}}>{score}</div>
            <div className="grid">
                {!isGameOver && !pause && (
                <>
                    <Button style = {{top: '5%', left: '80%', position:'absolute'}} onClick={()=>{(pause === false)?setPause(true): setPause(false)}}>PAUSE</Button>
                    <h1 style={{color:'white', top: '25vh', left:'30%', position: 'absolute'}}>{text}</h1>
                    <Obstacles obstacle = {obstacle}/>
                    <DinoAvatar dino = {dino}/>
                </>
            )}
                {!isGameOver && pause && (
                    <>
                        <div style ={{backgroundColor:'black', opacity:'0.8', width:'100%', height:'100%'}}>
                        <h1 style ={{color: 'white', top: '20%', left: '15%', position:'absolute'}}> GAME PAUSED </h1> 
                        <Button style = {{top: '60%', left: '35%', position:'absolute'}} onClick={()=>{(pause === false)?setPause(true): setPause(false)}}>Resume</Button>
                        </div>
                    </>

            
            )}
                {isGameOver && (
                <>
                <div className="instructions">
                {' '}
                DinoJump <br /> Help Dino explore space! Use the arrow buttons to avoid the space rocks and go further each time.
                </div>
                <img src={AnimatedDino} style={{position:'absolute', top:'30vh', left:'12vw', width:'20vw', height:'auto'}} alt=''/>
                <Button onClick={()=>{start()}}  style={{position: 'absolute', top:'80vh', left: '15vw', width:'15vw', height:'auto'}} size='big' >Start</Button>
            </>
            )}
        </div>
        </>
        
        )
    }

    export default Dino