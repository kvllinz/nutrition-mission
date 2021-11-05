import logo from './logo.svg';
import './App.css';
import { useState, useRef } from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import PrivateRoute from './PrivateRoute';


function App() {
  // fetches JSON data passed in by flask.render_template and loaded
  // in public/index.html in the script with id "data"
  // const args = JSON.parse(document.getElementById("data").text);

  // TODO: Implement your main page as a React component.

  return (
    <BrowserRouter>
    <Switch>
        <Route path= '/health'>
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
