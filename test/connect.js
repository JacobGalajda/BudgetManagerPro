// connection test
const mongoose = require('mongoose');

// ES6 Promises  -- set global Promise ES6 object equal to Promise
// gets rid of DepreciatedWarning for Promises when running test
mongoose.Promise = global.Promise;

// link to MongoDB Atlas db
//const MONGODB_URI = "mongodb+srv://root:!cop4331!@project.m58al.mongodb.net/cop4331?retryWrites=true&w=majority";
//const MONGODB_URI = "mongodb+srv://root:!cop4331!@project.m58al.mongodb.net/dev?retryWrites=true&w=majority";
const MONGODB_URI = "mongodb+srv://root:!cop4331!@project.m58al.mongodb.net/test?retryWrites=true&w=majority";

// mocha hook - Connect to db BEFORE tests run using before() 
before(function(done) {
    //before(function() {
    // Connect to mongodb
    mongoose.connect(MONGODB_URI);
    mongoose.connection.once('open', function() { //done) {
        console.log('Connection has been made...');
        done();
    }).on('error', function(error) {
        console.log('Connection error:', error);
    });

});

// mocha hook - drop collection before each test 
// beforeEach() run this function before each test
beforeEach(function(done) {

    // Drop the user collection -- make it plural! 
    // mongoose pluralizes collection, assumes you have multiple documents/records within collection
    mongoose.connection.collections.users.drop(function() {
        // we are done, asynchronous
        //done();
    });

    // Drop the budget collection -- make it plural! 
    // mongoose pluralizes collection, assumes you have multiple documents/records within collection
    mongoose.connection.collections.budgets.drop(function() {
        // we are done, asynchronous
        done();
    });
});