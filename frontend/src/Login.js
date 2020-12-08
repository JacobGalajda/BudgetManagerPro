import './App.css';
import './index.css'
import './budgetFormatting.css'
import React, {Component, useState} from 'react';
import bootsrap, { Button, Badge, Container, Nav } from 'react-bootstrap';
import {BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

class Login extends Component {
    render() {
        return (
            <div className="center-main">
                <Container className="themed-container center">
                <br></br>
                <br></br>
                <h1 className="center">Budget Manager <Badge variant="dark">Pro</Badge> </h1>
                <br></br>
                <br></br>
                <h6 className="center">A place to organize finances to ensure that they are within their financial scopes.</h6>
                <div className="white-box">
                    <form className="box center">
                    <p id="loginResult"></p>
                    
                    <input type="text" id="Email" placeholder="Email"></input>
                    <input type="password" id="Password" placeholder="Password"></input>
                
                    <Button id="LoginButton" onclick="">Login</Button>
                    <br></br>
                    <Nav className="flex-column">
                        <Nav.Item>
                            <Nav.Link href="signUp">Sign Up</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="forgotPassword"> Forgot Password</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    </form>
                </div>
                </Container>
            </div>
        );
    }
  }

export default Login;