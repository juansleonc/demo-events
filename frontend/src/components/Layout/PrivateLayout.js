import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import LogoutButton from '../Auth/LogoutButton';


const PrivateLayout = observer(({ children }) => {
  

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            EM
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Events
          </Button>
          <Button color="inherit" component={Link} to="/event/new">
            new
          </Button>
          <LogoutButton />

        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        {children}
      </Container>
    </div>
  );
});

export default PrivateLayout;
