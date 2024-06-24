import React from 'react';
import AuthStore from './authStore';
import EventStore from './eventStore';

class RootStore {
  constructor() {
        this.authStore = AuthStore;
        this.eventStore = EventStore;
    }
}

const StoresContext = React.createContext(new RootStore());

export const useStores = () => React.useContext(StoresContext);
