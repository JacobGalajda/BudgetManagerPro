const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');

var bcrypt = require('bcrypt');

const Users = require('../models/users');

// API endpoint to login and generate authentication

router.post('/login', function(req, res) {
    console.log(req.body);
    const {email, password} = req.body

    Users.findOne();
});