import './App.css';
import './index.css'
import './budgetFormatting.css'
import React, {Component, useState} from 'react';
import bootsrap, { Button, Badge, Container, Nav } from 'react-bootstrap';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    handleClick(e) {
        var email = document.getElementById("Email").value;
        var password = document.getElementById("Password").value;

        fetch('https://budgetmanagerpro.heroku.app/auth/login', 
        {
            method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    email: email,
                    password: password
                  })
        })
        .then((res) => res.json())
        .then((data) => this.setState({ data: data }));
        console.log(this.state.data);
    }

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
                
                    <Button id="LoginButton" onClick={(e => this.handleClick(e))}>Login</Button>
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