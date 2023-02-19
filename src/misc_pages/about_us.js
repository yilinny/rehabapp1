import React from 'react-dom'

import '../gamemenu/gamemenu.css'

import yilin from './home/yilin.png'
import sydney from './home/sydney.png'
import poyee from './home/poyee.jpg'
import ashley from './home/ashley.jpg'

export const AboutUs = () => {
    return (
        <div className='aboutuscontainer'>
            <h1 style={{ color: '#ffddd2', textAlign: 'center', paddingTop: '8%' }}> ABOUT US </h1>
            <a href='./pet'><btn class='backbtn' style={{ backgroundColor: '#ffddd2' }}> back </btn></a>
            <div className='aboutussub'>
                <img src={yilin} alt='yilin' style={{ width: '200px' }}></img>
                <div style={{ justifyContent: 'space-evenly', display: 'flex', flexDirection: 'column', paddingLeft: '5px', paddingRight: '5px' }}>
                    <h2 className='heading' style={{ color: '#006d77' }}> YI LIN </h2>
                    <p>I have always been an avid casual gamer, and mobile games have been a form de-stress for me. I recognized how games allowed clients to work on motor and cognitive skills, but often felt frustrated using them as interventions as mainstream games are not designed by therapists — there is little control and room for grading for games to be used as interventions. On the other hand, specialised games require equipment and a whole range of logistics, reducing the ability of clients to engage in those games outside of therapy hours.
                        With Sydney, I’ve used my OT knowledge to identify how everyday mobile games employ various motor and cognitive skills, and how they can be graded therapeutically. I am also a self-taught coder and used my knowledge of React JS framework to put together most of the games. </p>
                </div>
            </div>
            <div className='aboutussub'>
                <img src={sydney} alt='sydney' style={{ width: '200px' }}></img>
                <div style={{ justifyContent: 'space-evenly', display: 'flex', flexDirection: 'column', paddingLeft: '5px', paddingRight: '5px' }}>
                    <h2 className='heading' style={{ color: '#006d77' }}> SYDNEY</h2>
                    <p>This project was split into three main tasks — research into gamified interventions, coding and front-end design. I developed an interest in research during my time in the BSc Occupational Therapy course and was keen to develop my research skills outside of university, hence taking on the research element of this project was the right for me! Together with Yilin, we bounced ideas off each other to come up with innovative games that is both evidence-based and clinically relevant to both occupational therapists and clients.</p></div>
            </div>
            <h1 style={{ color: '#ffddd2', textAlign: 'center', paddingBottom: '3vh' }}> Acknowledgements </h1>
            <div className='aboutussub' style={{ columnGap: '10px' }}>
                <img alt='poyee' src={poyee} style={{ width: '200px', height: 'auto', borderRadius: '50%' }} />
                <div style={{ paddingLeft: '5px' }}>
                    <h3 style={{ color: '#006d77' }}> po yee </h3>
                    <p style={{ width: '300px' }}>for the beautiful hand-drawn space dino; and for animating it!</p>
                </div>
                <img style={{ width: '200px', height: 'auto', borderRadius: '50%' }} src={ashley} alt='ashley' />
                <div>
                    <h3 style={{ color: '#006d77' }}> ashley </h3>
                    <p style={{ width: '300px' }}>for her contribution to our front-end design, routing and brainstorming processes </p>
                </div>
            </div>
            <div style={{ paddingLeft: '10vw', paddingTop: '10vh', paddingBottom: '10vh', paddingRight: '2vw' }}>
                <p>The following open-source projects were referenced or modified for use in coding the games </p>
                <p>Yuri Becker: react-jigsaw-puzzle (avaliable at: https://github.com/yuri-becker/react-jigsaw-puzzle)</p>
                <p>Kubowania: doodle-jump (available at: https://github.com/kubowania/Doodle-Jump?ref=morioh.com&utm_source=morioh.com) </p></div>
        </div>
    )
}