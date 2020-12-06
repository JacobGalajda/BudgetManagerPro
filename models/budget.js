// models/Users.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
//<<<<<<< HEAD
        //type: Number,
        type: String,
        default: '0',
//=======
        //type: Number,
        //default: 0
//>>>>>>> dd737c4148eef450b3353c7345e77be41fc096ed
    },
    budget_expense: [ExpenseSchema],
    budget_income: [IncomeSchema],
    budget_goal: [GoalSchema]
});

// export models for budget schema
module.exports = mongoose.model('Budget', BudgetSchema);
//module.exports = mongoose.model('Expense', ExpenseSchema);
//module.exports = mongoose.model('Income', IncomeSchema);
//module.exports = mongoose.model('Goal', GoalSchema);