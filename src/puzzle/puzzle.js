import 'react-confirm-alert/src/react-confirm-alert.css'; //can copy css from git hub and edit -- h1 text too large
import React, { useState, useCallback, useRef, useEffect } from 'react'
import './puzzle.css'
import '../general/countdown'
import { TimeUp } from '../general/countdown';
import { increase_distribution_p } from './puzzleadaptations';
import { EndGame, Puzzleright } from './popup';
import { Button } from 'semantic-ui-react';
import { updateStats, addCoins } from '../communication_backend/firebase';


const clamp = (value, min, max) => {
    if (value < min) {
        return min;
    }
    if (value > max) {
        return max;
    }
    return value;
};

const solveTolerancePercentage = 0.040;



export const JigsawPuzzle = ({ imageSrc, rows, columns, percent, wrong_piece, avoid, increase }) => {
    const [tiles, setTiles] = useState(0); // is there a way to make 'loading' show, as 0 is shown before the pic loads  
    //useState as a way to create states inside of function instead of creating classes
    const [imageSize, setImageSize] = useState(0);
    const [rootSize, setRootSize] = useState(0);
    const [calculatedHeight, setCalculatedHeight] = useState(0);
    const rootElement = useRef(0);
    const resizeObserver = useRef(0);
    const draggingTile = useRef(0);
    const [gameOver, setGameOver] = useState(0);
    const centered = (1 - percent) * 50; //vh and vw to centered the board
    const minmaxratio = (1 - percent) / (2 * percent); //clamps outside of the board
    const initialcorrect = rows * columns - wrong_piece //check wrong_piece is less than total
    const timefinished = useRef(0);
    const uid = window.sessionStorage.getItem("uID")

    function CalculateRightCoords(position) {
        let xPercent = position % columns / columns
        let yPercent = Math.floor(position / columns) / rows
        return ([xPercent, yPercent])
    }

    useEffect(() => {
        async function updateUserStats(data) {
            await updateStats(uid, 'puzzle', data)
        }
        if (gameOver === 'over') {
            console.log(timefinished.current)
            let timearr = timefinished.current.split(':')
            let totaltime = parseInt(timearr[1]) * 60 + parseInt(timearr[2])
            //post data
            if (uid) {
                updateUserStats({
                    Pieces: wrong_piece,
                    Time: totaltime,
                    Speed: (wrong_piece / totaltime)
                })

                addCoins(uid, wrong_piece)
            }
        }

    }, [gameOver])


    const onImageLoaded = useCallback((image) => {
        setImageSize({ width: (percent) * window.innerWidth, height: (image.height / image.width) * percent * window.innerWidth });
        //resizing image height based on width
        //width is set to 0.8vw

        let initialCorrectTiles = []
        //decide which tiles are correct 
        if (initialcorrect > 0) {
            for (var a = 0; a < initialcorrect; a++) {
                var correctTile = Math.floor(Math.random() * rows * columns)
                if (initialCorrectTiles.includes(correctTile) === false) {
                    initialCorrectTiles.push(correctTile)
                }
                else { a = a - 1 } //repeat proces
            }
        }

        let randomCoords = []
        for (var b = 0; b < rows * columns; b++) {
            if (initialCorrectTiles.includes(b)) {
                randomCoords = [...randomCoords, CalculateRightCoords(b)]
            }
            else {
                randomCoords = [...randomCoords, increase_distribution_p(increase, avoid, minmaxratio)]
            }
        } //add quadrant function on

        function setSolve(n) {
            if (initialCorrectTiles.includes(n)) { return (true) }
            else { return (false) }
        }
        //create an array of random numbers using .map range for percentage is minratio and 1 + max ratio, an array of x and y coordinates
        //use key to access the specific random number for postion

        if (rootSize) { setCalculatedHeight(rootSize.width / image.width * image.height); }

        setTiles(Array.from(Array(rows * columns).keys()) //renders 'correct area'
            .map(position => ({
                correctPosition: position,
                tileHeight: image.height / rows,
                tileWidth: image.width / columns,
                tileOffsetX: (position % columns) * (image.width / columns),
                tileOffsetY: Math.floor(position / columns) * (image.height / rows),
                currentPosXPerc: randomCoords[position][0],
                currentPosYPerc: randomCoords[position][1],
                solved: setSolve(position),
            })));

        //eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [rows, columns]);

    //the eslint disable is impt if not throw warning and i think i know what i am doing HAHAHA

    const onRootElementResized = useCallback(() => {

        setRootSize({
            width: percent * window.innerWidth,
            height: percent * window.innerHeight
        });
        if (imageSize) {
            setCalculatedHeight(window.innerWidth / imageSize.width * imageSize.height);
        }

        //eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [setRootSize, imageSize]);

    const onRootElementRendered = useCallback((element) => {
        if (element) {
            rootElement.current = element;
            const observer = new ResizeObserver(onRootElementResized);
            observer.observe(element);
            resizeObserver.current = observer;
            setRootSize({
                width: element.offsetWidth,
                height: element.offsetHeight
            });
            if (imageSize) {
                setCalculatedHeight(element.offsetWidth / imageSize.width * imageSize.height);
            }
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [setRootSize, imageSize, rootElement, resizeObserver]);

    useEffect(() => {
        const image = new Image();
        image.onload = () => onImageLoaded(image);
        image.src = imageSrc;
        //eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [imageSrc, rows, columns]);

    const onTileMouseDown = useCallback((tile, event) => {
        if (!tile.solved) {
            if (event.type === 'touchstart') {
                document.documentElement.style.setProperty('overflow', 'hidden');
            }
            const eventPos = {
                x: event.pageX ?? event.touches[0].pageX,
                y: event.pageY ?? event.touches[0].pageY
            };
            draggingTile.current = {
                tile,
                elem: event.target,
                mouseOffsetX: eventPos.x - event.target.getBoundingClientRect().x,
                mouseOffsetY: eventPos.y - event.target.getBoundingClientRect().y
            };
            event.target.classList.add('jigsaw-puzzle__piece--dragging');
        }
    }, [draggingTile]);

    const onRootMouseMove = useCallback((event) => {
        if (draggingTile.current) {
            event.stopPropagation();
            event.preventDefault();
            const eventPos = {
                x: event.pageX ?? event.touches[0].pageX,
                y: event.pageY ?? event.touches[0].pageY
            };
            const draggedToRelativeToRoot = {
                x: clamp(eventPos.x - rootElement.current.getBoundingClientRect().left - draggingTile.current.mouseOffsetX, -rootSize.width * (minmaxratio), window.innerWidth - draggingTile.current.elem.offsetWidth),
                y: clamp(eventPos.y - rootElement.current.getBoundingClientRect().top - draggingTile.current.mouseOffsetY, -rootSize.height * minmaxratio, window.innerHeight - draggingTile.current.elem.offsetHeight),
            };
            draggingTile.current.elem.style.setProperty('left', `${draggedToRelativeToRoot.x}px`);
            draggingTile.current.elem.style.setProperty('top', `${draggedToRelativeToRoot.y}px`);
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [draggingTile]);

    //function to get position of dragged tiled in 

    const onRootMouseUp = useCallback((event) => {
        if (draggingTile.current) {
            if (event.type === 'touchend') {
                document.documentElement.style.removeProperty('overflow');
            }
            draggingTile.current?.elem.classList.remove('jigsaw-puzzle__piece--dragging');
            const draggedToPercentage = {
                x: clamp(draggingTile.current.elem.offsetLeft / rootSize.width, -(minmaxratio), 1 + minmaxratio),
                y: clamp(draggingTile.current.elem.offsetTop / rootSize.height, -(minmaxratio), 1 + minmaxratio)
            };
            //- to account for the centered game board 

            const draggedTile = draggingTile.current.tile;
            const targetPositionPercentage = {
                x: draggedTile.correctPosition % columns / columns,
                y: Math.floor(draggedTile.correctPosition / columns) / rows
            };

            const isSolved = Math.abs(targetPositionPercentage.x - draggedToPercentage.x) <= solveTolerancePercentage &&
                Math.abs(targetPositionPercentage.y - draggedToPercentage.y) <= solveTolerancePercentage;


            setTiles(prevState => {
                const newState = [
                    ...prevState.filter(it => it.correctPosition !== draggedTile.correctPosition),
                    {
                        ...draggedTile,
                        currentPosXPerc: !isSolved ? draggedToPercentage.x : targetPositionPercentage.x,
                        currentPosYPerc: !isSolved ? draggedToPercentage.y : targetPositionPercentage.y,
                        solved: isSolved
                    }
                ];
                if (newState.every(tile => tile.solved)) {
                    timefinished.current = document.getElementById('time').textContent
                    setGameOver('over')
                }
                return newState;
            });

            draggingTile.current = undefined;
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [draggingTile, setTiles, rootSize]);

    if (tiles === 0) {
        return <div className='loading'>
            <h2> Loading... </h2>
            <h4> Please wait for up to a minute</h4>
        </div>
    }

    else if (gameOver === 'over') {
        return (<EndGame time={timefinished.current} src={imageSrc} />)

    }
    else return (
        <div draggable={false} style={{ backgroundColor: '#dda15e', width: '100vw', height: '100vh', overflow: 'hidden' }}>
            <br />
            <TimeUp marker={gameOver} />
            <br />
            <Button href='./puzzle'> Back </Button>
            <Puzzleright src={imageSrc} />
            <br />


            <div ref={onRootElementRendered} onTouchMove={onRootMouseMove} onMouseMove={onRootMouseMove} onTouchEnd={onRootMouseUp} onMouseUp={onRootMouseUp} onTouchCancel={onRootMouseUp} onMouseLeave={onRootMouseUp} className="jigsaw-puzzle"
                style={{ height: !calculatedHeight ? undefined : `${rootSize.height}px`, width: `${rootSize.width}px`, top: `${centered}vh`, left: `${centered}vw`, border: '3px solid #000000' }}
                onDragEnter={event => {
                    event.stopPropagation();
                    event.preventDefault();
                }} onDragOver={event => {
                    event.stopPropagation();
                    event.preventDefault();
                }}>
                {tiles && rootSize && imageSize && tiles.map(tile => <div draggable={false} onMouseDown={event => onTileMouseDown(tile, event)} onTouchStart={event => onTileMouseDown(tile, event)} key={tile.correctPosition} className={`jigsaw-puzzle__piece ${tile.solved ? ' jigsaw-puzzle__piece--solved' : ''} `}
                    style={{
                        position: 'absolute',
                        height: `${(1 / rows * 101)}%`,
                        width: `${(1 / columns * 101)}%`,
                        backgroundImage: `url(${imageSrc})`,
                        backgroundSize: `${rootSize.width}px ${rootSize.height}px`,
                        backgroundPositionX: `${tile.correctPosition % columns / (columns - 1) * 100}%`,
                        backgroundPositionY: `${Math.floor(tile.correctPosition / columns) / (rows - 1) * 100}%`,
                        left: `${tile.currentPosXPerc * rootSize.width}px`,
                        top: `${tile.currentPosYPerc * rootSize.height}px`
                    }} />)}

                {Array.from(Array(rows * columns).keys()).map(number => <div style={{
                    borderStyle: 'solid',
                    backgroundColor: 'transparent',
                    position: 'absolute',
                    height: `${(1 / rows * 101)}%`,
                    width: `${(1 / columns * 101)}%`,
                    left: `${CalculateRightCoords(number)[0] * rootSize.width}px`,
                    top: `${CalculateRightCoords(number)[1] * rootSize.height}px`

                }} />)}
            </div>
        </div>);
};

//tiles returned are the jigsaw pices produced
//even tho px i think is scaleable as rootsize is determined by getcontentrect