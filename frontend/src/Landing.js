import './App.css';
import './index.css'
import './budgetFormatting.css'
import React, {Component, useState} from 'react';
import bootstrap, { Button, Badge, Container, Col, Row, Navbar, Form, FormControl } from 'react-bootstrap';
export default class Landing extends Component {
    
    render() {
        return (
            <div>
                <Navbar bg="dark" variant="dark" className="align-me">
                    <Navbar.Brand href="/login">
                        Budget Manager Pro
                    </Navbar.Brand>
                    <div>
                        <p className="center">A place to organize finances to ensure that they are within their financial scopes.</p>
                    </div>
                    <div>
                        <Button variant="outline-danger">Log Out</Button>
                    </div>
                </Navbar>

                <Container className="themed-container">
                    <br></br>
                    <br></br>
                    <h1 className="center">Budget Manager <Badge variant="dark">Pro</Badge></h1>
                    <br></br>
                    <h3 className="center">Welcome, JaCrispy</h3>
                </Container>

            </div>
        );
    }
};
