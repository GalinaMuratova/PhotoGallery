import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const UsersPhotos = () => {
  return (
    <>
      <h2>My photo gallery</h2>
      <Button variant="outlined" component={Link} to="/photos/new">
        Add track
      </Button>
    </>
  );
};

export default UsersPhotos;
