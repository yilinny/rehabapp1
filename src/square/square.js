/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react';
import '../index.css';
import { TimeComponent } from '../general/countdown';
import { GameOver, LevelUp } from '../general/screens';
import { increase_distribution, randomfive, AdaptedSquare } from './adaptations';
import { SquareSettings } from './squaresettings';
import { Circle } from './adaptations';
import '../index.css'
import { Button } from 'semantic-ui-react';
import { addCoins, getCurrentPerformance, postGameData } from '../communication_backend/firebase';
import { json } from 'mathjs';
const uid = window.sessionStorage.getItem('uID')

function generate_coordinates(side) {
    let coord = Math.floor(Math.random() * 90) + 1
    let strcoord;
    if (side === 'x') { strcoord = String(coord) + 'vw' }
    else if (side === 'y') { strcoord = String(coord) + 'vh' }
    return (strcoord)
}//randomly places square

const updateTarget = (level_increment) => {
    // y = 1.5x + 3 (x is current increment to level up)
    // y-3/1.5 = x (y is new increment to level up)
    let currentX = (level_increment - 3) / (1.5)
    currentX++
    level_increment = Math.ceil((currentX * 1.5 + 3))
    return (level_increment)
} //ie. need to tap more squares /20s --> difficulty increases


let score = 0

function Square(props) {

    const [coords, setCoords] = useState([]);


    let size = [];

    useEffect(() => {
        if (props.quad === 'NIL' && props.noquad === 'NIL') {
            setCoords([generate_coordinates('x'), generate_coordinates('y')])
        }

        else {
            let chosen_quad = props.quad;
            let unchosen = props.noquad;

            if (typeof unchosen === 'string') {
                unchosen = [unchosen]
            }
            //convert string into array -if not the two letters would be read as a single array, and 'U' would not be recognized

            setCoords(increase_distribution(chosen_quad, unchosen))
        }
    }, [props])

    if (props.size === 's') {
        size = ['2.5vw', '2.5vw']
    }

    else if (props.size === 'l') {
        size = ['10vw', '10vw']
    }

    else {
        size = ['5vw', '5vw']
    }

    return (
        <button className='square'
            style={{
                left: coords[0],
                top: coords[1],
                width: size[0],
                height: size[1],
                background: props.color
            }}

            onClick={props.onClick}
        >

        </button>
    );
}


class GameBoard extends React.Component { //react component starts with caps

    constructor(props) {
        let circle_arr;
        circle_arr = [0, 1, 2]
        for (let i = 1; i < props.level; i++) {
            circle_arr.push('aaaa');
        }

        super(props);
        this.state = {
            score_display: score,
            level: props.level,
            next_level_score: (props.level) * 5,
            level_increment: 4 + props.level, //propotional to the starting level
            game_over: false,
            level_up: false,
            settings_page: false,
            game_mode: props.mode,
            lives: props.lives,
            circles: circle_arr,
            square_no: props.square_no,
            paused: false,
            count_one: true, //only passed down to adapted square, auto set as true for initial 
            myref: React.createRef(),
            secondsleft: this.props.duration,
            totaltime: 0,
        };

        //need this to hold settings as well, passing the function to set state down into the settings function 

        this.handleClick = this.handleClick.bind(this);
        this.onTimeOut = this.onTimeOut.bind(this);
        this.gameOver = this.gameOver.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onChangeSettings = this.onChangeSettings.bind(this);
        this.handleCircle = this.handleCircle.bind(this);
        this.handleASquare = this.handleASquare.bind(this);
        this.changePaused = this.changePaused.bind(this)

    };

    onTimeOut() {
        //what happens at the end of level up screen
        let score_increase;
        if (this.state.game_mode === '2') {
            score_increase = Math.floor(3 + (parseInt(this.state.level) * 1.3))
            //each level need to get one more square correct (different scoring system for number of taps)
        }

        else { score_increase = updateTarget(this.state.level_increment) }

        this.setState({
            level_up: false,
            level_increment: score_increase,
            next_level_score: parseInt(score) + parseInt(score_increase)
        })


        if (this.state.game_mode === '1') {
            let new_arr = []
            for (let i = 1; i <= this.state.circles.length + 2; i++) {
                new_arr.push(i)
            } //2 new circles each round 

            this.setState({ circles: new_arr })
        }

    }

    handleClick() {
        score += 1
        this.setState({ score_display: score })
        //if level up
        if (score === this.state.next_level_score) {
            setTimeout(() => { this.onTimeOut() }, 3000);
            this.setState({ level_up: true })
        }
    }

    gameOver = async function () {
        //change state to trigger re-render 
        this.setState({ game_over: true })
        //update data
        if (uid) {
            let resp = await getCurrentPerformance(uid, 'square')
            console.log(resp)
            let oldPerformance = resp.data
            let mode = 'mode-' + JSON.parse(this.state.game_mode)
            //init if no pre-existing data on games 
            if (oldPerformance === null || !oldPerformance[mode]) {
                oldPerformance = {}
                oldPerformance[mode] =
                {
                    Speed: [],
                    Score: [],
                    Level: []
                }
            }
            //total time calcualtion -- if gameover is not due to live lost, totaltime = entirety of a round duration 
            let totaltime;
            (this.state.game_mode === 1 && this.state.lives === 0) ? totaltime = parseInt(this.state.totaltime) : totaltime = parseInt(this.state.totaltime + this.props.duration)
            let counter = oldPerformance[mode].Speed.push(score / totaltime); //get length of arr, more than 10, trigger calculation of average and storage of average
            oldPerformance[mode].Score.push(score);
            oldPerformance[mode].Level.push(parseInt(this.state.level));
            let calculate;
            counter >= 10 ? calculate = mode : calculate = false
            await addCoins(uid, score)
            await postGameData(uid, 'square', oldPerformance, calculate)
        }
    }

    onReset() {
        score = 0
        this.setState({
            score_display: score,
            next_level_score: 5,
            level_increment: 6,
            game_over: false,
            level_up: false
        }) // reset states to initial state + change in state to trigger rerender

        if (this.game_mode === '1') {
            this.setState({ lives: 3 })
        }
    }

    onChangeSettings() {
        score = 0
        this.setState({ settings_page: true })
    }

    handleCircle() {
        //lose one life 
        this.setState({ lives: (this.state.lives) - 1 })

        //check for game over
        if (this.state.lives === 0) {
            //add extra seconds
            let secondsExtra = this.state.myref.current.state.seconds
            this.setState({ totaltime: this.state.totaltime + secondsExtra })
            this.gameOver()

        }
    }

    handleASquare() { //handle adapted square
        if (this.state.square_no === 1) {
            score += 1
            let level = this.state.level
            this.setState({
                count_one: true,
                square_no: randomfive(),
                score_display: score
            })


            //check level up
            if ((level == 1 && score == 3) || (level == 3 && score == 7) || (level == 5 && score == 11) || (score === this.state.next_level_score)) {
                setTimeout(() => { this.onTimeOut() }, 3000);
                this.setState({ level_up: true })
                //capture total time 
                let secondsExtra = this.state.myref.current.state.seconds
                this.setState({ totaltime: this.state.totaltime + secondsExtra })
            }
            //alternative is to use factorial function but i laze esp as only got three cases
        } //generate new square. count_one would render w new coords and show number

        else {
            this.setState({ count_one: false })
            this.setState({ square_no: this.state.square_no - 1 })
        }
    }//change in states would trigger rerender of adapted square

    changePaused() {
        if (this.state.paused == false) {
            var timeleft = this.state.myref.current.state.seconds
            this.setState({
                paused: true,
                secondsleft: timeleft
            })
        }
        else {
            console.log(this.state.secondsleft)
            this.setState({ paused: false })
        }
    }

    render() {
        if (this.state.settings_page === true) {
            return <SquareSettings />
        }
        else if (this.state.game_over === true) {
            return <GameOver score={score} Settings={() => this.onChangeSettings()} onClick={() => { this.onReset(); }} />
        }

        else if (this.state.level_up === true) {
            return <LevelUp />
        }

        else if (this.state.paused === true) {
            return (
                <div className='levelup-container'>
                    <h1>Paused</h1>
                    <Button onClick={this.changePaused}>Resume</Button>
                </div>
            )
        }
        else if (this.state.game_mode === '1') {
            return (
                <div style={{ backgroundColor: '#bc6c25', width: '100vw', height: '100vh', overflow: 'hidden' }}>
                    <Button style={{ position: 'absolute', left: '93vw', top: '1vh' }} href='./square'> Back </Button>
                    <Button style={{ left: '93vw', top: '6vh', position: 'absolute' }}
                        onClick={this.changePaused}>Pause</Button>
                    <div className='navbar'>
                        <h3>{this.state.score_display}</h3>
                        <h4>lives left: {this.state.lives} &nbsp; <TimeComponent
                            ref={this.state.myref}
                            time={this.state.secondsleft}
                            paused={this.state.paused}
                            onGameOver={() => { this.gameOver() }} /></h4>

                    </div>

                    <Square
                        onClick={() => { this.handleClick() }}
                        quad={this.props.quad}
                        noquad={this.props.noquad}
                        size={this.props.size}
                        square_no={this.state.square_no}
                        color={this.props.color}
                    />

                    {this.state.circles.map((circle, index) =>
                    (<Circle
                        key={index}
                        onClick={() => { this.handleCircle() }}
                        quad={this.props.quad}
                        noquad={this.props.noquad}
                    />
                    )
                    )
                    }
                </div>
            )
        }

        else if (this.state.game_mode === '2') {
            return (
                <div style={{ backgroundColor: '#bc6c25', width: '100vw', height: '100vh', overflow: 'hidden' }}>
                    <Button style={{ position: 'absolute', left: '93vw', top: '1vh' }} href='./square'> Back </Button>
                    <Button style={{ left: '93vw', top: '6vh', position: 'absolute' }}
                        onClick={this.changePaused}>Pause</Button>
                    <div className='navbar'><h3>{this.state.score_display}</h3>
                        <h4><TimeComponent
                            ref={this.state.myref}
                            time={this.state.secondsleft}
                            paused={this.state.paused}
                            onGameOver={() => { this.gameOver() }}
                        /></h4>
                    </div>

                    <AdaptedSquare
                        onClick={() => { this.handleASquare() }}
                        quad={this.props.quad}
                        noquad={this.props.noquad}
                        size={this.props.size}
                        square_no={this.state.square_no}
                        count_one={this.state.count_one}
                        color={this.props.color}
                    />
                </div>
            )
        }

        else {
            return (
                <div style={{ backgroundColor: '#bc6c25', width: '100vw', height: '100vh', overflow: 'hidden' }}>
                    <Button style={{ position: 'absolute', left: '93vw', top: '1vh' }} href='./square'> Back </Button>
                    <Button style={{ left: '93vw', top: '6vh', position: 'absolute' }}
                        onClick={this.changePaused}>Pause</Button>
                    <div className='navbar'>
                        <h3 style={{ textAlign: 'center' }}>{this.state.score_display}</h3>
                        <TimeComponent
                            ref={this.state.myref}
                            time={this.state.secondsleft}
                            paused={this.state.paused}
                            onGameOver={() => { this.gameOver() }}
                        />
                    </div>

                    <Square
                        onClick={() => { this.handleClick() }}
                        quad={this.props.quad}
                        noquad={this.props.noquad}
                        size={this.props.size}
                        square_no={this.state.square_no}
                        color={this.props.color}
                    />
                </div>
            )
        };
        //passed down chosen quad from settings to square using quad = {this.props.quad}
    }

}

export default GameBoard;
