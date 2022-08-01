import React, { useEffect, useState } from 'react';
import '../index.css'

const StringTime = seconds => {
  var sec_num = parseInt(seconds, 10); // don't forget the second param
  var minutes = Math.floor(sec_num / 60)
  var sec = sec_num % 60

  
  if (minutes < 10) {minutes = "0"+minutes;}
  if (sec < 10) {sec= "0"+sec;}
  return (`${minutes}:${sec}`);
}

export class TimeComponent extends React.Component {
    constructor(props){
      super(props);
      this.state = {seconds: props.time, interval : 0, paused : props.paused};
    };
    render(){
      if (this.state.seconds === 0){clearInterval(this.interval); this.props.onGameOver(); return (null)} 
      else {return( `Countdown:${this.state.seconds}`);}
    }

    componentDidMount() {
      if (this.state.paused === false){
        this.interval = setInterval(() => {this.setState({seconds: this.state.seconds -1})}, 1000);}
      
    }
    componentWillUnmount() {
        clearInterval(this.interval);
      }
}


export const TimeUp = (props) =>{
  const [seconds, setSec] = useState(0)
  const [time, setTime] = useState(0) 

  useEffect(()=>{
    let counting;
    if (props.marker !== 'over'){
    counting = setInterval(()=>{setSec(seconds+ 1)},1000);
    setTime(StringTime(seconds));}
    else if (props.marker === 'over') {clearInterval(counting)}
    return function cleanup(){
    clearInterval(counting)};
    
  }, [seconds, props.marker]);

  return(
    <div id='time' style={{backgroundColor:'#dda15e'}}><h4>Time Elapsed: {time}</h4></div>
  )
}

//props iin a function?
