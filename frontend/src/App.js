import './App.css';
import './index.css'
import './budgetFormatting.css'
import React, {Component, useState} from 'react';

import bootsrap from 'react-bootstrap';


class App extends Component {
  render() {
  return (
    <div className="App-header">
      <body className="center">
        <br></br>
        <br></br>
        <h1>Budget Manager</h1>
        <h1>Pro</h1>
        <br></br>

        <h6>A place to organize finances to ensure that they are within their financial scopes.</h6>
        <div className="white-box">
            <form className="box">
              <p id="loginResult"></p>
            
              <input type="text" id="loginName" placeholder="email"></input>
              <input type="password" id="loginPassword" placeholder="Password"></input>
            
              <a href>Forgot password...</a>
              <br></br>
              <a href>Sign up</a>

              <button id="loginButton" onclick="">Login</button>
            </form>
        </div>

        </body>
      </div>
  );
  }
}

export default App;
