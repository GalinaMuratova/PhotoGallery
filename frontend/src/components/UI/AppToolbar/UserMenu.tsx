import React, { useState } from 'react';
import { Button, CircularProgress, Menu, MenuItem } from '@mui/material';
import { User } from '../../../types';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectDeleteLoading } from '../../../features/users/userSlice';
import { logout } from '../../../features/users/userThunk';

interface Props {
  user: User;
}
const UserMenu: React.FC<Props> = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectDeleteLoading);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  let avatarImage = '';
  if (user.avatar) {
    if (user.avatar.startsWith('https:')) {
      avatarImage = user.avatar;
    } else {
      avatarImage = 'http://localhost:8000' + '/images/' + user.avatar;
    }
  }

  return (
    <>
      <img
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          marginBottom: '-15px',
          objectFit: 'cover',
        }}
        src={avatarImage}
        alt={user.email}
      />
      <Button onClick={handleClick} color="inherit">
        Hello, {user.displayName}
      </Button>

      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem>Profile</MenuItem>
        <MenuItem component={Link} to="/my_photos">
          My photos
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          {loading ? <CircularProgress size={24} /> : 'Logout'}
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
