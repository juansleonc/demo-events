import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../../stores';
import { TextField, Button, Box } from '@mui/material';
import { validateEmail } from '../../utils/validation';

const ProfileForm = observer(({ profile }) => {
  const { profileStore } = useStores();
  const [updatedProfile, setUpdatedProfile] = useState(profile);
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    setUpdatedProfile(profile);
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile((prevProfile) => ({ ...prevProfile, [name]: value }));

    if (name === 'email') {
      setEmailError(!validateEmail(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (emailError) {
      return;
    }
    await profileStore.updateProfile(updatedProfile);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Name"
        name="name"
        autoComplete="name"
        autoFocus
        value={updatedProfile.name || ''}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email"
        name="email"
        autoComplete="email"
        type="email"
        value={updatedProfile.email || ''}
        onChange={handleChange}
        error={emailError}
        helperText={emailError ? "Please enter a valid email address." : ""}
      />
      <TextField
        margin="normal"
        fullWidth
        id="bio"
        label="Bio"
        name="bio"
        autoComplete="bio"
        value={updatedProfile.bio || ''}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        fullWidth
        id="avatar"
        label="Avatar URL"
        name="avatar"
        autoComplete="avatar"
        value={updatedProfile.avatar || ''}
        onChange={handleChange}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Update Profile
      </Button>
    </Box>
  );
});

export default ProfileForm;
