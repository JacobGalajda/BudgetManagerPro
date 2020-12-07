import './App.css';
import './index.css'
import './budgetFormatting.css'
import React, {Component, useState} from 'react';
import bootstrap, { Button, Badge, Container, Col, Row, Navbar, Form, FormControl } from 'react-bootstrap';
import victory, { VictoryPie } from 'victory';

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

                    <VictoryPie
                        data={[
                            { x: "Cats", y: 35 },
                            { x: "Dogs", y: 40 },
                            { x: "Birds", y: 55 }
                          ]}
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
                          style={{ labels: { fill: "white", fontSize: 4, fontWeight: "bold" } }}
                    >
                    </VictoryPie>
                </Container>

            </div>
        );
    }
};
