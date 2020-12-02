const express = require('express');
const router = express.Router();
const config = require('../config');

const jwt = require('jsonwebtoken');

//var bcrypt = require('bcrypt'); //encryption library if needed in the future

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
        Users.find(req.body).then(function(users) {
            if(users[0] === undefined) {
                res.status(401).send({
                    success: false,
                    message: 'User does not exist.'
                });
            } else {
                Users.findOne({_id: users[0].id}).then(function(user) {
                    console.log(user);
                    if(user !== null) {
                        let tokenData = {
                            id: user.id,
                            name: user.name,
                            email: user.email
                        }
                        console.log(user);
                        let generatedToken = jwt.sign(tokenData, config.JWT_KEY, {expiresIn: '30m'});
                        res.send({
                            success: true,
                            message: "User found.",
                            token: generatedToken,
                            id: user.id,
                            name: user.name
                        });
                    } else {
                        res.status(401).send({
                            success: false,
                            message: 'User does not exist.'
                        })
                    }
                });
            }
            
        }).catch(next);
    } 
});

module.exports = router;