import { Redirect, Route, Switch } from 'react-router-dom';
import Programs from './components/Programs';
import Users from './components/Users';
import Clients from './components/Clients';
import Login from './components/Login';
import Navigation from './components/Navigation';
import useUser from './components/useUser';

function App() {
  const { user, token, setToken } = useUser();

  if (!token) {
    return <Login setToken={setToken} />
  }

  return (
    <Navigation user={user}>
      <Switch>
        <Route path="/" exact>
          <Programs />
        </Route>
        <Route path="/clients">
          <Clients />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="*">
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        </Route>
      </Switch>
    </Navigation>
  );
}

export default App;