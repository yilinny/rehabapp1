// components on the page: pet, store, coin, link to games, streak, goals --> how to set, link to report page // therapist view?
import React from "react";
import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './pet.css';
import { Sidebar, Menu, Icon } from 'semantic-ui-react'
//try and put picture in public folder
import { ReactComponent as Bone } from './pics/icons/bone.svg'
import { ReactComponent as Coin } from './pics/icons/coin.svg'
import { ReactComponent as Fire } from './pics/icons/fire.svg'
import { ReactComponent as Play } from './pics/icons/play.svg'
import { ReactComponent as Shop } from './pics/icons/Shop.svg'
import { ReactComponent as Ball } from './pics/icons/ball.svg'
import BallPlayDog from './pics/dogball.gif'
import { ReactComponent as StillDog } from './pics/dog-still.svg'


export const UserPage = () => {
    let navigate = useNavigate()
    const uid = window.sessionStorage.getItem('uID')
    const [pet, setPet] = useState('rest')
    const [menuVisibility, setVisible] = useState(false)
    const [user, setUser] = useState([])

    const apiurl = 'https://gr-server.fly.dev'
    //auth user id, prompt login if not authorized
    //send location.user as a header, get if authorized -- not for this round of testing, as they can continue without an account?
    useEffect(() => {
        async function getData() {
            if (uid) {
                console.log(uid)
                try {
                    let userdata = await axios.get(`${apiurl}/getdict/${uid}/user`).then(res => res.data)
                    console.log(userdata)
                    setUser(userdata)
                }
                catch (e) {
                    console.log(e)
                    //if session has timed out -- should be status 401. In this case, doesnt matter why
                    alert('Something went wrong, please login again!')
                    window.location.href = './login'
                }
            }
            else {
                alert('Please sign in!')
                window.location.href = './login'
            }
        }
        getData()
    }, [])

    const SideMenu = () => {
        return (
            <Sidebar
                as={Menu}
                animation='slide along'
                compact icon='labeled'
                width='thin'
                inverted
                vertical
                onHide={() => { setVisible(false) }}
                visible={menuVisibility}>

                <Menu.Item href='/report'>
                    <Icon name='chart bar outline' />
                    User Statistics
                </Menu.Item>
                <Menu.Item href='/whygames'>
                    <Icon name='book' />User Guide </Menu.Item>
                <Menu.Item href='/aboutus'>
                    <Icon name='address card' />About us </Menu.Item>

            </Sidebar>

        )
    }


    return (
        <div style={{
            backgroundColor: '#83c5be',
            minHeight: '100vh',
            minWidth: '100vw'
        }}>
            <div>
                <div key='sandwhich icon' className="sandwhichWrapper" onClick={() => { menuVisibility === false ? setVisible(true) : setVisible(false) }}>
                    <div className="sandwhichLine" />
                    <div className="sandwhichLine" />
                    <div className="sandwhichLine" />
                </div>
                {SideMenu()}
            </div>
            <Coin className='iconmine' style={{ top: '10vh', left: '60vw' }} />
            <Shop className="roundbuttons" onClick={() => { navigate("/shop") }} style={{ top: '55vh' }} />
            <Play className="roundbuttons" style={{ top: '8vh' }} onClick={() => { navigate("/games") }} />
            <div key="display" />
            <Ball className='iconmine' style={{ left: '72vw', width: '15vw', top: '9vh' }}
                onClick={async () => {
                    setPet('ball')
                    setTimeout(() => {
                        setPet('rest')
                    }, 3000)
                    user.ball -= 1
                    await axios.post(`${apiurl}/update/${uid}/user/nokey`, user).then(res => res.data)

                }} />
            <h4 className="countertext" style={{ left: '79vw' }}>{user.ball}</h4>
            <h4 className="countertext" style={{ left: '63vw' }}>{user.coins}</h4>

            {
                (pet === 'rest') && (
                    <StillDog alt='dog' className="stillpet" />
                )
            }
            {
                (pet === 'ball') && (
                    <img src={BallPlayDog} alt='dog' className="pet" />
                )
            }

        </div>
    )

}