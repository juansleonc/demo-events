import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../../stores';
import { Container, Typography } from '@mui/material';
import EventFormComponent from './EventFormComponent';
import CustomSnackbar from '../Common/CustomSnackbar';

const EventForm = observer(() => {
  const { eventStore } = useStores();
  const [event, setEvent] = useState({
    name: '',
    description: '',
    date: '',
    location: '',
    capacity: '',
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await eventStore.createEvent(event);
    } catch (error) {
      setErrorMessage('Failed to create event');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Create Event
      </Typography>
      <EventFormComponent
        event={event}
        setEvent={setEvent}
        handleSubmit={handleSubmit}
        buttonText="Create Event"
      />
      <CustomSnackbar
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        message={errorMessage}
        severity={'error'}
      />
    </Container>
  );
});

export default EventForm;
