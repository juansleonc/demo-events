import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const EventFormComponent = ({ event, setEvent, handleSubmit, buttonText }) => {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({ ...prevEvent, [name]: value }));

    const newErrors = { ...errors };

    if (name === 'name' || name === 'description' || name === 'location') {
      if (!value) {
        newErrors[name] = 'This field is required';
      } else if (value.length > 255) {
        newErrors[name] = 'Must be less than 255 characters';
      } else {
        delete newErrors[name];
      }
    }

    if (name === 'date') {
      const now = new Date().toISOString().slice(0, 16);
      if (!value) {
        newErrors[name] = 'This field is required';
      } else if (value < now) {
        newErrors[name] = 'Date must be in the future';
      } else {
        delete newErrors[name];
      }
    }

    if (name === 'capacity') {
      if (!value) {
        newErrors[name] = 'This field is required';
      } else if (!/^\d+$/.test(value)) {
        newErrors[name] = 'Must be a valid number';
      } else {
        delete newErrors[name];
      }
    }

    setErrors(newErrors);
  };

  const isFormValid = () => {
    return (
      Object.keys(errors).length === 0 &&
      event.name &&
      event.description &&
      event.date &&
      event.location &&
      event.capacity
    );
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
        error={!!errors.name}
        helperText={errors.name}
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
        error={!!errors.description}
        helperText={errors.description}
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
        error={!!errors.date}
        helperText={errors.date}
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
        error={!!errors.location}
        helperText={errors.location}
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
        error={!!errors.capacity}
        helperText={errors.capacity}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={!isFormValid()}
      >
        {buttonText}
      </Button>
    </Box>
  );
};

export default EventFormComponent;
