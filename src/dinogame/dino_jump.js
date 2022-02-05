import { useState, useEffect, useCallback } from 'react';
import './dino_jump.css';
import { Button, Image } from 'semantic-ui-react';

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

export function Dino() {
  const [isGameOver, setIsGameOver] = useState(true);
  const [platforms, setPlatforms] = useState([]);
  const [doodler, setDoodler] = useState({});
  const [score, setScore] = useState(0);
  const [direction, setDirection] = useState('none');
  const platformCount = 8;
  const startPoint = 20;
  const doodlerBottomSpace = startPoint;

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
    [score],
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
        newLeft = doodlerToJump.left - 1.5;
      }
      if (direction === 'right' && doodlerToJump.left <= 100) {
        newLeft = doodlerToJump.left + 1.5;
      }
      if (direction === 'none') {
        newLeft = doodlerToJump.left;
      }
      setDoodler({
        ...doodlerToJump,
        bottom: doodlerToJump.bottom + 2,
        left: newLeft,
      });
      if (doodlerToJump.bottom > doodlerToJump.startPoint + 20) {
        setDoodler({ ...doodlerToJump, isJumping: false });
      }
    },
    [direction],
  );

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
        if (doodler.isJumping) {
            jump(doodler);
        }
        if (!doodler.isJumping) {
          fall(doodler);
        }
        // check for landing on a platform
        platforms.forEach((platform) => {
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
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [platforms, doodler, fall, isGameOver, jump, movePlatforms]);

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
    <Button icon='angle left' size='massive' style={{position:'absolute', top:'48vh', right: '74vw'}} onClick={turnLeft}/>
    <Button  icon='angle right' size ='massive'style={{ position:'absolute', top: '48vh', left:'74vw'}} onClick={turnRight}/>
    


      <div className="grid">
        {!isGameOver && (
          <>
            <div className="score">{score}</div>
            <Doodler doodler={doodler} />
            <Platforms platforms={platforms} />{' '}
          </>
        )}
        {isGameOver && (
          <>
            <div className="score">{score}</div>
            <div className="instructions">
              {' '}
              DoodleJump <br /> Navigate with the arrow keys to bounce off platforms. Don't hit the floor!
            </div>
            <Button onClick={()=>{start()}} size='massive' style={{position: 'absolute', top:'80vh', left: '20vw'}}  >Start</Button>
          </>
        )}
      </div>
    </>
  );
}

