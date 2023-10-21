import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import AppToolbar from './components/UI/AppToolbar/AppToolbar';
import { Route, Routes } from 'react-router-dom';
import Register from './features/users/Register';
import Login from './features/users/Login';
import Photos from './features/photos/Photos';
import UsersPhotos from './features/photos/UsersPhotos';
import NewPhotos from './features/photos/NewPhotos';

function App() {
  return (
    <>
      <CssBaseline />
      <header>
        <AppToolbar />
      </header>
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<Photos />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/my_photos" element={<UsersPhotos />} />
            <Route path="/photos/new" element={<NewPhotos />} />
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
