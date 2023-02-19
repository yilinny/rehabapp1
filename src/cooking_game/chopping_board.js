import React, { useState, useEffect } from 'react'
import recipes from './recipes'

function resizeContainer() {
    return (1080 / 1920 * window.innerWidth)
}

const ChoppingBoard = ({ recipeNo = 2, stepNo = 2, difficulty, next_step }) => {
    let task = recipes[recipeNo].step[stepNo]
    const [width, setWidth] = useState(50)
    const [chopno, setChopno] = useState(0)
    const chop_arr = [20, 40, 60]
    const correctchop = chop_arr[difficulty]
    const [time, setTime] = useState(0)

    const Chopping = () => {
        if (chopno === correctchop) {
            let exisitingchops = window.sessionStorage.getItem('chops');
            (exisitingchops) ? (window.sessionStorage.setItem('chops', (correctchop + parseInt(exisitingchops)))) : (window.sessionStorage.setItem('chops', correctchop))
            let exisitingspeed = window.sessionStorage.getItem('chopSpeed');
            (exisitingspeed) ? window.sessionStorage.setItem('chopSpeed', ((correctchop / time) + exisitingspeed) / 2) : window.sessionStorage.setItem('chopSpeed', correctchop / time)
            next_step()
            return
        }
        setWidth(50 - chopno * 50 / correctchop)
        setChopno(chopno + 1)
    }

    useEffect(() => {
        let interval;
        interval = setInterval(() => {
            setTime(time + 1)
            console.log(time)
        }, 1000)

        return function cleanup() {
            clearInterval(interval)
        };
    }, [time])


    return (
        <div className='background'>
            <div className='container'
                style={{
                    backgroundImage: `url(/general/bg/choppingboard.png)`,
                    height: `${resizeContainer()}px`,
                    top: `${(window.innerHeight - resizeContainer()) / 2}px`,
                }}>

                <div className='timebar'></div>

                <div className='timebar' style={{
                    backgroundColor: 'green',
                    width: `${chopno * (80 / correctchop)}%`
                }}></div>

                <div className='ingredients' key='cut' onClick={Chopping} style={{
                    backgroundImage: `url(/fridge_pics/ingredientc-${task.ing[0]}.png)`,
                    left: '25%',
                    top: '28.5%',
                    width: '50%',
                    height: '50%'
                }}></div>

                <div className='ingredients' onClick={Chopping} style={{
                    backgroundImage: `url(/fridge_pics/ingredienth-${task.ing[0]}.png)`,
                    left: '25%',
                    top: '28.5%',
                    width: `${width}%`,
                    height: '50%',
                    backgroundSize: 'cover'
                }} > </div>

            </div></div>
    )
}

export default ChoppingBoard