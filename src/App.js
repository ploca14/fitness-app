import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Navigation from './components/Navigation';
import useUser from './components/useUser';

function App() {
  const { user, token, setToken } = useUser();
  
  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <Navigation user={user}>
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </BrowserRouter>
    </Navigation>
  );
}

export default App;