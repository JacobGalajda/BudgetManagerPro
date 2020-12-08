import './App.css';
import './index.css'
import './budgetFormatting.css'
import React, {Component, Fragment, useState} from 'react';
import Login from './Login.js';
import bootsrap from 'react-bootstrap';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';
import {BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Landing from './Landing';
import PopUp from './PopUp';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact>
            <Login/>
          </Route>
          <Route path="/signUp" exact>
            <SignUp/>
          </Route>
          <Route path="/forgotPassword" exact>
            <ForgotPassword/>
          </Route>  
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/landing" exact>
            <Landing/>
          </Route>
      </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
