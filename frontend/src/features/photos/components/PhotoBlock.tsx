import React from 'react';
import { Button, Card, CardContent, CardMedia, Grid, styled, Typography } from '@mui/material';
import { Link as NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/userSlice';

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
  };
  title: string;
  image: string;
  deletePhoto?: string;
}

const PhotoBlock: React.FC<Props> = ({ id, title, image, user, deletePhoto }) => {
  const photo = 'http://localhost:8000' + '/images/' + image;
  const userNew = useAppSelector(selectUser);

  let userBlock = <></>;
  if (deletePhoto === 'delete') {
    if (userNew?._id === user?._id) {
      userBlock = (
        <Button variant="outlined" color="error">
          Delete
        </Button>
      );
    }
  }

  let author = <></>;
  if (user) {
    author = (
      <Typography
        gutterBottom
        variant="h6"
        component={Link}
        to={'/photos/' + user._id}
        style={{ color: '#1976d2' }}
      >
        {user.displayName}
      </Typography>
    );
  }
  return (
    <>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card>
          <CardContent>
            <CardMedia
              sx={{ height: 240 }}
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
