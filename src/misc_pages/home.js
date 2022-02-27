import React from 'react-dom'

import logo from './home/logo.png'
import word1 from './home/text-1.png'
import word2 from './home/text-2.png'
import word3 from './home/text-3.png'

import '../gamemenu/gamemenu.css'

export const Home = () =>{
    return(
        <div className='homecontainer'>
            <img src={logo} style={{width: '30%', height: 'auto'}} alt='logo'/>
            <div className='homesubcontainer'>
                <a href='./games'><img src={word1} style={{width: 'auto', height: '60px'}} alt ='Browse games'/> </a>
                <a href='./whygames'><img src = {word2} style={{width: 'auto', height: '55px'}}  alt = 'Why games for therapy?'/> </a>
                <a href='./aboutus'><img src = {word3} style={{width: 'auto', height: '60px'}}  alt ='About us'/> </a>
            </div>
        </div>
    )

} 