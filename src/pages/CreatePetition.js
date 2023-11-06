import React from 'react';
import { useState,useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './CreatePetition.css';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';


function CreatePetition( ) {

  const [title, setTitle] = useState('');
  const [petition, setPetitionText] = useState('');

  const petitionCollectionRef = collection(db, 'petitions');
  let navigate = useNavigate();

  const createpetition = async (event) => {
    event.preventDefault();
    await addDoc(petitionCollectionRef, {
      title,
      petition,
      creator: {
        name: auth.currentUser.displayName,
        id: auth.currentUser.uid
      },

    });
    navigate('/');
  };

  useEffect(() => {
    if ( !localStorage.getItem('isAuth') ) {
      navigate('/login');
    }
  }, [ navigate ]);

  return (
    <Container className='create-petition-container p-4'>
      <Row className="justify-content-md-center">
        <Col xs={12} md={8} lg={6}>
          <div className='form-container'>
            <h1 className='cp-title text-center'>Create Petition</h1>
            <Form className='cp-form' onSubmit={createpetition}>
              <Form.Group className='form-group'>
                <Form.Label htmlFor="formTitle">Title</Form.Label>
                <Form.Control
                  type="text" id="formTitle" placeholder="Title..."
                  onChange=
                  {(event) => { setTitle(event.target.value) }} />
              </Form.Group>
              <Form.Group className='form-group'>
                <Form.Label htmlFor="formPetition">Petition</Form.Label>
                <Form.Control as="textarea" id="formPetition" rows={3} placeholder="Petition..." onChange=
                  {(event) => { setPetitionText(event.target.value) }} />

              </Form.Group>
              <Button onClick={createpetition} className='submit-button mt-2' type="button">Submit</Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default CreatePetition;