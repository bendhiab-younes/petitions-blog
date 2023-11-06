import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase-config'; // adjust this import to your firebase config file
import { useParams, useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function PetitionDetails() {
  const { id } = useParams();
  const [petition, setPetition] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchPetition = async () => {
      const petitionDoc = await getDoc(doc(db, 'petitions', id));
      if (petitionDoc.exists()) {
        setPetition(petitionDoc.data());
      } else {
        console.log('No such document!');
      }
    };

    fetchPetition();
  }, [id]);

  const handleUpdate = async () => {
    // This is just a basic example. You'll need to implement this function based on your app's logic.
    const updatedPetition = { ...petition, title: 'New Title' };
    await updateDoc(doc(db, 'petitions', id), updatedPetition);
    setPetition(updatedPetition);
  };

  const handleDelete = async () => {
    await deleteDoc(doc(db, 'petitions', id));
    history.push('/');
  };

  return (
    <div>
      {petition && (
        <>
          <h2>{petition.title}</h2>
          <p>{petition.petition}</p>
          <Button onClick={handleUpdate}>Update</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </>
      )}
    </div>
  );
}

export default PetitionDetails;