import React, { useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../users/userSlice';
import { useNavigate } from 'react-router-dom';
import AddPhotoForm from './components/AddPhotoForm';

const NewPhotos = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <>
      <Container maxWidth="md">
        <Typography variant="h4" sx={{ mb: 3 }}>
          Add new photo
        </Typography>
        <AddPhotoForm />
      </Container>
    </>
  );
};

export default NewPhotos;
