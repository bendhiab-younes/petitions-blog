import React from 'react';
import { auth, provider } from '../firebase-config';
import { signInWithPopup, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';

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
                navigate('/PetitionsFeed');
            })
            .catch((error) => {
                console.log(error.message);
            });
    }

    return (
        <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
          <Row>
            <Col className="text-center">
              <h1>Welcome to Our Website</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pellentesque erat in blandit luctus.</p>
            </Col>
          </Row>
          <Row>
            <Col className="text-center">
              <Button variant="primary" className='login-with-google-btn' onClick={GoogleSignIn}>Sign In with Google</Button>
            </Col>
          </Row>
        </Container>)
}

export default Login;