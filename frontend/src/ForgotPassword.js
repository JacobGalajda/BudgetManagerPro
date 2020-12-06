import './App.css';
import './index.css'
import './budgetFormatting.css'
import React, {Component, useState} from 'react';
import {BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import bootstrap, { Button, Badge, Container, Nav } from 'react-bootstrap';

class ForgotPassword extends Component {
    render() {
        return (
            <div className="center-main">
                <Container className="themed-container center">
                <br></br>
                <br></br>
                <h1 className="center">Budget Manager <Badge variant="dark">Pro</Badge></h1>
                <br></br>
                <br></br>
                <h6 className="center">A place to organize finances to ensure that they are within their financial scopes.</h6>
                <div className="white-box">
                    <form className="box center">
                    <p id="loginResult"></p>
                    
                    <input type="text" id="email" placeholder="Email"></input>
                    <input type="password" id="loginName" placeholder="UserName"></input>
                    <br></br>
                    <Button id="forgotButton" onclick="">Submit</Button>
                    </form>
                    <Nav className="flex-column">
                        <Nav.Item>
                            <Nav.Link href="login">Back to Login</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
                </Container>
            </div>
        );
    }
  }

export default ForgotPassword;