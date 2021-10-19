import React from 'react';
import './index.css'

class TimeComponent extends React.Component {
    constructor(props){
      super(props);
      this.state = {seconds: props.time, interval : 0};
    };
    render(){
      if (this.state.seconds === 0){clearInterval(this.interval); this.props.onGameOver(); return (null)} 
      else {return(<div> Countdown:{this.state.seconds} </div>);}
    }

    componentDidMount() {
        this.interval = setInterval(() => {this.setState({seconds: this.state.seconds -1})}, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
      }
}

export default TimeComponent
