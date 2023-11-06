import React, { useState, useEffect } from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { auth } from './firebase-config';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Home from './pages/Home';
import CreatePetition from './pages/CreatePetition';
import Login from './pages/Login';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      localStorage.removeItem('isAuth');
      setIsAuth(false);
      window.location.pathname = '/login';
    });
  };

  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
          <Nav className="ml-auto">
            {!isAuth ? 
              <Nav.Link as={Link} to="/login">Login</Nav.Link> :
              <> 
              <Nav.Link onClick={handleSignOut}>Sign Out</Nav.Link>
            <Nav.Link as={Link} to="/createpetition">Create Petition</Nav.Link>
            </>
            }
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createpetition" element={<CreatePetition isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
    </Router>
  );
}

export default App; 