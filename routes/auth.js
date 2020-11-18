const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');

var bcrypt = require('bcrypt');

const Users = require('../models/users');

// API endpoint to login and generate authentication

router.post('/login', function(req, res) {
    const {email, password} = req.body.userData; // IFFY ON THIS LINE, I don't know what user data is

    if(email === undefined || password === undefined) {
        res.status(401).json({
            success: false,
            message: "Email and/or password are invalid."
        })
    } else {
        Users.findOne({email: email , password: password}).then(function(err, user) {
            if(!err && result !== null) {
                
            }
        });
    }
    
});