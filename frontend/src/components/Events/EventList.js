import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../../stores';
import { Container, Typography, List, ListItem, ListItemText, Divider, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useHistory } from 'react-router-dom';
import CustomSnackbar from '../Common/CustomSnackbar';
import { Tooltip } from '@mui/material';

const EventList = observer(() => {
  const { eventStore } = useStores();
  const history = useHistory();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    eventStore.fetchEvents();
  }, [eventStore]);

  const handleEdit = (id) => {
    history.push(`/event/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await eventStore.deleteEvent(id);
    } catch (error) {
      setErrorMessage('Failed to delete event');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Events
        </Typography>
        <List>
          {eventStore.events.map((event) => (
            <React.Fragment key={event.id}>
              <ListItem
                secondaryAction={
                  <Box>
                    <Tooltip title="Edit">
                      <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(event.id)} color="primary">
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(event.id)} color="secondary">
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                }
              >
                <ListItemText
                  primary={event.name}
                  secondary={new Date(event.date).toLocaleString()}
                />
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      </Box>
      <CustomSnackbar
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        message={errorMessage}
        severity="error"
      />
    </Container>
  );
});

export default EventList;
