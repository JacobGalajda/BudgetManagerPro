import './App.css';
import './index.css'
import './budgetFormatting.css'
import React, {Component, Fragment, useState} from 'react';
import Login from './Login.js';
import bootsrap from 'react-bootstrap';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Landing from './Landing';

function App() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login}>
          </Route>
          <Route exact path="/signUp" component={SignUp}>
          </Route>
          <Route exact path="/forgotPassword" component={ForgotPassword}>
          </Route>  
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/landing" component={Landing}>
          </Route>
          <Redirect to="/login"></Redirect>
        </Switch>
      </BrowserRouter>
    );
};

export default App;
