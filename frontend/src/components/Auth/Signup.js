import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../../stores';
import { useHistory } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import CustomSnackbar from '../Common/CustomSnackbar';

const Signup = observer(() => {
  const { authStore } = useStores();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setErrorMessage('Invalid email address');
      setOpenSnackbar(true);
      return;
    }

    if (password !== passwordConfirmation) {
      setErrorMessage("Passwords do not match");
      setOpenSnackbar(true);
      return;
    }
    try {
      await authStore.signup({ user: { email, password, passwordConfirmation } });
      history.push('/');

    } catch (error) {
      setErrorMessage("Account already exists");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Signup
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
          error={!!password && password.length < 6}
          helperText={!!password && password.length < 6 ? 'Password must be at least 6 characters' : ''}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="passwordConfirmation"
          label="Confirm Password"
          type="password"
          id="passwordConfirmation"
          autoComplete="current-password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          error={!!passwordConfirmation && password !== passwordConfirmation}
          helperText={!!passwordConfirmation && password !== passwordConfirmation ? 'Passwords do not match' : ''}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Signup
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

export default Signup;
