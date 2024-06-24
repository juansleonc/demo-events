import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';
import { history } from '../helpers/history';


class EventStore {
  events = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetchEvents() {
    try {
      const response = await axios.get('http://localhost:8097/events', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      runInAction(() => {
        this.events = response.data;
      });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        history.push('/login');
      } else {
        console.error('Fetching events failed:', error);
      }
    }
  }

  async createEvent(event) {
    try {
      const response = await axios.post('http://localhost:8097/events', event, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      runInAction(() => {
        this.events.push(response.data);
      });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        history.push('/login');
      } else {
        console.error('Fetching events failed:', error);
      }
    }
  }

  async getEvent(id) {
    try {
      const response = await axios.get(`http://localhost:8097/events/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch event', error);
      throw error;
    }
  }

  async updateEvent(id, updatedEvent) {
    try {
      const response = await axios.put(`http://localhost:8097/events/${id}`, updatedEvent, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      runInAction(() => {
        const index = this.events.findIndex(event => event.id === id);
        if (index !== -1) {
          this.events[index] = response.data;
        }
      });
    } catch (error) {
      console.error('Failed to update event', error);
      throw error;
    }
  }

  async deleteEvent(id) {
    try {
      await axios.delete(`http://localhost:8097/events/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      runInAction(() => {
        this.events = this.events.filter(event => event._id !== id);
      });
    } catch (error) {
      console.error('Failed to delete event', error);
      throw error;
    }
  }
}

export default new EventStore();
