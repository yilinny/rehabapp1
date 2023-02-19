import React, { useState } from 'react';
import { loginUser, logUsage } from '../communication_backend/firebase';
import logo from '../gamemenu/pics/logo brown.png';
import { Navigate } from 'react-router-dom';


export const LoginPage = () => {
    const [username, setUser] = useState('hello@gmail.com')
    const [password, setPassword] = useState('password')
    const [userAuth, setUserAuth] = useState(null)

    async function retrieveUserInfo(user, pw) {
        const resp = await loginUser(user, pw)
        if (resp.status === 200) {
            setUserAuth(resp.status)
            window.sessionStorage.setItem("uID", resp.data.user)
            await logUsage('login', resp.data.user)
        }
    }

    return (
        <>
            {(userAuth === 200) && (
                <Navigate to='/pet' />
            )}
            {(userAuth !== 200) && (
                <div className='shrink'
                    style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: '2.5vh', justifyContent: 'center', backgroundColor: '#83c5be', minHeight: '100vh', minWidth: '100vw'
                    }}>
                    <img src={logo} className='poof' alt='brown logo'
                        style={{ position: 'absolute', width: '10vw', height: 'auto', top: '5vh', left: '3vw' }}></img>
                    <h1 className='poof' style={{ fontSize: '5rem' }}> LOGIN</h1>
                    <form
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: '1.5vh' }}
                        onSubmit={(e) => { e.preventDefault(); retrieveUserInfo(username, password) }}>
                        <h2 style={{ fontSize: '1.4rem' }}>Username:&nbsp;</h2><input type='text' style={{ backgroundColor: '#d6d2c0', fontSize: '3rem' }} onChange={(e) => { setUser(e.target.value); }} />
                        <h2 style={{ fontSize: '1.4rem' }}>Password:&nbsp;</h2><input type='text' style={{ backgroundColor: '#d6d2c0', fontSize: '3rem' }} onChange={(e) => { setPassword(e.target.value); }} />
                        <input type='submit' value='Log in' className='btn' style={{ position: 'relative', padding: '1vh', minWidth: '8vw' }} />
                    </form>
                    <a href='/newuser'> <btn className='btn' style={{ minWidth: '8vw', textAlign: 'center' }}> SIGN UP</btn></a>
                    <a href='/games'><h4 style={{ borderBottom: 'solid', color: 'black' }}> Continue without a account</h4></a>
                </div>)}
        </>
    )
}