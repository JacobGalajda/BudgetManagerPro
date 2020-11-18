const express = require('express');
const router = express.Router();
const config = require('../config');

const jwt = require('jsonwebtoken');

//var bcrypt = require('bcrypt'); encryption library if needed in the future

const Users = require('../models/users');

// API endpoint to login and generate authentication

router.post('/login', function(req, res) {
    console.log(req.body);
    //const {email, password} = req.body;
    Users.findOne(req.body, function(err, result) {
        if(!err && result !== null) {
            let tokenData = {
                id: result.id,
                name: result.name,
                email: result.email
            }
            let generatedToken = jwt.sign(tokenData, config.JWT_KEY, {expiresIn: '30m'});
            res.json({
                token: generatedToken
            });
        } else {
            res.status(401).json({
                success: false,
                message: err || 'User does not exist.'
            })
        }
    });

    
});

module.exports = router;