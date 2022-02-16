import { useState, useEffect, useCallback } from 'react';
import './dino_jump.css';
import { Button } from 'semantic-ui-react';
import AnimatedDino from './dino_pics/dinospace.gif';

function Platforms(props) {
  return props?.platforms?.map((platform) => {
    return (
      <div
        key={Math.random()}
        className="platform"
        style={{ left: `${platform.left}%`, bottom: `${platform.bottom}%` }}
      />
    );
  });
}
function Doodler(props) {
  return (
    <div
      className="doodler"
      style={{
        left: `${props.doodler.left}%`,
        bottom: `${props.doodler.bottom}%`,
      }}
    />
  );
}


export function Dino({control=0, boost = 1, difficulty =3, arrowsensitivity = 0}) {
  const [isGameOver, setIsGameOver] = useState(true);
  const [platforms, setPlatforms] = useState([]);
  const [doodler, setDoodler] = useState({});
  const [score, setScore] = useState(0);
  const [direction, setDirection] = useState('none');
  const boostdecider = boost;
  const platformCounts = [15, 12, 9, 7, 5]
  const platformCount = platformCounts[difficulty];
  const startPoint = 20;
  const doodlerBottomSpace = startPoint;
  const [isFlying, setFlying] = useState(false);
  const [boostloading, setLoading] = useState(0);
  const displacement = [1.5,2,2.5]

  const buttonsLocation=[
    {score: 5, scoretop:3, top:48, left:74, right:74, boost:74, boosttop: 80}, 
    {scoretop: 23, score: 10, top:75, left:15, right:90, boost:7, boosttop: 60}, 
    {scoretop:23, score:83, top:75, left:90, right:15, boost:81, boosttop: 60} ]


  function makeOneNewPlatform(bottom) {
    const left = Math.random() * 28 + Math.random() * 45;
    return { bottom: bottom, left: left };
  }
  // if the doodler is higher than 200px move each platform down by 4px
  // if a platform reaches the bottom, remove it from the array (shift) and add a new platform (push)
  const movePlatforms = useCallback(
    (platformsToMove, doodlerReference) => {
      if (doodlerReference.bottom > 30) {
        if (platformsToMove[0].bottom < 5) {
          platformsToMove.shift();
          setScore(score + 1);
          setLoading(boostloading + 1)
          platformsToMove.push(makeOneNewPlatform(100));
        }
        setPlatforms(
          platformsToMove.map((platform) => {
            return { ...platform, bottom: platform.bottom - 2 };
          }),
        );

        return platformsToMove;
      }
    },
    [score, boostloading],
  );
  // function for movement
  function moveStraight() {
    setDoodler({ ...doodler, direction: 'none' });
  }
  function moveLeft() {
    setDoodler({ ...doodler, direction: 'left' });
  }
  function moveRight() {
    setDoodler({ ...doodler, direction: 'right' });
  }

  function gameOver() {
    setIsGameOver(true);
  }

  const fall = useCallback(
    (doodlerToFall) => {
      let newLeft = doodlerToFall.left;
      if (direction === 'left' && doodlerToFall.left >= 0) {
        newLeft = doodlerToFall.left - 1.5;
      }
      if (direction === 'right' && doodlerToFall.left <= 340) {
        newLeft = doodlerToFall.left + 1.5;
      }
      if (direction === 'none') {
        newLeft = doodlerToFall.left;
      }
      setDoodler({
        ...doodlerToFall,
        bottom: doodlerToFall.bottom - 2,
        left: newLeft,
      });
      if (doodlerToFall.bottom <= 0) {
        gameOver();
      }
    },
    [direction],
  );
  const jump = useCallback(
    (doodlerToJump) => {
      let newLeft = doodlerToJump.left;
      if (direction === 'left' && doodlerToJump.left >= 0) {
        newLeft = doodlerToJump.left - 2.5;
      }
      if (direction === 'right' && doodlerToJump.left <= 100) {
        newLeft = doodlerToJump.left + displacement[arrowsensitivity];
      }
      if (direction === 'none') {
        newLeft = doodlerToJump.left;
      }
      setDoodler({
        ...doodlerToJump,
        bottom: doodlerToJump.bottom + displacement[arrowsensitivity],
        left: newLeft,
      });
      if (doodlerToJump.bottom > doodlerToJump.startPoint + 20) {
        setDoodler({ ...doodlerToJump, isJumping: false });
      }
    },
    [direction],
  );
  //boost button functions 
  const fly = useCallback(
    (doodlerToJump) => {
      setDoodler({
        ...doodlerToJump,
        bottom: doodlerToJump.bottom + 30,
      });
      if (doodlerToJump.bottom > doodlerToJump.startPoint + 20) {
        setDoodler({ ...doodlerToJump, isJumping: false });
      }
    },[isFlying]
  );
  
  const dinoFly = () => {
    setFlying(true);   
    setTimeout(()=>{
      setFlying(false);
      setLoading(0);
    }, 5000)
  }
  //visual element to boost ending 


  // if the doodler hits a wall, reverse direction
  function checkCollision(doodlerforCollisionCheck) {
    if (doodlerforCollisionCheck.left <= 0) {
      setDirection('right');
    }
    if (doodlerforCollisionCheck.left >= 100) {
      setDirection('left');
    }
  }
  // as long as the game is running, check for collision with walls, move the platforms, move the doodler (jump or fall), check if the doodler has landed on a platform (triggers jump)
  useEffect(() => {
    if (!isGameOver) {
      const interval = setInterval(() => {
        checkCollision(doodler);
        movePlatforms(platforms, doodler);
        if(isFlying){
          fly(doodler);
        }

        else {
          if (doodler.isJumping) {
            jump(doodler);
        }
        if (!doodler.isJumping) {
          fall(doodler);
        }
        // check for landing on a platform
        platforms.forEach((platform) => {
          if (doodler.bottom <=80){
          if (
            doodler.bottom >= platform.bottom - 2&&
            doodler.bottom <= platform.bottom + 2 &&
            doodler.left + 2>= platform.left &&
            doodler.left <= platform.left + 7 &&
            !doodler.isJumping
          ) {
            setDoodler({
              ...doodler,
              isJumping: true,
              startPoint: doodler.bottom,
            });
          }
        }});}
      }, 50);
      return () => clearInterval(interval);
    }
  }, [fly, platforms, doodler, fall, isGameOver, jump, movePlatforms, isFlying]);

  // create 5 evenly vertically spaced platform with a random horizontal placement
  function createPlatforms() {
    const plat = [];
    for (let i = 0; i < platformCount; i++) {
      const platGap = 100 / platformCount;
      const newPlatBottom = 10 + i * platGap;
      const newPlatform = makeOneNewPlatform(newPlatBottom);
      plat.push(newPlatform);
    }
    console.log({ plat });
    return [plat, plat[0].left];
  }

  function createDoodler(doodlerBottom, doodlerLeft) {
    //const doodlerLeftSpace = platforms[0].left; // ensures that the doodler starts directly above the lowest platform

    return {
      bottom: doodlerBottom,
      left: doodlerLeft,
      isJumping: true,
      direction: 'none',
      startPoint: 20,
    };
  }

  const turnLeft = () =>{
    setDirection('left');
    moveLeft();
  }

  const turnRight = () =>{
    setDirection('right');
    moveRight();
  }

  function start() {
    const [newPlatforms, doodlerLeft] = createPlatforms();
    setIsGameOver(false);
    setScore(0);
    setLoading(0);
    setPlatforms(newPlatforms);
    setDoodler(createDoodler(doodlerBottomSpace, doodlerLeft));
  }

 
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && isGameOver) {
      start();
    }
    if (event.key === 'ArrowLeft') {
        turnLeft()
      
    }
    if (event.key === 'ArrowRight') {
        turnRight()
      
    }
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      setDirection('none');
      moveStraight();
    }
  };
  //listen to key events
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    // cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });
  // conditionally render the components depending on wether the game is running
  return (
    <>
    <div style={{backgroundColor:'black', width:'100vw', height:'100vh', position:'absolute'}}></div>
    <Button href='/dino' style={{top:'5%', left:'5%', position:'absolute'}}> Back to settings</Button>
    <Button icon='angle left' size='massive' style={{position:'absolute', top:`${buttonsLocation[control].top}vh`, right:`${buttonsLocation[control].right}vw`}} onClick={turnLeft}/>
    <Button  icon='angle right' size ='massive'style={{ position:'absolute', top:`${buttonsLocation[control].top}vh`, left:`${buttonsLocation[control].left}vw`}} onClick={turnRight}/>
    {boostdecider === 1 && <Button size='massive' style={{position:'absolute', top:`${buttonsLocation[control].boosttop}vh`, left:`${buttonsLocation[control].boost}vw`}} onClick={()=>{dinoFly()}} disabled={(boostloading>=15)?false:true}>BOOST</Button>}
    <div  className="score" style={{position:'absolute', left:`${buttonsLocation[control].score -1}vw `, top:`${buttonsLocation[control].scoretop}vh`}}>{score}</div>
    <div className="grid">
        
        {!isGameOver && (
          <>
            <Doodler doodler={doodler} />
            <Platforms platforms={platforms} />{' '}
          </>
        )}
        {isGameOver && (
          <>
            <div className="instructions">
              {' '}
              DinoJump <br /> Help Dino explore space! Use the arrow buttons on the sides to navigate and bounce off platforms.
            </div>
            <img src={AnimatedDino} style={{position:'absolute', top:'30vh', left:'12vw', width:'20vw', height:'auto'}} alt=''/>
            <Button onClick={()=>{start()}}  style={{position: 'absolute', top:'80vh', left: '15vw', width:'15vw', height:'auto'}} size='big' >Start</Button>
          </>
        )}
      </div>
    </>
  );
}

export default Dino;