import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import MapComponent from '../Common/MapComponent';

const EventFormComponent = ({ event, setEvent, handleSubmit, buttonText }) => {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (event.latitude && event.longitude) {
      setEvent((prevEvent) => ({
        ...prevEvent,
        location: `${event.latitude}, ${event.longitude}`
      }));
    }
  }, [event.latitude, event.longitude, setEvent]);

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

  const handleLocationSelected = (location) => {
    setEvent((prevEvent) => ({
      ...prevEvent,
      location: `${location.lat}, ${location.lng}`,
      latitude: location.lat,
      longitude: location.lng
    }));
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
      <MapComponent
        initialLocation={{
          lat: event.latitude !== undefined ? event.latitude : -3.745, 
          lng: event.longitude !== undefined ? event.longitude : -38.523 
        }}
        onLocationSelected={handleLocationSelected}
        eventTitle={event.name}
        eventDescription={event.description}
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
        style={{ display: 'none' }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="latitude"
        label="Latitude"
        name="latitude"
        autoComplete="latitude"
        value={event.latitude || ''}
        onChange={handleChange}
        error={!!errors.latitude}
        helperText={errors.latitude}
        style={{ display: 'none' }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="longitude"
        label="Longitude"
        name="longitude"
        autoComplete="longitude"
        value={event.longitude || ''}
        onChange={handleChange}
        error={!!errors.longitude}
        helperText={errors.longitude}
        style={{ display: 'none' }}
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
