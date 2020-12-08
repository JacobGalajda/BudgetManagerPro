import './App.css';
import './index.css'
import './budgetFormatting.css'
import React, {Component, useState} from 'react';
import bootstrap, { Button, Badge, Container, Col, Row, Navbar, Form, FormControl } from 'react-bootstrap';
import victory, { VictoryPie } from 'victory';
import CommandLine from 'react-command-line'

const commands = {
    hello: {
      fn: args => {
        return `The arguments are ${args}`
      }
    },
    help: {
        fn: args => {
            return `
            clear
            add <ITEM_NAME> <PRICE> [BUDGET_CATEGORY]
            edit <ITEM_NAME> <PRICE> [BUDGET_CATEGORY]
            delete <ITEM_NAME>
            update_profile <username OR password> <new value> <repeat new value>
            burn_account
            `
        }
    },
    clear: {
        fn: args => {
            window.location.reload(false);
        }
    },
    update_profile: {
        fn: args => {
            return `Route in progress`
        }
    },
    add: {
        fn: args => {
            return `Route in progress`
        }
    },
    edit: {
        fn: args => {
            return `Route in progress`
        }
    },
    delete: {
        fn: args => {
            return `Route in progress`
        }
    },
    burn_account: {
        fn: args=> {
            return `Route in progress`
        }
    }
  }

export default class Landing extends Component {
    
    render() {
        return (
            <Container>
                <br></br>
                <br></br>
                <br></br>
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

                <Container>
                    <h1 className="center">Budget Manager <Badge variant="dark">Pro</Badge></h1>
                    <br></br>
                    <VictoryPie height={100} padding={25}
                        data={[
                            { x: "Beer", y: 35 },
                            { x: "Drugz", y: 40 },
                            { x: "Speeding Tickets", y: 55 },
                            { x: "Gambling Debt", y: 100}
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
                          style={{ labels: { fill: "white", fontSize: 6 } }}
                    >
                    </VictoryPie>

                    <div className="center">
                        <h3>Budget Manager Pro Command Line Utility</h3>


                        <div class="console">
                        <header>
                            <p></p>
                        </header>
                        <div class="consolebody left">
                            <p> Type help to see a list of commands. Refresh page to clear terminal.</p>
                            <CommandLine commands={commands}></CommandLine>
                        </div>
                        </div>
                    </div>
                

                </Container>
            </Container>
        );
    }
};
