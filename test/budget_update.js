// test ability to save Budget to MongoDB
// to run 'npm run test'
const assert = require('assert');
const budget = require('../models/budget');
const Budget = require('../models/budget');
const Users = require('../models/users');

// Describe our tests
describe('Search records for budget', function() {

    // declare newUser outside beforeEach() so we can use the returned _id to find by newUser._id
    var newUser;

    // decare newBudget outside beforeEach() so returned _id can be used to find budget
    var newBudget;

    // add a User to the db before each tests which contains the string you are searching for
    // must create this new user because our connection test clears the collection before running tests
    beforeEach(function(done) {

        // create new user 
        // mongoose returns mongoDB unique _id to newUser
        newUser = new Users({
            name: 'Ima FindBudgetTest',
            email: 'find_budget_test1.edu',
            password: '123'
        });

        // save new user
        newUser.save().then(function() {

            // find user given _id
            // asynchronous -- so when 'findOne()' returns 'result', then function(result) fires
            Users.findOne({ _id: newUser._id }).then(function(result) {

                // create a new user object based on Budget model
                newBudget = new Budget({
                    budget_name: 'test_budget_1',
                    budget_final_date: '2020-12-31T01:46:20.000+00:00',
                    //budget_expense: [{}],
                    //budget_income: [{}],
                    //budget_goal: [{}]

                    budget_expense: [{
                        expense_name: 'expense_1',
                        expense_cost: 10.00
                    }],
                    budget_income: [{
                        income_name: 'income_1',
                        income_amount: 15.00
                    }],
                    budget_goal: [{
                        goal_name: 'goal_1',
                        goal_amount: 20.00,
                        goal_cateogory: 'personal goal category',
                        goal_date: '2020-12-01T01:46:20.000+00:00'
                    }]
                });

                // add new budget to new user's budget array
                result.user_budgets.push(newBudget);

                // save user with new budget to mongoDB
                result.save().then(function() {
                    done();
                });
            });
        });
    });



    // Update test - update budget for a given user
    it('Updates a user budget from \'test_budget_1\' to \'updated_budget_1\'', function(done) {
        // create a new user object based on Budget model
        updatedBudget = new Budget({
            budget_name: 'updated_budget_1',
            budget_final_date: '2020-12-31T01:46:20.000+00:00',
            //budget_expense: [{}],
            //budget_income: [{}],
            //budget_goal: [{}]

            budget_expense: [{
                expense_name: 'expense_1',
                expense_cost: 10.00
            }],
            budget_income: [{
                income_name: 'income_1',
                income_amount: 15.00
            }],
            budget_goal: [{
                goal_name: 'goal_1',
                goal_amount: 20.00,
                goal_cateogory: 'personal goal category',
                goal_date: '2020-12-01T01:46:20.000+00:00'
            }]
        });

        // find user document by name and update (luigi)
        Users.findOneAndUpdate({ "_id": newUser._id }, { user_budgets: updatedBudget }).then(function() {

            // check if this works by searching for User's unique _id
            Users.findOne({ _id: newUser._id }).then(function(result) {
                newBudget = result.user_budgets[0];
                //console.log(newBudget.budget_name);
                //console.log(updatedBudget.budget_name);

                // _id field is an object with a wrapper within MongoDB, have to use toString() so mongoose can interpret
                assert(newBudget.budget_name === updatedBudget.budget_name); // check to make sure updated budget name is same as result from query
                done();
            });
        });

    });

});