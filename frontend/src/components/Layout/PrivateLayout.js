import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import LogoutButton from '../Auth/LogoutButton';

const PrivateLayout = observer(({ children }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawer = (
    <Box sx={{ width: 250 }} onClick={handleDrawerToggle}>
      <List>
        <ListItem ButtonBase component={Link} to="/">
          <ListItemText primary="Events" />
        </ListItem>
        <ListItem ButtonBase component={Link} to="/event/new">
          <ListItemText primary="New" />
        </ListItem>
        <ListItem ButtonBase component={Link} to="/profile">
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem>
          <LogoutButton />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Event Management
          </Typography>
          {isSmallScreen ? (
            <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/">
                Events
              </Button>
              <Button color="inherit" component={Link} to="/event/new">
                New
              </Button>
              <Button color="inherit" component={Link} to="/profile">
                Profile
              </Button>
              <LogoutButton />
            </>
          )}
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
        {drawer}
      </Drawer>
      <Container sx={{ mt: 4, p: isSmallScreen ? 1 : 3 }}>
        {children}
      </Container>
    </Box>
  );
});

export default PrivateLayout;
