// routes/index.js

// require dotenv
//require('dotenv').config();

// require express
const express = require('express');

// require config variable
const config = require('../config');

// require verifyToken
const verifyToken = require('./verifyToken');

// require sendgrid/mail
//const sgMail = require('@sendgrid/mail');
//sgMail.setApiKey(process.env.SendGrid);
//require crypto
const crypto = require('crypto');

// nodemailer
const nodemailer = require('nodemailer');

// google apis
const { google } = require('googleapis');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

// create instance of express router for interpreting routes
const router = express.Router();

// import Users/Budget database model
const Users = require('../models/users');
const Budget = require('../models/budget');
const { getMaxListeners } = require('../models/budget');



// API endpoint - get list of all users
router.get('/users', verifyToken, function(req, res) {
    Users.find({}).then(function(users) {
        //res.json(users);
        console.log(users);
        res.send(users);
    });
});

// API endpoint - post new user
router.post('/users', async function(req, res, next) {  
    req.body.emailToken = crypto.randomBytes(64).toString('hex');
    // const budget = new Budget({
    //     budget_category: 'Personal',
    //     budget_name: 'Global',
    //     budget_expense: [{}]
    // });
    // req.body.user_budgets = [Budget]; // either this
    Users.create(req.body).then(async function(user) {
        try {
            // await sgMail.send(msg).then((response) => {
            //     console.log(response);
            //     res.send({
            //         success: true,
            //         message: 'Thank you for registering. Please check your email to verify your account.'             
            //     });
            // });        
            const accessToken = await oAuth2Client.getAccessToken();
            
            const transport = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: 'budgetapppro@gmail.com',
                    clientId: CLIENT_ID,
                    clientSecret: CLIENT_SECRET,
                    refreshToken: REFRESH_TOKEN,
                    accessToken: accessToken
                }
            })

            const mailOptions = {
                to: req.body.email,
                from: 'Budget Manager Pro <budgetapppro@gmail.com>',
                subject: 'Budget Manager Pro - Verify your account',
                text: 
                `
                Hello, thanks for registering on our website.
                Please copy and paste the address below to verify your account.
                http://${req.headers.host}/api/verify-email?token=${req.body.emailToken}
                `
                ,
                html: 
                `
                <h1> Hello,</h1>
                <p>Thanks for registering on our website,</p>
                <p>Please click the link below to verify your account.</p>
                <a href="http://${req.headers.host}/api/verify-email?token=${req.body.emailToken}"> Verify your account</a>
                `
            }

            const result = await transport.sendMail(mailOptions);
            console.log(result);
            res.send({
                success: true,
                message: 'Thank you for registering. Please check your email to verify your account.'             
            });
        } catch(error) {
            console.log(error);
            res.status(401).send({
                success: false,
                message: 'Something went wrong. Please contact us at budgetmanagerproapp@gmail.com'
            });
        }
    }).catch(next);
});

// Email verification route
router.get('/verify-email', async (req, res, next) => {
    try {
        const user = await Users.findOne({ emailToken: req.query.token });
        if (!user) {
            res.status(401).send({
                success: false,
                message: "Token is invalid. Please contact us for assistance."
            });
        }
        user.emailToken = null;
        user.verified = true;
        await user.save();
        const html = `
        <p style="text-align:center">Your account is verified.</p>
        <button onclick= href='https://budgetmanagerpro.herokuapp.com/';"> Login </button>
        `
        res.send(html);
        // res.send({
        //     success: true,
        //     message: "User verified."
        // });
    } catch(error) {
        console.log(error);
        res.status(401).send({
            success: false,
            message: "Verification failed. Please contact us for assistance."
        });
    }
});

// Password reset
router.get('/password-reset', async function(req, res, next) {
    try {
        const msg = {
            to: req.body.email,
            from: 'budgetmanagerproapp@gmail.com',
            subject: 'Budget Manager Pro - Reset your password.',
            text: 
            `
            Hello, 
            Please copy and paste the link below to reset your password.
            http//:
            `
        }
    }catch {
        ;
    }
});

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

// API endpoint - delete user by id
router.delete('/users/:id', verifyToken, function(req, res) {
    //res.send({ type: 'DELETE' });

    // find user document by id, delete
    Users.findByIdAndRemove({ _id: req.params.id }, req.body).then(function(user) {
        // check if this works by finding User's unique _id and checking for update
        //Users.findOne({ _id: req.params.id }).then(function(user) {

        // send update back to as response
        res.send(user);
        //});
    });
})

// API endpoint - get list of all THIS users budgets
router.get('/users/:id/budgets', verifyToken ,function(req, res) {
    // user_id?
    //user_id = req.session.passport.user;
    //res.send(req.params.id);

    //
    Users.findById(req.params.id, function(err, user) {
        // check for errors, respond if occurs
        if (err) {
            res.send(err);
        };

        // print name of first budget to console
        //console.log(user.user_budgets[0].budget_name);

        // respond with array of user_budgets
        //res.json(user.user_budgets)
        res.send(user.user_budgets)

    });
});

// API endpoint - post new budget
router.post('/users/:id/budgets', verifyToken,function(req, res, next) {
    //
    console.log(req.body)

    // create new budget schema from json obj sent in post request body
    const newBudget = new Budget(req.body);

    //
    Users.findById(req.params.id, function(err, user) {
        // check for errors, respond if occurs
        if (err) {
            res.send(err);
        };

        // add new budget to new user's budget array
        user.user_budgets.push(newBudget);
        res.json(user);

    });

});

// API endpoint - update budget by user id
router.put('/users/:id/budgets/:budget_id', verifyToken, function(req, res) {
    // create a new user object based on Budget model
    updatedBudget = new Budget(req.body);

    //console.log(req.params.budget_id);

    // find user document by name and update (luigi)
    Users.findOneAndUpdate({ "_id": req.params.id }, { user_budgets: updatedBudget }).then(function(err, user) {
        // check for errors, respond if occurs
        if (err) {
            res.send(err);
        };

        // return user object to verify change
        res.json(user);
    });
});

// API endpoint - delete budget by user id
router.delete('/users/:id/budgets/:budget_id', verifyToken, function(req, res) {
    // create a new user object based on Budget model
    //updatedBudget = new Budget(req.body);

    //console.log(req.params.budget_id);

    //
    Users.findById(req.params.id, function(err, user) {
        // check for errors, respond if occurs
        if (err) {
            res.send(err);
        };

        // delete budget from user's budget array
        user.user_budgets.pull(req.params.budget_id);
        user.save();
        res.json(user);

    });
});

// API endpoint - get expenses
// API endpoint - create expenses
// API endpoint - update expenses
// API endpoint - delete expenses


// API endpoint - get income
// API endpoint - create income
// API endpoint - update income
// API endpoint - delete income


// API endpoint - get goals
// API endpoint - create goals
// API endpoint - update goals
// API endpoint - delete goals


// expoert router object with Article endpoint (collection in Test database)
module.exports = router;
