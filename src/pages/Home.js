import React, { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase-config' // adjust this import to your firebase config file
import { Card, Container, Row, Col } from 'react-bootstrap';

function Home() {
  const [petitions, setPetitions] = useState([]);

  const petitionCollectionRef = collection(db, 'petitions');
  useEffect(() => {
    const fetchPetitions = async () => {
      const data = await getDocs(petitionCollectionRef); // replace 'petitions' with your collection name
      setPetitions(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };

    fetchPetitions();
  }, [petitionCollectionRef]);

  return (
    <Container>
      <Row>
        {petitions.map((petition) => (
          <Col sm={12} md={6} lg={4} key={petition.id}>
            <Card className="mb-4">
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

export default Home;