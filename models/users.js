// models/Users.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// import budget object so user can create schema
const Budget = require('../models/budget');

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
    email_token: {
        type: String,
        default: ''
            //required: [true, 'Password field is required']
    },
    user_budgets: {
        type: [Budget.schema],
        default: [new Budget()]

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
    },
    emailToken: {
        type: String,
        //required: [true, 'Email field is required']
        default: null
    },
    passwordToken: {
        type: String,
        //required :[true],
        default: null
    },
    username: {
        type: String,
        //required: [true, 'Name field is required']
    },
    passwordReset: {
        type: String,
        //required: [true, 'Password field is required']
    }
});

// create new collection modelled after UserSchema
// used as model anytime a new user is created
//const Users = mongoose.model('Users', UsersSchema);

// export so you can use in app
//module.exports = Users;
module.exports = mongoose.model('Users', UsersSchema);

// ... 
// create a new user in another file
//var newUser = new User({})