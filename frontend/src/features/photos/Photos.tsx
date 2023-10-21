import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectAllPhotos, selectLoadingAllPhotos } from './photosSlice';
import { fetchAllPhotos } from './photosThunk';
import { CircularProgress, Grid } from '@mui/material';
import PhotoBlock from './components/PhotoBlock';

const Photos = () => {
  const dispatch = useAppDispatch();
  const photos = useAppSelector(selectAllPhotos);
  const loading = useAppSelector(selectLoadingAllPhotos);

  useEffect(() => {
    dispatch(fetchAllPhotos());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Grid item container justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : (
        <Grid container item spacing={2}>
          {photos.map((el) => (
            <PhotoBlock key={el._id} id={el._id} user={el.user} title={el.title} image={el.image} />
          ))}
        </Grid>
      )}
    </>
  );
};

export default Photos;
