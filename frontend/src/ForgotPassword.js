import './App.css';
import './index.css'
import './budgetFormatting.css'
import React, {Component, useState} from 'react';

import bootstrap, { Button, Badge, Container } from 'react-bootstrap';

class ForgotPassword extends Component {
    render() {
        return (
            <div className="center-main">
                <Container className="themed-container center">
                <br></br>
                <br></br>
                <h1 className="center">Budget Manager <Badge>Pro</Badge></h1>
                <br></br>
                <br></br>
                <h6 className="center">A place to organize finances to ensure that they are within their financial scopes.</h6>
                <div className="white-box">
                    <form className="box center">
                    <p id="loginResult"></p>
                    
                    <input type="text" id="email" placeholder="Email"></input>
                    <input type="password" id="loginName" placeholder="UserName"></input>
                    
                    <a href="">Home</a>
                    <br></br>
                    <a href="">Sign up</a>

                    <Button id="forgotButton" onclick="">Submit</Button>
                    </form>
                </div>
                </Container>
            </div>
        );
    }
  }

export default ForgotPassword;