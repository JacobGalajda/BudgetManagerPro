//https://www.youtube.com/watch?v=kjKR0q8EBKE&list=PL48XNXWziP9Jbw4suw75_aDFC6dp_4-j8&index=17

// models/Users.js
const mongoose = require('mongoose');

// set port and mongoDB url (local or global)
//const PORT = process.env.PORT || 3001;
//const MONGODB_URI = "mongodb://localhost:27017/my_local_db";
//const MONGODB_URI = "mongodb+srv://root:!cop4331!@project.m58al.mongodb.net/Test?retryWrites=true&w=majority";
const MONGODB_URI = "mongodb+srv://root:!cop4331!@project.m58al.mongodb.net/cop4331?retryWrites=true&w=majority";

// ES6 Promises  -- set global Promise ES6 object equal to Promise
// gets rid of DepreciatedWarning for Promises when running test
//mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

// connect to mongoDB with log messages for successful/unsuccessful connection
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false });
mongoose.connection.once('open', function() {
    console.log('Connected to the Database.');
});
mongoose.connection.on('error', function(error) {
    console.log('Mongoose Connection Error : ' + error);
});

// create schema and model for expenses (nested in budget)
const ExpenseSchema = new Schema({
    expense_name: {
        type: String
            //required: [true, 'Expense name field is required']
    },
    expense_cost: {
        type: Number
            //required: [true, 'Cost field is required'],
    },
    expense_category: {
        type: String,
        //required: [true, 'Category field is required'],
        default: 'Incidental'
    },
    expense_recurring: {
        type: Boolean,
        //required: [true, 'Recurring or non-recurring expense field is required'],
        default: false
    },
    expense_paid: {
        type: Boolean,
        default: false
    },
    expense_due_date: {
        type: String,
        //required: [true, 'Due date field is required'],
        default: Date.now
    },
    expense_created_at: {
        type: String,
        //required: true,
        default: Date.now
    }
});


// create schema and model for income (nested in budget)
const IncomeSchema = new Schema({
    income_name: {
        type: String,
        //required: [true, 'Income name field is required']
    },
    income_amount: {
        type: Number,
        //required: [true, 'Income amount field is required'],
    },
    income_category: {
        type: String,
        //required: [true, 'Category field is required'],
        default: 'Incidential'
    },
    income_recurring: {
        type: Boolean,
        //required: [true, 'Recurring or non-recurring income field is required'],
        default: false
    },
    income_received: {
        type: Boolean,
        default: true
    },
    income_receive_date: {
        type: String,
        default: Date.now
    },
    income_created_at: {
        type: String,
        //required: true,
        default: Date.now
    }
});


// create schema and model for budget goals (nested in budget)
const GoalSchema = new Schema({
    goal_name: {
        type: String,
        //required: [true, 'Goal name field is required']
    },
    goal_amount: {
        type: Number,
        //required: [true, 'Amount attempting to save field is required'],
    },
    goal_category: {
        type: String,
        //required: [true, 'Category field is required'],
        default: 'Incidential'
    },
    goal_date: {
        type: String,
        //required: [true, 'Goal date field is required'],
        default: Date.now
    },
    goal_created_at: {
        type: String,
        //required: true,
        default: Date.now
    }
});


// create schema and model for budget
const BudgetSchema = new Schema({
    budget_name: {
        type: String,
        //required: [true, 'Budget name field is required']
    },
    budget_category: {
        type: String,
        //required: [true, 'Category field is required'],
        default: 'Personal'
    },
    budget_completed: {
        type: Boolean,
        default: false
    },
    budget_final_date: {
        type: String,
        //required: [true, 'Due date field is required'],
        default: Date.now
    },
    budget_created_at: {
        type: String,
        //required: true,
        default: Date.now
    },
    shared: {
        type: Boolean,
        default: false
    },
    shared_id: {
        //type: Number,
        type: String,
        default: '0'
    },
    budget_expense: [ExpenseSchema],
    budget_income: [IncomeSchema],
    budget_goal: [GoalSchema]
});

// import budget object so user can create schema
//const Budget = require('../models/budget');

// create schema and model
// pass in object with different properties and their data types
const UsersSchema = new Schema({
    name: {
        type: String,
        //required: [true, 'Name field is required']
    },
    email: {
        type: String,
        //required: [true, 'Email field is required']
    },
    password: {
        type: String,
        //required: [true, 'Password field is required']
    },
    user_budgets: {
        //type: [Budget.schema],
        type: [BudgetSchema],
        default: []
    },
    created_at: {
        type: String,
        //required: true,
        default: Date.now
    },
    verified: {
        type: Boolean,
        //required: true,
        default: false
    }
});

// create new collection modelled after UserSchema
// used as model anytime a new user is created
//const Users = mongoose.model('Users', UsersSchema);

// export so you can use in app
//module.exports = Users;
module.exports = mongoose.model('Users', UsersSchema);
// export models for budget schema
module.exports = mongoose.model('Budget', BudgetSchema);
//




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

newUser = new UsersSchema({
    name: 'Ima FindBudgetTest',
    email: 'find_budget_test1.edu',
    password: '123'
});

// add new budget to new user's budget array
newUser.user_budgets.push(newBudget);

newUser.save((err, data) => {});