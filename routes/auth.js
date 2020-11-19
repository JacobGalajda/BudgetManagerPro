const express = require('express');
const router = express.Router();
const config = require('../config');

const jwt = require('jsonwebtoken');

//var bcrypt = require('bcrypt'); encryption library if needed in the future

const Users = require('../models/users');

// API endpoint to login and generate authentication

router.post('/login', function(req, res, next) {
    console.log(req.body); // REMOVE LATER TESTING
    const email = req.body.email;
    const password = req.body.password;

    if(email === undefined || password === undefined) {
        res.status(401).json({
            success: false,
            message: "Email and/or password are invalid."
        });
    } else {
        Users.find(req.body).then(function(user) {
            console.log(user.name); //THIS ALWAYS GIVES ME UNDEFINED
            res.send(user);
        }).catch(next);
    } 
});

module.exports = router;