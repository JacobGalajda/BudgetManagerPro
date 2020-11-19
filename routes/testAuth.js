const express = require('express');
const router = express.Router();
const config = require('../config');

const jwt = require('jsonwebtoken');

//var bcrypt = require('bcrypt'); encryption library if needed in the future

const Users = require('../models/users');

// API endpoint - update user
router.put('/users/:id', verifyToken, function(req, res) {
    // find user document by id and update with request body
    Users.findOneAndUpdate({ _id: req.params.id }, req.body).then(function() {
        // check if this works by finding User's unique _id and checking for update
        Users.findOne({ _id: req.params.id }).then(function(user) {
            // send update back to as response
            res.send(user);
        });
    });
});

function verifyToken(req, res, next) {
    //Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is valid
    if(typeof bearerHeader !== 'undefined') {
        //SPLit header
        const bearer = bearerHeader.split(' ');
        //Get token from array
        const bearerToken = bearer[1];
        //Set the token
        //req.token = bearerToken;
        //verify token
        jwt.verify(bearerToken, config.JWT_KEY, (err, authData) => {
            if(err) {
                //Forbidden
                res.sendstatus(403);
            } else {
                //Next middleware
                next();
            }
        });
    } else {
        //Forbidden
        res.sendstatus(403);
    }
}