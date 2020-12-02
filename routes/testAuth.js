const express = require('express');
const router = express.Router();
const verifyToken = require('./verifyToken');


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

module.exports = router;