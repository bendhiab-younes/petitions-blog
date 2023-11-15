import React, { useState, useEffect } from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { auth } from './firebase-config';
import { Navbar, Nav, Container } from 'react-bootstrap';
//import Home from './pages/Home';
import CreatePetition from './pages/CreatePetition';
import Login from './pages/Login';
import PetitionsFeed from './pages/PetitionsFeed';

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
      window.location.pathname = '/';
    });
  };

  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Container>
          <Nav className="ml-auto">
            {!isAuth ?
              <Nav.Link as={Link} to="/">Login</Nav.Link> :
              <>
                <Nav className="ml-auto">
                  <Navbar.Brand as={Link} to="/PetitionsFeed">PetitionsFeed</Navbar.Brand>
                  <Nav.Link as={Link} to="/createpetition">Create Petition</Nav.Link>
                  <Nav.Link onClick={handleSignOut} >Sign Out</Nav.Link>
                </Nav>
              </>
            }
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/PetitionsFeed" element={<PetitionsFeed />} />
        <Route path="/createpetition" element={<CreatePetition isAuth={isAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;
