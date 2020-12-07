// server.js

// import packages and express router
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
//require('dotenv').config();
// import config files
const config = require('./config');

// call express to create running app object
const app = express();

// set port and mongoDB url (local or global)
const PORT = process.env.PORT || 3001;
//const MONGODB_URI = "mongodb://localhost:27017/my_local_db";

//const MONGODB_URI = "mongodb+srv://root:!cop4331!@project.m58al.mongodb.net/Test?retryWrites=true&w=majority";
const MONGODB_URI = "mongodb+srv://root:!cop4331!@project.m58al.mongodb.net/cop4331?retryWrites=true&w=majority";
// const MONGODB_URI = config.MONGODB_URI; Highly recommended change to secure mongoDB URI from hackers.

// ES6 Promises  -- set global Promise ES6 object equal to Promise
// gets rid of DepreciatedWarning for Promises when running test
mongoose.Promise = global.Promise;

// connect to mongoDB with log messages for successful/unsuccessful connection
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false });
mongoose.connection.once('open', function() {
    console.log('Connected to the Database.');
});
mongoose.connection.on('error', function(error) {
    console.log('Mongoose Connection Error : ' + error);
});

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', require('./routes/api'));
app.use('/auth', require('./routes/auth'));
//app.use('/testAuth', require('./routes/testAuth'));

// Check production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'))

    app.get('*', function(req, res) {
        res.sendFile(path.resolve(__dirname, 'frontend/build', 'index.html'));
    });
}

// listen for connects to app at the port listed above
app.listen(PORT, function() {
    console.log(`Server listening on port ${PORT}.`);
});