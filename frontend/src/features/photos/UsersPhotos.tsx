import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectAllUsersPhotos, selectLoadingAllUsersPhotos } from './photosSlice';
import { fetchUsersPhotos } from './photosThunk';
import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import PhotoBlock from './components/PhotoBlock';
import { selectUser } from '../users/userSlice';

const UsersPhotos = () => {
  const { id } = useParams();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const photos = useAppSelector(selectAllUsersPhotos);
  const loading = useAppSelector(selectLoadingAllUsersPhotos);

  useEffect(() => {
    if (id) {
      dispatch(fetchUsersPhotos(id));
    }
  }, [dispatch, id]);

  let myPhoto = <></>;
  if (id === user?._id) {
    myPhoto = (
      <Grid
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        style={{ margin: '20px 0' }}
      >
        <Typography variant="h4">My cocktails</Typography>
        <Button variant="outlined" component={Link} to="/photos/new">
          Add photo
        </Button>
      </Grid>
    );
  }

  return (
    <>
      {loading ? (
        <Grid item container justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : (
        <>
          {myPhoto}
          <Grid container item spacing={3}>
            {photos.map((el) => (
              <PhotoBlock
                key={el._id}
                id={el._id}
                user={el.user}
                title={el.title}
                image={el.image}
                deletePhoto="delete"
              />
            ))}
          </Grid>
        </>
      )}
    </>
  );
};

export default UsersPhotos;
