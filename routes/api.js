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
            res.status(401).send({ //SEND HTML
                success: false,
                message: "Token is invalid. Please contact us for assistance."
            });
        }
        user.emailToken = null;
        user.verified = true;
        await user.save();
        const html = `
        <!DOCTYPE html>
        <html lang="en">
          
        <head>
            <title>Budget Manager Pro</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>
            <style>
                body {
                    background: #68A047;
                    text-align: center;
                    margin: auto;
                    justify-content: center;
                    width: 60%;
                }
                .center {
                    background: white;
                    border-radius: 25px;
                    border: 2px solid black;
                    width: 40%;
                    height: 80%;
                    justify-content: center;
                }
            </style>
        </head>  
        <body>
            <div class="center">
            <h1>Congradulations!</h1>
            <h3>Your account has been verified!</h3>
            <br></br>
            <p>Click this 
            <a href="https://budgetmanagerpro.herokuapp.com/login">link</a>
             to login to your new account.</p>
            <br></br>
            <p>Your's Truly,</p>
            <p>BudgetManagerPro Team</p>
            <div>
          </body>
        </html>
        `
        res.send(html);
    } catch(error) {
        console.log(error);
        res.status(401).send({ //SEND HTML
            success: false,
            message: "Verification failed. Please contact us for assistance."
        });
    }
});

// Password reset
router.put('/password-reset', async function(req, res, next) {
    const user = await Users.findOne({email: req.body.email, username: req.body.username});
    if(!user) {
        res.status(401).send({
            success: false,
            message: 'User does not exist.'
        });
    } else 
    {
        try {   
            user.passwordReset = req.body.password;
            user.passwordToken = crypto.randomBytes(64).toString('hex');
            await user.save();

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
                subject: 'Budget Manager Pro - Reset Password',
                text: 
                `
                Hello.
                Please copy and paste the address below to reset your password.
                http://${req.headers.host}/api/password-recover?token=${req.body.passwordToken}
                `
                ,
                html: 
                `
                <h1> Hello,</h1>
                <p>We are sorry to hear you lost your password.</p>
                <p>Please click the link below to reset your password.</p>
                <a href="http://${req.headers.host}/api/password-recover?token=${req.body.passwordToken}"> Reset your password</a>
                `
            }
    
            const result = await transport.sendMail(mailOptions);
            console.log(result);
            res.send({
                success: true,
                message: 'Password reset successfuly. Please check your email to create a new password.'             
            });
        } catch(error) {
            console.log(error);
            res.status(401).send({
                success: false,
                message: 'Something went wrong. Please contact us at budgetmanagerproapp@gmail.com'
            });
        }
    }
});

router.get('/password-recover', async (req, res) => {
    const user = await Users.findOne({ passwordToken: req.query.token });
    try {
        if (!user) {
            const html = 
            `
<<<<<<< HEAD
            <!DOCTYPE html>
            <html lang="en">
            
            <head>
                <title>Budget Manager Pro</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>
                <style>
                    body {
                        background: #68A047;
                        text-align: center;
                        margin: auto;
                        justify-content: center;
                        width: 60%;
                    }
                    .center {
                        background: white;
                        border-radius: 25px;
                        border: 2px solid black;
                        width: 40%;
                        height: 80%;
                        justify-content: center;
                    }
                </style>
            </head>  
            <body>
                <div class="center">
                <h1>Your token is invalid!</h1>
                <h3>Please contact us at budgetapppro@gmail.com for help.</h3>
                <br></br>
                <p>Click this 
                <a href="https://budgetmanagerpro.herokuapp.com/login">link</a>
                to login to your new account.</p>
                <br></br>
                <p>Your's Truly,</p>
                <p>BudgetManagerPro Team</p>
                <div>
            </body>
            </html>
=======
            Hello, 
            Please copy and paste the link below to reset your password.
            http://budgetmanagerpro.herokuapp.com/forgotPassword
>>>>>>> a17d26d18edea01302b8e9518671c64707d9377a
            `

            res.send(html);
        }
        user.passwordToken = null;
        user.password = user.passwordToken;
        await user.save();

        const html = `
        <!DOCTYPE html>
        <html lang="en">
          
        <head>
            <title>Budget Manager Pro</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>
            <style>
                body {
                    background: #68A047;
                    text-align: center;
                    margin: auto;
                    justify-content: center;
                    width: 60%;
                }
                .center {
                    background: white;
                    border-radius: 25px;
                    border: 2px solid black;
                    width: 40%;
                    height: 80%;
                    justify-content: center;
                }
            </style>
        </head>  
        <body>
            <div class="center">
            <h1>Congradulations!</h1>
            <h3>Your password has been reset!</h3>
            <br></br>
            <p>Click this 
            <a href="https://budgetmanagerpro.herokuapp.com/login">link</a>
             to login to your new account.</p>
            <br></br>
            <p>Your's Truly,</p>
            <p>BudgetManagerPro Team</p>
            <div>
          </body>
        </html>
        `
        res.send(html);
    } catch(error) {
        console.log(error);
        res.status(401).send({ //SEND HTML
            success: false,
            message: "Verification failed. Please contact us for assistance."
        });
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
