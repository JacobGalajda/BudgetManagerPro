import './App.css';
import './index.css';
import './budgetFormatting.css';
import Login from './Login.js';
import React, {Component, useState} from 'react';
import bootstrap, { Alert, Button, Badge, Container, Col, Row, Navbar, Form, FormControl } from 'react-bootstrap';
import victory, { VictoryPie } from 'victory';
import CommandLine from 'react-command-line';

/**
 * expense_cost, expense_name, expense_category
 *  ^^ Features shown on mobile
 */

// TODO() Tags have been placed where the API needs to be hooked up. The alert() tells what API call is needed
var userdata = [];

const commands = {
    help: {
        fn: args => {
            return `
            clear
            add <ITEM_NAME> <PRICE> <BUDGET_CATEGORY>
            edit <name |OR| price |OR| category> <NEW_VALUE>
            delete <ITEM_NAME> <REPEAT_ITEM_NAME>
            update_profile <username |OR| password> <NEW_VALUE> <REPEEAT_NEW_VALUE>
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
            if (Object.keys(args).length < 3) {
                return `SYNTAX: update_profile <username | password> <NEW VALUE> <REPEAT NEW VALUE>
                        Select either username or password and the new value twice to confirm.`
            }

            const option = args[0];

            if (option !== 'username' && option !== 'password') {
                return `ERROR: Invalid parameter detected. Try "username" or "password"`
            }

            if (args[1] !== args[2]) {
                return `ERROR: New values must match each other`
            }

            if (option === 'username') {
                fetch('https://budgetmanagerpro.herokuapp.com/api/users/' + `${localStorage.getItem('data').user.id}`, 
                {
                    method: "PUT",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            username: args[1],
                        })
                })
                .then((res) => res.json())
                .then((d) => {
                    localStorage.setItem('data', d);
                    var temp = JSON.parse(localStorage.getItem(d));

                    if (this.state.data.success === false) {
                        return `Call failed`;
                    }

                    else if (this.state.data.success) {
                        window.location.reload(false);
                    }
                });
            }

            if (option === 'password') {
                fetch('https://budgetmanagerpro.herokuapp.com/api/users/' + `${this.state.data.user.id}`, 
                {
                    method: "PUT",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            password: args[1],
                        })
                })
                .then((res) => res.json())
                .then((d) => {
                    this.setState({ data: d });
                    console.log(this.state.data);

                    if (this.state.data.success === false) {
                        return `Call failed`;
                    }

                    else if (this.state.data.success) {
                        window.location.reload(false);
                    }
                });
                }
            }
    },
    add: {
        fn: args => {
            if (Object.keys(args).length < 2) {
                return `SYNTAX: add <ITEM_NAME> <PRICE> <BUDGET_CATEGORY>
                        Item name, price and budget category are required.`
            }

            const item_name = args[0];
            const item_price = args[1];
            const item_category = args[2];

            // TODO() Add Item API
            alert("Adding Item");
        }
    },
    edit: {
        fn: args => {
            if (Object.keys(args).length < 3) {
                return `SYNTAX: edit <ITEM_NAME> <name |OR| price |OR| category> <NEW_VALUE>
                        Select either the name, price or category to modify the item along with the new value.`
            }

            const iten_name = args[0];
            const option = args[1];
            const value = args[2];

            // TODO() Update Name, Price, Category API
            if (option === 'name') {
                alert('Editing Item Name');
            }
            else if (option === 'price') {
                alert('Editing Item Price');
            }
            else if (option === 'category') {
                alert('Editing Item Category');
            }

            return `ERROR: Select name, price or category to edit`
        }
    },
    delete: {
        fn: args => {
            if (Object.keys(args).length < 1) {
                return `SYNTAX: delete <ITEM_NAME>
                        Enter an item to delete from the budget`
            }

            const item_name = args[0];
            alert("Deleting Item");
        }
    },
    burn_account: {
        fn: args=> {
            if (window.confirm("WARNING: Are you sure you would like to burn your account?")) {
                alert("Burning Account");
            }
            else {
                alert("Burn cancelled.");
            }
            return ``
        }
    }
  }

export default class Landing extends Login {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data
        }
        userdata = localStorage.getItem('data');
        console.log(userdata);
    }

    render() {
        return (            
            <Container>
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
