// routes/index.js
// require express
const express = require('express');

//require config variable
const config = require('../config');

//require sendgrid/mail
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.SECRET_API_KEY);

//require crypto
const crypto = require('crypto');


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
router.post('/users', async function(req, res, next) {
    Users.create(req.body).then(function(user) {
        const emailToken = crypto.randomBytes(64).toString('hex');
        const msg = {
            to: req.body.email,
            from: 'noreply@email.com',
            subject: 'Budget Manager Pro - Verify your account',
            text: `
            Hello, thanks for registering on our website.
            Please copy and paste the address below to verify your account.
            http://${req.headers.host}/verify-email?token=${emailToken}
            `,
            html: `
            <h1> Hello,</h1>
            <p>Thanks for registering on our website,</p>
            <p>Please click the link below to verify your account.</p>
            <a href="http://${req.headers.host}/verify-email?token=${emailToken}"> Verify your account</a>
            `
        };
        try {
            await sgMail.send(msg);
            res.send({
                success: true,
                message: 'Thank you for registering. Please check your email to verify your account.'             
            });
            //res.redirect('/');
        } catch(error) {
            console.log(error);
            res.status(401).send({
                success: false,
                message: 'Something went wrong. Please contact us at noreply@email.com'
            });
        }
    }).catch(next);
});

// Email verification route
router.get('/verify-email', async (req, res, next) => {
    try {
        const user = await Users.findOne({emailToken: req.query.token});
        if (!user) {
            res.status(401).send({
                success: false,
                message: "Token is invalid. Please contact us for assistance."
            });
        }
        user.emailToken = null;
        user.verified = true;
        await user.save();
        res.send({
            success: true,
            message: "User verified."
        });
    } catch(error) {
        console.log(error);
        res.status(401).send({
            success: false,
            message: "Verification failed. Please contact us for assistance."
        });
    }
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