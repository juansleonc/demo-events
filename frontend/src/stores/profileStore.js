import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';

class ProfileStore {
  profile = {
    name: '',
    email: '',
    bio: '',
    avatar: ''
  };

  constructor() {
    makeAutoObservable(this);
  }

  async fetchProfile() {
    try {
        const response = await axios.get('http://localhost:8098/profile.json', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        runInAction(() => {
            this.profile = response.data;
        });

    } catch (error) {
        console.error('Failed to fetch profile', error);
        throw error;
    }
  }

  async updateProfile(updatedProfile) {
    try {
        const response = await axios.put('http://localhost:8098/profile', {user: updatedProfile}, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        runInAction(() => {
            this.profile = response.data;
        });

    } catch (error) {
        console.error('Failed to update profile', error);
        throw error;
    }
  }
}

export default new ProfileStore();
