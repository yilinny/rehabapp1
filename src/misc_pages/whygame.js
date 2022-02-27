import React, { useState} from 'react'
import {Button } from 'semantic-ui-react'

import '../gamemenu/gamemenu.css'

import logo1 from './home/logo1.png'
import logo2 from './home/logo2.png'
import logo3 from './home/logo3.png'
import logo4 from './home/logo4.png'

import motivation from './home/motivation.png'
import performanceskills from './home/running.png'
import virtualenv from './home/phone.png'
import control from './home/game control.png'
import data from './home/file.png'


export function WhyGames () {
    
    const [chosen_id, setChosenId] =useState(0);
    const benefits =[
                {
                    title:'Motivation',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pulvinar nulla scelerisque, iaculis neque vel, sagittis ipsum. Suspendisse interdum pellentesque lacus in eleifend. Nam vel justo at metus feugiat lobortis feugiat ut nulla. Etiam dapibus suscipit ultricies. Etiam dictum congue justo. In imperdiet turpis sem, sodales molestie sem rhoncus eget. Proin pellentesque purus nec est scelerisque hendrerit. Cras eget lacus felis. Curabitur quis dui quis augue pharetra viverra consectetur eget nisl. Maecenas enim metus, vestibulum nec augue nec, ullamcorper posuere felis. Etiam vitae nunc quis nunc euismod rhoncus eget sed mi.',
                    pic: motivation,
                },
                {
                    title:'Performance Skills',
                    text:'Donec porttitor ante purus, nec dignissim felis elementum vitae. Nam felis metus, fermentum ut sapien eget, euismod semper dolor. Nullam eget nisl nulla. Maecenas scelerisque quam nec arcu elementum, a gravida lacus rutrum. Duis consectetur volutpat nisi ut tempor. Proin orci felis, imperdiet at velit eu, sagittis tempor nisi. Nullam aliquam sagittis libero, vel scelerisque ex vestibulum vel. Nullam tincidunt nisl vel ex viverra, ut tincidunt sem laoreet. Aenean condimentum congue mauris nec consequat. Nam et justo fermentum, tempor nulla nec, dapibus ex. Mauris venenatis quam mauris, sed gravida dolor scelerisque sed. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
                    pic:performanceskills
                },
                {
                    title:'Virtual environment and risk taking',
                    text:'',
                    pic:virtualenv
                },{
                    title:'Control and grading',
                    text:'',
                    pic:control
                },{
                    title:'Potential for personalization',
                    text:'',
                    pic: logo3,
                },{
                    title:'Data analytics',
                    text: '',
                    pic:data
                }
    ];

    const onChangeDirection= (direction) =>  {
        let a= chosen_id;
        (direction=== 'L')? a= a -1 : a = a+1
        if (a > 5 || a < 0) {
            (a > 5)? a=0 : a=5
        }
        setChosenId(a)

    };

    return(
        <div class='whygamecontainer'>
            <h1 style={{color:'#a3776c', textAlign:'center', paddingTop:'10%'}}> WHY GAMES?</h1>
            <a href='./'><btn class='backbtn' style={{backgroundColor:'#ffddd2'}}> back </btn></a>
            <p> This game was inspired by the creators’ time on placements as occupational therapy students. Our experience made us realise the lack of human resources in carrying out the intensity of therapy that is optimal for neurological rehabilitation. At the same time, we recognized the immense potential games have in motivating clients in engaging with therapy, whilst exercising various cognitive and motor skills. Thus we hope to tap on accessible gamified interventions to expunge that gap. 
            </p>
            <h3> UNIQUE BENEFITS OF USING GAME AS THERAPY </h3>
            <div style={{paddingLeft:'10%'}}>
            <div class='whygamecard'>
                <img style= {{width:'300px', height:'auto'}}src={benefits[chosen_id].pic} alt ='decorative icons'></img>
                <div style={{display:'flex',flexDirection:'column', justifyContent:'space-evenly'}}>
                <h3 style={{paddingTop:'2%', color:'#006d77'}}> {benefits[chosen_id].title}</h3>
                <p>{benefits[chosen_id].text}</p> 
                </div>
            </div></div>
            <div style={{display:'flex', justifyContent:'center', paddingTop:'2%'}}>
            <Button  style = {{width: '10%'}}icon='angle left' onClick={()=>{onChangeDirection('L')}}/>
            <Button  style ={{width: '10%'}} icon='angle right' onClick={()=>{onChangeDirection('R')}}/>
            </div>
            <h3 style={{paddingTop:'5%'}}> TIPS FOR USING THIS WEBAPP</h3>
            <div style={{display:'flex', flexDirection:'row'}}> 
                <img src={logo1} style={{width:'250px', height:'auto'}}alt='boy reading book'></img>
                <p style={{flexGrow:'2'}}> Read the games' description for ideas of what skills each game addresses to choose the perfect game  </p>
                <img style={{width:'250px', height:'auto'}} src={logo2} alt='information icon'></img>
                <p style={{flexGrow:'2'}}> Find out more about how you can  grade or adapt games for your clients by pressing/hovering the information button in the settings </p>
            </div>
            <div style={{display:'flex', flexDirection:'row'}}> 
                <img src={logo3} style={{width:'250px', height:'auto'}}alt='girl clipart'></img>
                <p style={{flexGrow:'2'}}>
                Work with clients and understand their needs and preferences in choosing and adapting games.</p>
                <img style={{width:'250px', height:'auto'}} src={logo4} alt='www icon'></img>
                <p style={{flexGrow:'2'}}> If you've found the games useful, check out: my-therappy.co.uk or the OT Toolbox for other games suitable for OT </p>
            </div>
            <h3> FEEDBACK </h3>
            <p> This is a game, designed for both clients and clinicians alike (read the information manual embedded in the game for details!). As we are no coding experts and are merely at the start of our OT career, we understand that our games are by no means perfect, so we welcome any feedback here. In the meantime, happy playing!</p>
            <div style={{justifyContent:'center', paddingBottom:'10vh'}}>

            </div>
        </div>
    )

}


