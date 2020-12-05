import './App.css';
import './index.css'
import './budgetFormatting.css'
import React, {Component, useState} from 'react';

import bootsrap, { Button, Badge, Container } from 'react-bootstrap';


class Login extends Component {
    render() {
        return (
            <div className="center-main">
                <Container className="themed-container">
                <br></br>
                <br></br>
                <h1 className="center">Budget Manager <Badge>Pro</Badge> </h1>
                <br></br>
                <br></br>
                <h6 className="center">A place to organize finances to ensure that they are within their financial scopes.</h6>
                <div className="white-box">
                    <form className="box center">
                    <p id="loginResult"></p>
                    
                    <input type="text" id="loginName" placeholder="Email"></input>
                    <input type="password" id="loginPassword" placeholder="Password"></input>
                    
                    <a href="">Forgot password...</a>
                    <br></br>
                    <a href="">Sign up</a>

                    <Button id="loginButton" onclick="">Login</Button>
                    </form>
                </div>
                </Container>
            </div>
        );
    }
  }

export default Login;