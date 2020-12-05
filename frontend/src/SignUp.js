import './App.css';
import './index.css'
import './budgetFormatting.css'
import React, {Component, useState} from 'react';

import bootsrap, { Button, Badge, Container } from 'react-bootstrap';

class SignUp extends Component {
    render() {
        return (
            <div className="center-main">
                <Container className="themed-container">
                <br></br>
                <br></br>
                <h1 className="center">Budget Manager <Badge>Pro</Badge></h1>
                <br></br>
                <br></br>
                <h6 className="center">A place to organize finances to ensure that they are within their financial scopes.</h6>
                <div className="white-box">
                    <form className="box center" action="" method="">
                    <p id="loginResult"></p>
                    <input type="text" id="loginName" placeholder="Email"></input>
                    <input type="text" id="loginPhone" placeholder="Phone"></input>
                    <input type="text" id="loginName" placeholder="Username"></input>
                    <input type="password" id="loginPassword1" placeholder="Password"></input>
                    <input type="password" id="loginPassword2" placeholder="Confirm Password"></input>
                    <Button id="loginButton" onclick="">Sign Up</Button>
                    <a href="">Return Home</a>
                    <br></br>
                    </form>
                </div>
                </Container>
            </div>
        );
    }
}

export default SignUp;