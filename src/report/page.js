import React from "react";
import { useEffect, useState } from 'react';
import { ReactComponent as Hourglass } from '../user_logins/pics/icons/hourglass.svg';

import { general, gameDict, initData } from './text'

import './report.css'

//pics
import game from '../user_logins/pics/icons/game control.svg';
import ribbon from '../user_logins/pics/icons/achievement.svg'
import coin from '../user_logins/pics/icons/reportcoin.svg'
import fire from '../user_logins/pics/icons/firestreak.svg'
import down from '../user_logins/pics/icons/down icon.svg'

import { getCurrentPerformance } from "../communication_backend/firebase";

function parseNumber(num) {
    var final = Number(num)
    final = +final.toFixed(2)
    return final
}

export const ReportPage = () => {
    const uid = window.sessionStorage.getItem('uID')
    //use setdata to get dsta from back end -- generic user stats
    //get totaltime played and store in a var as well
    const [buttonArray, setButtons] = useState([1, 1, 1, 1, 1, 1, 1, 1])
    const [sphiel, setSphiel] = useState({}) //need for sphiel to be changed to trigger changes in text 

    function ChangeDropDown(index) {
        let newbuttonarr = buttonArray.slice(); //lice helps react to recognizethat the state is being changed, else unable to register as a state change 
        var newState
        buttonArray[index] === 0 ? newState = 1 : newState = 0
        newbuttonarr.splice(index, 1, newState)
        setButtons(newbuttonarr)

    }

    const [gameArrDict, setGameData] = useState(initData)

    useEffect(() => {
        async function getGameData(game) {
            console.log('getting data')
            if (uid) {
                try {
                    let resp = await getCurrentPerformance(uid, game)
                    console.log('data gotten')
                    return (resp.data)
                }
                catch (e) {
                    console.log(e)
                }
            }
            else {
                alert('Please sign in!')
                window.location.href = './login'
            }
        }
        async function loadGameData() {
            console.log('loading game...')
            for (const [game, props] of Object.entries(gameDict)) {
                let newgamedict = await getGameData(game)
                console.log(newgamedict)
                if (newgamedict === null) {
                    setGameData(prevState => {
                        delete prevState[game]
                        let newState = { ...prevState }
                        return newState
                    })
                }
                else {
                    setGameData(prevState => {
                        console.log(prevState)
                        //need new object reference
                        let newState = {
                            ...prevState,
                            [game]: newgamedict
                        }
                        //does not register as a state change 
                        return newState
                    })
                }
            }
        }

        loadGameData()
        for (const [game, props] of Object.entries(gameArrDict)) {
            setSphiel(prevState => {
                let newState = {
                    ...prevState,
                    [game]: createsphiel(game)
                }
                return newState

            })
        }
    }, [])

    function createsphiel(game) {
        let gotdata;
        console.log(gameArrDict);
        (game === 'square') ? gotdata = gameArrDict[game]['mode-0'] : gotdata = gameArrDict[game]
        let thresholdindexarr = [];
        let sphiel = '';
        //uses key to get data from dict
        for (const [key, valuearr] of Object.entries(gameDict[game].threshold)) {
            //uses the key of the value in threshold to only check against the right one
            //does not have to be in alphabetical order
            //check data against threshold arr
            console.log(key)
            var data;
            (key in gotdata) ? data = gotdata[key] : data = [0]
            var sum = 0
            for (let i = 0; i < data.length; i++) {
                sum += data[i]
            }
            var average = sum / data.length
            for (let i = 0; i < valuearr.length; i++) {
                if (average - valuearr[i] < 0) {
                    //valuearr is lowerbounds of each threshold
                    thresholdindexarr.push(i - 1)
                    break
                }
            }
        }
        gameDict[game].standard.forEach((para) => {
            //split string of each para to an array, inserting the change by index and joining back into a string

            let paraNo = gameDict[game].standard.indexOf(para)
            let thresholdindex = thresholdindexarr[paraNo]

            let newarr = para.split('CHANGE') //change will also be removed by split

            //find way to insert by threshold index in alternate spaces within the array
            for (let i = 0; i < newarr.length; i++) {
                sphiel += newarr[i]
                if (i < newarr.length - 1) {
                    sphiel += gameDict[game].indicators[paraNo][i][thresholdindex]
                }
            }
            sphiel += '\n\n'
        })
        return sphiel
    }



    return (
        <div style={{
            minHeight: '100vh', minWidth: '100vw',
            backgroundColor: '#ffddd2',
            padding: '5%'
        }}>
            <a href='./pet'><btn class='backbtn' style={{ backgroundColor: '#ffddd2' }}> back </btn></a>
            <div style={{ textAlign: "center" }}>
                <h1 style={{ marginBottom: '3vh' }}> YOUR PERFORMANCE</h1>
                <p style={{
                    color: 'black', fontFamily: 'serif', fontSize: 'large', textAlign: 'left',
                    marginBottom: '2vh'
                }}> This section summarize in-game data collected over time, making recommendations on skills addressed and other possible interventions given user's skill level at present. The following section is organized by games played, and the skills & occupation addressed in each game. Aside from displaying stats, paragrpahs below the numbers link data to specific occupations, providing insight as to how game performance may relate to users' goals.

                    Go through the following section with your occupational therapist, keeping in your mind your goals! </p>

            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {(Object.keys(gameArrDict).length === 0) && (
                    <>
                        <h1 style={{ textAlign: 'center', marginTop: '3vh' }}> No data yet!</h1>
                        <p style={{
                            color: 'black', fontFamily: 'serif', fontSize: 'large', textAlign: 'center',
                            marginBottom: '2vh'
                        }}> Start playing now come back later!</p>
                    </>
                )
                    //if no keys left --> no data at all
                }
                {Object.keys(gameArrDict).map((game) => {
                    console.log(game)
                    var gameindex = Object.keys(gameDict).indexOf(game)
                    var buttonmarker = [gameindex * 2, gameindex * 2 + 1]
                    //function to produce arr after mining data?
                    var gotdata;
                    (game === 'square') ? gotdata = gameArrDict[game]['mode-0'] : gotdata = gameArrDict[game]
                    let gamedata = []
                    gameDict[game].keys.sort().forEach(AddData);
                    function AddData(key) {
                        let value;
                        //change dict to array. by alaphabetical order of keys, by sort()
                        (key in gotdata) ? value = gotdata[key] : value = [0]
                        if (value.length > 1) {
                            let sum = 0;
                            for (const num of value) {
                                sum += num
                            }
                            sum === 0 ? gamedata.push(0) : gamedata.push(parseNumber(sum / value.length))
                        }
                        else {
                            gamedata.push(parseNumber(value[0]))
                        }
                    };


                    return (
                        <div style={{ display: 'flex', flexDirection: 'column', rowGap: '5vh' }}>
                            <div className="gameheaders">
                                <img src={gameDict[game].icon} alt='game icon' className="icons" />
                                <h1> {gameDict[game].name} </h1>
                            </div>
                            <div className="gameheaders" style={{ paddingLeft: '15vw' }}>
                                <img src={down} alt='downarrow' style={{ width: '3vw', height: 'auto' }} onClick={() => { ChangeDropDown(buttonmarker[0]) }} />
                                <h2> Skills and Occupations Addressed</h2>
                            </div>
                            {(buttonArray[buttonmarker[0]] === 1) && <div className="gametext">
                                <img src={gameDict[game].brief} style={{ width: '80%', height: 'auto' }} alt='' />
                                <p>{gameDict[game].skillsexplained}</p>
                            </div>}
                            <div className="gameheaders" style={{ paddingLeft: '15vw' }}>
                                <img src={down} alt='downarrow' style={{ width: '3vw', height: 'auto' }} onClick={() => { ChangeDropDown(buttonmarker[1]) }} />
                                <h2> Performance</h2>
                            </div>
                            {(buttonArray[buttonmarker[1]] === 1) && <div className="gametext">
                                <div className="textbox" style={{ height: '12vh' }}>
                                    {gamedata.map((value, index) => {
                                        return (
                                            <>
                                                <h1> {value}</h1>
                                                <h4> {gameDict[game].resultunits[index]}</h4>
                                            </>
                                        )
                                    })}
                                </div>
                                <p className="results">{sphiel[game]}</p>
                            </div>}

                        </div>
                    )
                })}
            </div>
        </div>
    )
}