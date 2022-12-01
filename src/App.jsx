import { Redirect, Route, Switch } from 'react-router-dom';
import Programs from './components/Programs';
import Program from './components/Program';
import Users from './components/Users';
import CreatePersonalTrainer from './components/CreatePersonalTrainer';
import CreateClient from './components/CreateClient';
import Clients from './components/Clients';
import Login from './components/Login';
import Navigation from './components/Navigation';
import CreateProgram from './components/CreateProgram';
import useUser from './components/useUser';
import CreateExercise from './components/CreateExercise';

function App() {
  const { user, token, setToken, clearToken } = useUser();

  if (!token) {
    return <Login setToken={setToken} />
  }

  return (
    <Navigation user={user} clearToken={clearToken}>
      <Switch>
        <Route path="/clients/:id/create-program">
          <CreateProgram />
        </Route>
        <Route path="/clients/create">
          <CreateClient />
        </Route>
        <Route path="/personal-trainer/create">
          <CreatePersonalTrainer />
        </Route>
        <Route path="/clients">
          <Clients />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/programs/:id/create-exercise">
          <CreateExercise />
        </Route>
        <Route path="/programs/:id">
          <Program />
        </Route>
        <Route path="/">
          <Programs />
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