import React from 'react';
import { Button } from '@mui/material';
import { useStores } from '../../stores';
import { useHistory } from 'react-router-dom';

const LogoutButton = () => {
  const { authStore } = useStores();
  const history = useHistory();

  const handleLogout = () => {
    authStore.logout();
    history.push('/login');
  };

  return (
    <Button color="inherit" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
