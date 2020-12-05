import './App.css';
import './index.css'
import './budgetFormatting.css'
import React, {Component, Fragment, useState} from 'react';
import Login from './Login.js';
import bootsrap from 'react-bootstrap';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';
import {BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <Login/>
          </Route>
        </Switch>
        <Switch>
          <Route path="/signUp">
            <SignUp/>
          </Route>
        </Switch>
        <Switch>
          <Route path="/forgotPassword">
            <ForgotPassword/>
          </Route>  
        </Switch>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login"/>
        </Route>
      </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
