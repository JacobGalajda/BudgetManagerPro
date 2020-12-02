// test ability to save Budget to MongoDB
// to run 'npm run test'
const assert = require('assert');
const budget = require('../models/budget');
const Budget = require('../models/budget');
const Users = require('../models/users');

// Describe our tests
describe('Delete a budget for User', function() {

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
    it('Deletes a user budget', function(done) {
        Users.findOne({ _id: newUser._id }).then(function(result) {
            newBudget = result.user_budgets;
            console.log(newBudget[0]._id);
            var budget_id = newBudget[0]._id;
            console.log(budget_id);

            //result.user_budgets.pull({ budget_name: 'updated_budget_1' });
            //result.user_budgets.pull({ budget_name: 'test_budget_1' });
            //result.user_budgets.remove({ budget_name: 'updated_budget_1' });
            //result.user_budgets.remove({ budget_name: 'test_budget_1' });
            //result.user_budgets.pull();
            //result.user_budgets.remove();

            //parent.children.id(_id).remove();
            //result.newBudget.id(_id).remove();

            //console.log(result.user_budgets[0]);

            result.save().then(function() {
                done();
            });


            // given the users list of budgets, delete the first one
            //console.log(record);

            //Users.findOneAndUpdate({ _id: newUser._id }, { 'newBudget[0]._id': newBudget[0]._id }, {
            //$pull: { newBudget[0]: { newBudget[0]._id: '55a19992474e7ded6b4ae2b0' } }).then(function(record) {
            //Users.findOneAndUpdate({ 'user_budgets._id': budget_id }, {
            //$pull: { user_budgets: { _id: budget._id } }
            //}).then(function(record) {


            // check if this works by attempting to find deleted user
            //Users.findOne({ _id: newUser._id }).then(function(record) {
            //console.log(record);
            // if null result is returned, this has been deleted and null record found
            //assert(record.user_budgets[0] === null);
            //done();
            //});
        });
    });

});

//});