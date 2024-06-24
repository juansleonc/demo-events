import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../../stores';
import { useHistory } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import CustomSnackbar from '../Common/CustomSnackbar';
import { validateEmail } from '../../utils/validation';

const Login = observer(() => {
  const { authStore } = useStores();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setErrorMessage('Invalid email address');
      setOpenSnackbar(true);
      return;
    }

    try {
      await authStore.login({ email, password });
      history.push('/');
    } catch (error) {
      setErrorMessage('Login failed. Please check your credentials and try again.');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
          helperText={!!email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'Invalid email address' : ''}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Login
        </Button>
      </Box>
      <CustomSnackbar
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        message={errorMessage}
        severity={'error'}
      />
    </Container>
  );
});

export default Login;
