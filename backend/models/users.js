// models/Users.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema and model
// pass in object with different properties and their data types
const UsersSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    email: {
        type: String,
        required: [true, 'Email field is required']
    },
    password: {
        type: String,
        required: [true, 'Password field is required']
    },
    created_at: {
        type: String,
        required: true,
        default: Date.now
    },
    verified: {
        type: Boolean,
        required: true,
        default: false
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