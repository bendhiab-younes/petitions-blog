import React from 'react';
import { auth, provider } from '../firebase-config';
import { signInWithPopup, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function Login({ setIsAuth }) {
    let navigate = useNavigate();

    const GoogleSignIn = (event) => {
        event.preventDefault();
        setPersistence(auth, browserSessionPersistence)
            .then(() => {
                return signInWithPopup(auth, provider);
            })
            .then((result) => {
                localStorage.setItem('isAuth', true);
                setIsAuth(true);
                navigate('/');
            })
            .catch((error) => {
                console.log(error.message);
            });
    }

    return (
        <div className='loginpage'>
            <p>Sign In With Google</p>
            <Button variant="primary" className='login-with-google-btn' onClick={GoogleSignIn}>Sign In</Button>
        </div>
    )
}

export default Login;