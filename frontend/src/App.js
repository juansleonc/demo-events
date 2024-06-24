import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useStores } from './stores';

import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import EventList from './components/Events/EventList';
import EventForm from './components/Events/EventForm';
import EventEdit from './components/Events/EventEdit';
import PrivateLayout from './components/Layout/PrivateLayout';
import PublicLayout from './components/Layout/PublicLayout';



const PrivateRoute = observer(({ component: Component, ...rest }) => {
  const { authStore } = useStores();
  return (
    <Route
      {...rest}
      render={props =>
        authStore.token ? (
          <PrivateLayout>
            <Component {...props} />
          </PrivateLayout>
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  );
});

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <PublicLayout>
        <Component {...props} />
      </PublicLayout>
    )}
  />
);

function App() {
  return (
    <Router>
      <Switch>
        <PublicRoute path="/login" component={Login} />
        <PublicRoute path="/signup" component={Signup} />
        <PrivateRoute path="/events" component={EventList} />
        <PrivateRoute path="/event/new" component={EventForm} />
        <PrivateRoute path="/event/edit/:id" component={EventEdit} />
        <Redirect from="*" to="/events" />
      </Switch>
    </Router>
  );
}

export default App;
