import './App.css';
import './index.css'
import './budgetFormatting.css'
import React, {Component, useState} from 'react';
import {BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import bootstrap, { Button, Badge, Container, Col, Row, Navbar, Form, FormControl } from 'react-bootstrap';
import victory, { VictorySharedEvents, VictoryBar, VictoryLabel, VictoryPie } from 'victory';
import PopUp from './PopUp.js'

export default class Landing extends Component {
    state = {
        seen: false
        };

    togglePop = () => {
        this.setState({
            seen: !this.state.seen
        });
    };

    render() {
        return (
            <div>
                <Container className="themed-container">
                <Navbar bg="dark" variant="dark" align-content="justify">
                    <Navbar.Brand href="/login">
                    <img
                        alt=""
                        src="./AppLogo.svg"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    Budget Manager Pro
                    </Navbar.Brand>

                    <div>
                        <div>
                            <Button variant="outline-success" onClick={this.togglePop}>User Settings</Button>
                        </div>
                    </div>
                    <div>
                        <div>
                            <Button variant="outline-danger">Log Out</Button>
                        </div>
                    </div>

                </Navbar>
                </Container>

                {this.state.seen ? <PopUp toggle={this.togglePop} /> : null}

                <Container className="themed-container">
                    <br></br>
                    <br></br>
                    <h1 className="center">Budget Manager <Badge variant="dark">Pro</Badge></h1>
                    <br></br>
                    <h3 className="center">Welcome, JaCrispy</h3>
                </Container>
                <br></br>
                <br></br>
                <Container className="themed-container">
                    <Row>
                        <Col>
                            <h3 className="center">Overview</h3>
                        </Col>
                        <Col className="center">
                            <h3>Add Item</h3>
                        </Col>
                        <Col>
                            <h3 className="center">Manage Budget Items</h3>
                        </Col>
                    </Row>
                    <Row>
                    <Col className="center">
                        <VictoryPie
                            colorScale={[
                                "#FFDD0E",
                                "#E9AE0B",
                                "#526c5b",
                                "#dcdcbb",
                                "#fa6e06",
                                "#244c3c",
                                "#590202",
                                "#a7bf50"
                            ]}
                            height={500}
                            data={[
                            { x: "Cats", y: 35 },
                            { x: "Dogs", y: 40 },
                            { x: "Birds", y: 55 }
                        ]}
                        />
                        </Col>
                        <Col className="center">
                            <div className="white-box">
                                <form className="box center">
                                
                                <input type="text" id="email" placeholder="Budget Name"></input>
                                <input type="text" id="loginName" placeholder="Montly Expense"></input>
                                <br></br>
                                <Button id="forgotButton" onclick="">Add Item</Button>
                                </form>
                            </div>
                        </Col>
                        <Col className="center">
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
};
