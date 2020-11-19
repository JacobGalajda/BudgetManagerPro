const express = require('express');
const router = express.Router();
const config = require('../config');

const jwt = require('jsonwebtoken');

//var bcrypt = require('bcrypt'); encryption library if needed in the future

const Users = require('../models/users');

// API endpoint - get list of all users
router.get('/users', verifyToken, function(req, res) {
    Users.find({}).then(function(users) {
        //res.json(users);
        console.log(users);
        res.send(users);
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
                res.sendStatus(403);
            } else {
                //Next middleware
                next();
            }
        });
    } else {
        //Forbidden
        res.sendStatus(403);
    }
}

module.exports = router;