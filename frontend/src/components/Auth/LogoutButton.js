import React from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../../stores';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';




const LogoutButton = observer(() => {
  const { authStore } = useStores();
  const history = useHistory();


  const handleLogout = () => {
    authStore.logout();
    history.push('/');
  };

  return (
    <Button color="inherit" onClick={handleLogout}>
      Logout
    </Button>
  );
});

export default LogoutButton;
