// server.js

// import packages and express router
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
//const router = require('./routes/index');

// call express to create running app object
const app = express();

// set port and mongoDB url (local or global)
const PORT = 3001;
//const MONGODB_URI = "mongodb://localhost:27017/my_local_db";
//const MONGODB_URI = "mongodb+srv://root:!cop4331!@project.m58al.mongodb.net/Test?retryWrites=true&w=majority";
const MONGODB_URI = "mongodb+srv://root:!cop4331!@project.m58al.mongodb.net/cop4331?retryWrites=true&w=majority";

// ES6 Promises  -- set global Promise ES6 object equal to Promise
// gets rid of DepreciatedWarning for Promises when running test
mongoose.Promise = global.Promise;

// express blocks cross-origin HTTP requests by default, allow access from other websites/apps
app.use(cors())

// express functions for json parsing, and routing
app.use(express.urlencoded({ extended: true }));

//
//app.use(express.json());

// use HTTP request body parser (middleware)
app.use(bodyParser.json());

//
//app.use('/api', router);
app.use('/api', require('./routes/api'))

// connect to mongoDB with log messages for successful/unsuccessful connection
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false });
mongoose.connection.once('open', function() {
    console.log('Connected to the Database.');
});
mongoose.connection.on('error', function(error) {
    console.log('Mongoose Connection Error : ' + error);
});

// listen for connects to app at the port listed above
app.listen(PORT, function() {
    console.log(`Server listening on port ${PORT}.`);
});