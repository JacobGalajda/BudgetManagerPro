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
            clear                                                                  # Refresh the terminal screen
            add <ITEM_NAME> <PRICE> [BUDGET_CATEGORY]                              # Adds a new Item to your budget
            edit <ITEM_NAME> <PRICE> [BUDGET_CATEGORY]                             # Edit an existing Item in your budget
            delete <ITEM_NAME>                                                     # Delete an Item from your budget
            update_profile <username OR password> <new value> <repeat new value>   # Update your profile name or password
            burn_account                                                           # PERMANATELY delete your account
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

                <Container>
                    <br></br>
                    <br></br>
                    <h1 className="center">Budget Manager <Badge variant="dark">Pro</Badge></h1>

                    <VictoryPie height={200} padding={35}
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
                          style={{ labels: { fill: "white", fontSize: 8, fontWeight: "bold" } }}
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
            </div>
        );
    }
};
