import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';
import { createBrowserHistory } from 'history';

class AuthStore {
  user = null;
  token = localStorage.getItem('token') || '';
  history = createBrowserHistory();

  constructor() {
    makeAutoObservable(this);
  }

  async login(credentials) {
    try {
      const response = await axios.post('http://localhost:8096/auth/sessions', credentials);
      runInAction(() => {
        this.token = response.data.token;
        localStorage.setItem('token', this.token);
        this.history.push('/');
      });
    } catch (error) {
      throw new Error('Login failed');
    }
  }

  async signup(credentials) {
    try {
      const response = await axios.post('http://localhost:8096/auth/registrations', credentials);
      runInAction(() => {
        this.token = response.data.token;
        localStorage.setItem('token', this.token);
        this.history.push('/');
      });
    } catch (error) {
      throw new Error('Signup failed');
    }
  }

  async fetchUser() {
    try {
      const response = await axios.get('http://localhost:8096/auth/profile', {
        headers: { Authorization: `Bearer ${this.token}` },
      });
      runInAction(() => {
        this.user = response.data;
      });
    } catch (error) {
      console.error('Fetching user failed:', error);
    }
  }

  logout() {
    runInAction(() => {
      this.user = null;
      this.token = '';
      localStorage.removeItem('token');
      this.history.push('/login');
    });
  }
}

export default new AuthStore();
