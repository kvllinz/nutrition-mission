import './App.css';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/health'>
          <p> I am healthy</p>
        </Route>
        <Route path='/' exact>
          <Redirect to='/login' />
        </Route>
        <Route path='/login' exact component={Login} />
        <PrivateRoute path='/home' exact component={Home} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;
