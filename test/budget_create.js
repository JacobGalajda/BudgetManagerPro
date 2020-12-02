// test ability to save Budget to MongoDB
// to run 'npm run test'
//const mocha = require('mocha');
const assert = require('assert');
const Budget = require('../models/budget');
const Users = require('../models/users');

// Describe our tests
describe('Creating new budget for given User', function() {

    // run test to create user 
    it('Creates a new user and then budget for user and save to database (Budget collection)', function(done) {
        // create new user 
        // mongoose returns mongoDB unique _id to newUser
        newUser = new Users({
            name: 'ImaBudget TestUser',
            email: 'create_budget_test1.edu',
            password: '123'
        });

        // save new user
        newUser.save().then(function() {
            //done();
            //assert(!newUser.isNew);

            // save the unique user id as string variable which can be used by budget
            //userId = newUser._id.toString();

            //done();

            // find user given _id
            // asynchronous -- so when 'findOne()' returns 'result', then function(result) fires
            Users.findOne({ _id: newUser._id }).then(function(result) {

                // _id field is an object with a wrapper within MongoDB, have to use toString() so mongoose can interpret
                //assert(result._id.toString() === newUser._id.toString()); // 
                //done();


                // create a new user object based on Budget model
                const newBudget = new Budget({
                    budget_name: 'test_budget_1',
                    budget_final_date: '2020-12-31T01:46:20.000+00:00',
                    //budget_expense: [{}],
                    //budget_income: [{}],
                    //budget_goal: [{}]
                    //shared_id: userId,

                    budget_expense: [{
                        expense_name: 'expense_1',
                        expense_cost: 10.00
                            //expense_recurring: false
                            //expense_due_date: Date.now
                    }],
                    budget_income: [{
                        income_name: 'income_1',
                        income_amount: 15.00
                            //income_recurring: true
                            //income_receive_date: Date.now
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

                    // find user by name
                    Users.findOne({ name: 'ImaBudget TestUser' }).then(function(record) {
                        // assert that user_budgets array should be size of 1
                        assert(record.user_budgets.length === 1);
                        done();
                    });
                });


            });


        });
    });
});