const express = require('express');
const router = express.Router();
const config = require('../config');

const jwt = require('jsonwebtoken');

//var bcrypt = require('bcrypt'); encryption library if needed in the future

const Users = require('../models/users');

// API endpoint to login and generate authentication

router.post('/login', function(req, res, next) {
    console.log(req.body);
    console.log(req.body.email);
    Users.find(req.body).then(function(user) {
        if(res !== null) {
            let tokenData = {
                id: res.id,
                name: res.name,
                email: res.email
            }
            let generatedToken = jwt.sign(tokenData, config.JWT_KEY, {expiresIn: '30m'});
            res.send({
                token: generatedToken,
                id: res.id,
                name: res.name
            });
        } else {
            res.status(401).send({
                success: false,
                message: 'User does not exist.'
            })
        }
    }).catch(next);  
});

module.exports = router;