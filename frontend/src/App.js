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
          <Route path="/login" exact component={Login}>
          </Route>
          <Route path="/signUp" exact component={SignUp}>
          </Route>
          <Route path="/forgotPassword" exact component={ForgotPassword}>
          </Route>
          <Route path="/landing" exact component={Landing}>
          </Route>
          <Route path="/*" component={Login}>
          <Redirect to="/login"></Redirect>
          </Route>
        </Switch>
      </BrowserRouter>
    );
};

export default App;
