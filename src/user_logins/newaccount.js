import React, { useState } from 'react'
import { createUserAccount } from '../communication_backend/firebase';
import { Navigate } from 'react-router-dom';
import './signup.css'

export const SignUpForm = () => {
    const [userinfo, setUserInfo] = useState({ email: 'hello@gmail.com', password: 'password', pet: 'dog' })
    const [status, setStatus] = useState(null)


    async function createAccount() {
        let resp;
        try {
            resp = await createUserAccount(userinfo)
            if (resp.status === 200) {
                alert('Sign up successful! Redirecting to login page...')
                setStatus(200)
                //force people to login on success. Need time for token to be verified 
            }
        }
        catch (e) {
            console.log(e)
            //catch any error messages, resolves via console 
            alert(e.response.data)
            window.location.reload()
        }

        //add loading page for login
    }
    return (
        <>
            {(status === 200) && (
                <Navigate to='/login' />
            )}
            {(status === 'loading') && (
                <div style={{ backgroundColor: '#83c5be', minHeight: '100vh', minWidth: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <h1> Loading... </h1>
                </div>
            )}
            {(status !== 200 && status !== 'loading') && (
                <div className='shrink'
                    style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: '9.5vh', justifyContent: 'center', backgroundColor: '#83c5be', minHeight: '100vh', minWidth: '100vw'
                    }}>
                    <a href='./login'><btn className='backbtn' style={{ position: 'absolute', top: '5vh', left: '5vh' }}> BACK </btn> </a>
                    <h1 className='poof' style={{ fontSize: '5rem' }}> SIGNUP</h1>
                    <form className='signupform' onSubmit={(e) => {
                        e.preventDefault();
                        setStatus('loading');
                        createAccount();
                    }}
                    >
                        <h4>email:</h4><input type='text' onChange={(e) => { setUserInfo({ ...userinfo, email: e.target.value }) }} />
                        <h4>password:</h4><input type='text' onChange={(e) => { setUserInfo({ ...userinfo, password: e.target.value }); }} />
                        <input type='submit' value='Create account' className='btn'
                            style={{
                                alignSelf: 'flex-end',
                                marginTop: '5vh'
                            }} />
                    </form>
                </div>)
            }
        </>
    )

}



