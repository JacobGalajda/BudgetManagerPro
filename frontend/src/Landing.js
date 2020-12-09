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
var graphdata = [];

const commands = {
    help: {
        fn: args => {
            return `
            clear
            add <ITEM_NAME> <PRICE> <BUDGET_CATEGORY>
            edit <ITEM_NAME> <name |OR| price |OR| category> <NEW_VALUE>
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
                // var data = JSON.parse(localStorage.getItem('data'));
                // console.log(data);
                fetch('https://budgetmanagerpro.herokuapp.com/api/users/' + `${userdata.user._id}`, 
                {
                    method: "PUT",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + `${userdata.token}`
                        },
                        body: JSON.stringify({
                            username: args[1],
                        })
                })
                .then((res) => res.json())
                .then((d) => {
                    localStorage.setItem('data', d);
                    //var temp = JSON.parse(localStorage.getItem(d));
                    //console.log(temp);
                    //window.location.reload(false);
                }).catch(err => console.log(err)).finally(() => {return `User updated.`} );

                return `Username updated.`
            }

            if (option === 'password') {
                fetch('https://budgetmanagerpro.herokuapp.com/api/users/' + `${userdata.user._id}`, 
                {
                    method: "PUT",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + `${userdata.token}`
                        },
                        body: JSON.stringify({
                            password: args[1],
                        })
                })
                .then((res) => res.json())
                .then((d) => {
                    localStorage.setItem('data', d);
                    //var temp = JSON.parse(localStorage.getItem(d));
                    //console.log(temp);
                    //window.location.reload(false);
                }).catch(err => console.log(err)).finally(() => {return `Password updated.`} );

                return `Password updated.`
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

            userdata.user.user_budgets[0].budget_expense.push({
                expense_category: item_category,
                expense_name: item_name,
                expense_cost: parseInt(item_price, 10)
            })

            fetch('https://budgetmanagerpro.herokuapp.com/api/users/' + `${userdata.user._id}` + "/budgets/" + `${userdata.user.user_budgets[0]._id}`, 
                {
                    method: "PUT",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + `${userdata.token}`
                        },
                        body: JSON.stringify(userdata.user.user_budgets[0])
                })
                .then((res) => res.json())
                .then((d) => {
                    localStorage.setItem('data', d);
                    //var temp = JSON.parse(localStorage.getItem(d));
                    //console.log(temp);
                    //window.location.reload(false);
                }).catch(err => console.log(err)).finally(() => {return `Expense added.`} );

                return `Expense added.`
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

            var i = 0;
            var temp;
            for(i = 0; i < userdata.user.user_budgets[0].budget_expense.length; i++) {
                if(userdata.user.user_budgets[0].budget_expense[i].expense_name === iten_name) {
                    break;
                }
            }
            if(i >= userdata.user.user_budgets[0].budget_expense.length) {
                return `Could not find expense.` //POSSIBLY CHANGE
            }

            // TODO() Update Name, Price, Category API
            if (option === 'name') {
                userdata.user.user_budgets[0].budget_expense[i].expense_name = value;
            }
            else if (option === 'price') {
                userdata.user.user_budgets[0].budget_expense[i].expense_cost = value;
            }
            else if (option === 'category') {
                userdata.user.user_budgets[0].budget_expense[i].expense_category = value;
            }
            else {
                return `ERROR: Select name, price or category to edit`
            }

            // Single API call
            fetch('https://budgetmanagerpro.herokuapp.com/api/users/' + `${userdata.user._id}` + "/budgets/" + `${userdata.user.user_budgets[0]._id}`, 
            {
                method: "PUT",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + `${userdata.token}`
                    },
                    body: JSON.stringify(userdata.user.user_budgets[0])
            })
            .then((res) => res.json())
            .then((d) => {
                localStorage.setItem('data', d);
                //var temp = JSON.parse(localStorage.getItem(d));
                //console.log(temp);
                //window.location.reload(false);
            }).catch(err => console.log(err)).finally(() => {return `Expense updated successfully.`} );

            return `Expense updated successfully.`
        }
    },
    delete: {
        fn: args => {
            if (Object.keys(args).length < 1) {
                return `SYNTAX: delete <ITEM_NAME>
                        Enter an item to delete from the budget`
            }

            const item_name = args[0];
            var i = 0;
            for(i = 0; i < userdata.user.user_budgets[0].budget_expense.length; i++) {
                if(userdata.user.user_budgets[0].budget_expense[i].expense_name === item_name) {
                    break;
                }
            }
            if(i >= userdata.user.user_budgets[0].budget_expense.length) {
                return `Could not find expense to delete.` //POSSIBLY CHANGE
            }

            userdata.user.user_budgets[0].budget_expense.splice(i, 1);

            fetch('https://budgetmanagerpro.herokuapp.com/api/users/' + `${userdata.user._id}` + "/budgets/" + `${userdata.user.user_budgets[0]._id}`, 
            {
                method: "PUT",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + `${userdata.token}`
                    },
                    body: JSON.stringify(userdata.user.user_budgets[0])
            })
            .then((res) => res.json())
            .then((d) => {
                localStorage.setItem('data', d);
                //var temp = JSON.parse(localStorage.getItem(d));
                //console.log(temp);
                //window.location.reload(false);
            }).catch(err => console.log(err)).finally(() => {return `Expense deleted successfully.`} );

            return `Expense deleted successfully.`
        }
    },
    burn_account: {
        fn: args=> {
            if (window.confirm("WARNING: Are you sure you would like to burn your account?")) {
                userdata.user = null;
                userdata.token = null;
                fetch('https://budgetmanagerpro.herokuapp.com/api/users/' + `${userdata.user._id}`, 
                {
                    method: "DELETE",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + `${userdata.token}`
                        },
                        body: JSON.stringify(userdata.user.user_budgets[0])
                })
                .then((res) => res.json())
                .then((d) => {
                    localStorage.setItem('data', d);
                    //var temp = JSON.parse(localStorage.getItem(d));
                    //console.log(temp);
                    //window.location.reload(false);
                }).catch(err => console.log(err)).finally(() => {return `Account deleted successfully.`} );
                // JACOB DO YOUR STUFF BELOW HERE

                window.history.pushState(this.state, null, '/Login');
                window.location.reload(false);

                return `Account deleted successfully.`
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
        var userData = localStorage.getItem('data'); // String userdata
        userdata = JSON.parse(userData); // Javascript userdata
        graphdata = localStorage.getItem('graph');
        
        console.log(userdata); // TEST

    }

    render() {
        return (            
            <Container>
                <Container>
                    <br></br>
                    <br></br>
                    <br></br>
                    <h1 className="center">Budget Manager <Badge variant="dark">Pro</Badge></h1>
                    <br></br>
                    <VictoryPie 
                        height={200} 
                        //padding={50}
                        x='name'
                        y='price'
                        data={JSON.parse(localStorage.getItem('graph'))}
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
                          style={{ labels: { fill: "white", fontSize: 8 } }}
                          
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
