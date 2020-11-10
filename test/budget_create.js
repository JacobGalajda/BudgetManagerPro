// test ability to save Budget to MongoDB
// to run 'npm run test'
//const mocha = require('mocha');
const assert = require('assert');
const Budget = require('../models/budget');

// Describe our tests
describe('Creating new budget for given User', function() {

    // Create tests
    //it('Saves a record to the database (Budget collection)', function() {
    it('Creates a record to the database (Budget collection)', function(done) {

        // create a new user object based on Budget model
        const newBudget = new Budget({
            budget_name: 'test_budget_1',
            budget_final_date: '2020-12-31T01:46:20.000+00:00',
            //budget_expense: [{}],
            //budget_income: [{}],
            //budget_goal: [{}]
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

        // find the created budget based on name
        newBudget.save().then(function() {
            Budget.findOne({ budget_name: 'test_budget_1' }).then(function(record) {
                assert(record.budget_goal.length === 1);
                assert(record.budget_income.length === 1);
                assert(record.budget_expense.length === 1);
                done();
            });
        });

    });

});