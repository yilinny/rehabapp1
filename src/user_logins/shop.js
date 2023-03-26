//componets: shopcard, coin couner
//data: user objects alr bought, price of objects and png 
//buying function

import React from "react";
import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Coin } from './pics/icons/coin.svg';
import './shop.css'

//import pics
import ball from './pics/icons/ball.svg'
import leash3 from './pics/icons/leash3.svg'
import bed1 from './pics/icons/bed1.svg'
import bed2 from './pics/icons/bed2.svg'
import bowl1 from './pics/icons/bowl1.svg'
import bowl2 from './pics/icons/bowl2.svg'
import leash1 from './pics/icons/leash1.svg'
import leash2 from './pics/icons/leash2.svg'
import house from './pics/icons/house.svg'

const apiurl = 'https://gr-server.fly.dev'



export const ShopPage = () => {
    const uid = window.sessionStorage.getItem('uID')

    const [shopObj, setShop] = useState([])
    const [user, setUser] = useState({ coins: 0, objects: [] })
    let navigate = useNavigate()

    useEffect(() => {
        async function getData() {
            let shopData = await axios.get(`${apiurl}/getdata/general/shop/objects`).then(res => res.data)
            setShop(shopData)

            let userdata = await axios.get(`${apiurl}/getdict/${uid}/user`).then(res => res.data)
            setUser(userdata)
        }
        getData();
    }, [])
    //object card

    const ObjectCard = (object) => {
        let photos = {
            'Ball': ball,
            'Blue Leash': leash1,
            'Red Leash': leash2,
            'Brown Leash': leash3,
            'Dog Bed': bed1,
            'Dog Bed 2': bed2,
            'Dog Bowl': bowl1,
            'Dog Bowl 2': bowl2,
            'Dog House': house
        }
        return (
            <div className="shopcard">
                <img src={photos[object.name]} alt={object.name} />
                <h4>{object.name}</h4>
                <h4>${object.price}</h4>
                <btn className='btn' onClick={(e) => buying(object)}>{(user.objects.includes(object.name) ? 'bought' : 'buy now')}</btn>
            </div>
        )
    }

    //buying function
    async function buying(object) {
        //check if in use --> no effect
        if (user.objects.includes(object.name) === false) {
            //minus coins
            //add object to user database
            let newuser;
            if (object.name !== 'Ball') {
                newuser = {
                    ball: user.ball,
                    bones: user.bones,
                    coins: parseInt(user.coins) - parseInt(object.price),
                    objects: [...user.objects, object.name]
                }
            }

            else {
                newuser = {
                    ball: user.ball + 1,
                    bones: user.bones,
                    coins: parseInt(user.coins) - parseInt(object.price),
                    objects: user.objects
                }
            }
            setUser(newuser)
            await axios.post(`${apiurl}/update/${uid}/user/nokey`, newuser).then(res => res.data)
        }
    }

    return (
        <div style={{
            backgroundColor: '#edbaa7',
            minWidth: '100vw', minHeight: '100vh',
            display: 'flex', flexDirection: 'column'
        }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', paddingTop: '5vh', paddingRight: '2vw' }}>
                <Coin style={{ width: 'auto', height: '10vh' }} />
                <h4 style={{ fontSize: 'xxx-large', margin: '3px' }}>{user.coins}</h4>
            </div>
            <div className="shopcontainer">
                {shopObj.map((object) => {
                    return (ObjectCard(object))
                })}
            </div>
            <btn class='backbtn' style={{ backgroundColor: '#ffddd2', position: 'absolute' }} onClick={() => { console.log('hi'); navigate("/pet") }}> back </btn>
        </div>
    )
}