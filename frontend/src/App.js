import './App.css';
import './index.css'
import './budgetFormatting.css'
import React, {Component, Fragment, useState} from 'react';
import Login from './Login.js';
import bootsrap from 'react-bootstrap';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';


class App extends Component {
  render() {
    return (
      <Fragment>
        <Login/>
        <SignUp/>
        <ForgotPassword/>
      </Fragment>
    );
  }
}

export default App;
