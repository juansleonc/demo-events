import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { useParams, useHistory } from 'react-router-dom';
import { useStores } from '../../stores';
import { Container, Typography } from '@mui/material';
import EventFormComponent from './EventFormComponent';
import CustomSnackbar from '../Common/CustomSnackbar';

const EventEdit = observer(() => {
  const { eventStore } = useStores();
  const { id } = useParams();
  const history = useHistory();
  const [currentEvent, setCurrentEvent] = useState({
    name: '',
    description: '',
    date: '',
    location: '',
    capacity: '',
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const fetchedEvent = await eventStore.getEvent(id);
        const formattedEvent = {
            ...fetchedEvent,
            date: new Date(fetchedEvent.date).toISOString().slice(0, 16),
          };
        setCurrentEvent(formattedEvent);
      } catch (error) {
        setErrorMessage('Failed to load event');
        setOpenSnackbar(true);
      }
    };

    loadEvent();
  }, [id, eventStore]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await eventStore.updateEvent(id, currentEvent);
      history.push('/');
    } catch (error) {
      setErrorMessage('Failed to update event');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Event
      </Typography>
      <EventFormComponent
        event={currentEvent}
        setEvent={setCurrentEvent}
        handleSubmit={handleSubmit}
        buttonText="Update Event"
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

export default EventEdit;
