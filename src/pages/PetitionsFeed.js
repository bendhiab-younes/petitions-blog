import React, { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase-config' // adjust this import to your firebase config file
import { Card, Container, Row, Col } from 'react-bootstrap';
import './PetitionFeed.css';

function PetitionsFeed() {
  const [petitions, setPetitions] = useState([]);

  const petitionCollectionRef = collection(db, 'petitions');
  useEffect(() => {
    const fetchPetitions = async () => {
      const data = await getDocs(petitionCollectionRef); 
      setPetitions(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };

    fetchPetitions();
  }, [petitionCollectionRef]);

  return (
    <Container>
      <Row>
        {petitions.map((petition) => (
          <Col xs={12} className="mb-4 d-flex justify-content-center" key={petition.id}>
            <Card className="card-constant-size">
              <Card.Body>
                <Card.Title>{petition.title}</Card.Title>
                <Card.Text>{petition.petition}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default PetitionsFeed;