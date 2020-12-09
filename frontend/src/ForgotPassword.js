import './App.css';
import './index.css'
import './budgetFormatting.css'
import React, {Component, useState} from 'react';
import {BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import bootstrap, { Button, Badge, Container, Nav } from 'react-bootstrap';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    handleClick(e) {
        var email = document.getElementById("Email").value;
        var username = document.getElementById("UserName").value;
        
        fetch('https://budgetmanagerpro.herokuapp.com/api/password-reset', 
        {
            method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    username: username,
                    email: email,
                  })
        })
        .then((res) => res.json())
        .then((d) => {
            this.setState({ data: d });
            console.log(this.state.data);
        });
    }

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
                    
                    <input type="text" id="Email" placeholder="Email"></input>
                    <input type="text" id="UserName" placeholder="UserName"></input>
                    <Button id="ForgotPasswordButton" onclick={(e => this.handleClick(e))}>Submit</Button>
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