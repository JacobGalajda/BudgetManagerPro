// routes/index.js

const express = require('express');

// create instance of express router for interpreting routes
const router = express.Router();

// import Users database model
const Users = require('../models/users');



// API endpoint - get list of all users
router.get('/users', function(req, res) {
    Users.find({}).then(function(users) {
        //res.json(users);
        console.log(users);
        res.send(users);
    });
});

// API endpoint - post new user
router.post('/users', function(req, res, next) {
    console.log(req.body)

    
    Users.create(req.body).then(function(user) {
        res.send(user);
    }).catch(next);
});

// API endpoint - update user
router.put('/users/:id', function(req, res) {
    // find user document by id and update with request body
    Users.findOneAndUpdate({ _id: req.params.id }, req.body).then(function() {
        // check if this works by finding User's unique _id and checking for update
        Users.findOne({ _id: req.params.id }).then(function(user) {
            // send update back to as response
            res.send(user);
        });
    });
});

// API endpoint - delete user by id
//router.delete('/articles/:id', function(req, res) {})

// expoert router object with Article endpoint (collection in Test database)
module.exports = router;