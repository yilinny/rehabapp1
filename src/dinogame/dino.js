
import React, {useState, useEffect} from 'react';
import './dino.css'
import { confirmAlert } from 'react-confirm-alert'; 


function resizeContainer (){
  return (1080/1920 * window.innerWidth)
}

const Yay = (score) =>{
  confirmAlert({
      title: 'Game Over',
      message: `Great job avoiding the cactus! \n\nScore: ${score} `,
      buttons: [
        {
          label: 'Try again',
          onClick: () => { 
              window.location.reload()
          }
        },
        {
          label: 'Change Difficulty',
          onClick: () => {
              //stop the timer 
          }
        }
      ]
    });
}



export function Dino ({speed = 4}){
  //speed is inverse!!!! higher = slower movement 
  const [jumpState, setJump]=useState('paused')
  const [cactiDecider, setCactiDecider] = useState ([0,0,0,0])
  const [score, setScore] =useState(0)


  useEffect(()=>{const intervalCheck = setInterval(()=> {
    const dino = document.getElementById('dino');
    //currentCactus
    let currentcactus = document.getElementById(`cactus-${cactiDecider.length-(speed*0.5)}`)
    // get current dino Y position
    let dinoTop = parseInt(
      window.getComputedStyle(dino).getPropertyValue("top"));
    // get current cactus X position
    var cactusLeft = parseInt(window.getComputedStyle(currentcactus).getPropertyValue('left'));
 
    let cactusOpacity = parseInt(window.getComputedStyle(currentcactus).getPropertyValue('opacity'))
    // detect collision
    if (cactusOpacity === 1 && cactusLeft < 0.08*(window.innerWidth) && cactusLeft > 0 && dinoTop >= 0.32*(window.innerHeight)) {
      // collision
      Yay(score)
    }
  }, 10);
  return () => clearInterval(intervalCheck);
}, [cactiDecider]) //check for collision

  useEffect(() => {
    const interval = setInterval(() => {
      let n = Math.random();
      (n>0.2)? setCactiDecider([...cactiDecider,1]): setCactiDecider([...cactiDecider,0])
      //can use n> 0,4 to adjust difficulty, or use the animation speed to adjust difficulty;
    }, 2000);
    return () => clearInterval(interval);
  }, [cactiDecider]); //generate random cacti

  useEffect(()=>{
    const scoreInterval = setInterval(()=>{
      setScore(score + 1)
    }, 10)
    return() => clearInterval(scoreInterval)
  }, [score]) // score + 1 every 10ms, +100 every second

  function jumping (){
    console.log('jump')
    setJump('running')
    setTimeout(()=>{setJump('paused')}, 1001)
  }

    return (
        <div className='dinogame' onClick = {jumping} style={{height:`${resizeContainer()}px`, top: `${(window.innerHeight - resizeContainer())/2}px`}}>
          <p>{score}</p> 
        {cactiDecider.map((no, index) => <div id= {`cactus-${index}`}className='cactus' style = {{ animation: `block ${speed}s linear 1 forwards` ,opacity:no}}></div>)}
        <div className='dino' id='dino' style ={{
          animation: `jump 1s ease-out 0s infinite forwards ${jumpState}` 
        }}></div>
        </div>
    )

}

