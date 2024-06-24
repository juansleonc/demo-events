import React from 'react';
import { TextField, Button, Box } from '@mui/material';

const EventFormComponent = ({ event, setEvent, handleSubmit, buttonText }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
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
        value={event.name || ''}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="description"
        label="Description"
        name="description"
        autoComplete="description"
        value={event.description || ''}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="date"
        label="Date"
        name="date"
        type="datetime-local"
        InputLabelProps={{
          shrink: true,
        }}
        value={event.date || ''}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="location"
        label="Location"
        name="location"
        autoComplete="location"
        value={event.location || ''}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="capacity"
        label="Capacity"
        name="capacity"
        type="number"
        autoComplete="capacity"
        value={event.capacity || ''}
        onChange={handleChange}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        {buttonText}
      </Button>
    </Box>
  );
};

export default EventFormComponent;
