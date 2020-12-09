import './App.css';
import './index.css'
import './budgetFormatting.css'
import React, {Component, useState} from 'react';
import bootsrap, { Button, Badge, Container, Nav } from 'react-bootstrap';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    handleClick(e) {
        var username = document.getElementById("UserName").value;
        var name = document.getElementById("Name").value;
        var email = document.getElementById("Email").value;
        var password1 = document.getElementById("Password1").value;
        var password2 = document.getElementById("Password2").value;

        if (password1 !== password2)
        {
            alert("Passwords do not match");
            return
        }

        fetch('https://budgetmanagerpro.herokuapp.com/api/users', 
        {
            method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    username: username,
                    name: name,
                    email: email,
                    password: password1
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
                    <form className="box center" action="" method="">
                        <p id="loginResult"></p>
                        <input type="text" id="Email" placeholder="Email"></input>
                        <input type="text" id="Name" placeholder="Name"></input>
                        <input type="text" id="UserName" placeholder="Username"></input>
                        <input type="password" id="Password1" placeholder="Password"></input>
                        <input type="password" id="Password2" placeholder="Confirm Password"></input>
                        <Button id="SignUpButton" onClick={(e => this.handleClick(e))}>Sign Up</Button>
                    </form>
                    <br></br>
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

export default SignUp;