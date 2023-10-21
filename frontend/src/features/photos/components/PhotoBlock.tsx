import React from 'react';
import { Button, Card, CardContent, CardMedia, Grid, styled, Typography } from '@mui/material';
import { Link as NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/userSlice';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { deleteOnePhoto, fetchAllPhotos, fetchUsersPhotos } from '../photosThunk';

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
});

interface Props {
  id: string;
  user?: {
    _id: string;
    displayName: string;
    role: string;
  };
  title: string;
  image: string;
  deletePhoto?: string;
}

const PhotoBlock: React.FC<Props> = ({ id, title, image, user, deletePhoto }) => {
  const photo = 'http://localhost:8000' + '/images/' + image;
  const userNew = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const onDelete = async () => {
    const alert = window.confirm('Do you want to delete this artist?');
    if (alert) {
      await dispatch(deleteOnePhoto(id));
      if (user && user._id) {
        await dispatch(fetchUsersPhotos(user._id));
      }
      await dispatch(fetchAllPhotos());
    }
  };
  let userBlock = <></>;
  if (deletePhoto === 'delete') {
    if (userNew?._id === user?._id) {
      userBlock = (
        <Button onClick={onDelete} variant="contained" color="error">
          Delete
        </Button>
      );
    }
  }

  if (userNew?.role === 'admin') {
    userBlock = (
      <Button onClick={onDelete} variant="contained" color="error">
        Delete
      </Button>
    );
  }

  let author = <></>;
  if (user) {
    author = (
      <Typography
        gutterBottom
        variant="subtitle1"
        component={Link}
        to={'/photos/' + user._id}
        style={{
          color: 'white',
          padding: '5px',
          backgroundColor: 'rgb(34 59 35 / 48%)',
          borderRadius: '8px',
        }}
      >
        <AccountCircleIcon style={{ margin: '7px 7px -6px 5px' }} />
        {user.displayName}
      </Typography>
    );
  }
  return (
    <>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card style={{ boxShadow: '0px 4px 11px 0px rgba(14, 24, 32, 0.28', margin: '0 2px' }}>
          <CardContent>
            <CardMedia
              sx={{ height: 300 }}
              image={photo}
              title={title}
              component={Link}
              to={'/photos/' + id}
            />
            <Grid display="flex" flexDirection="column">
              <Typography gutterBottom variant="h6">
                {title}
              </Typography>
              {author}
            </Grid>
            {userBlock}
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default PhotoBlock;
