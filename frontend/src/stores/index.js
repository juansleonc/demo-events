import React from 'react';
import AuthStore from './authStore';
import EventStore from './eventStore';
import ProfileStore from './profileStore';
class RootStore {
  constructor() {
        this.authStore = AuthStore;
        this.eventStore = EventStore;
        this.profileStore = ProfileStore;
    }
}

const StoresContext = React.createContext(new RootStore());

export const useStores = () => React.useContext(StoresContext);
