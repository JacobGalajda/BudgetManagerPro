// test ability to save User to MongoDB
// to run 'npm run test'
//const mocha = require('mocha');
const assert = require('assert');
const Users = require('../models/users');

// Describe our tests
describe('Saving User records', function() {

    // Create tests
    //it('Saves a record to the database (User collection)', function() {
    it('Creates a record to the database (User collection)', function(done) {

        // create a new user object based on User model
        const newUserA = new Users({
            name: 'David Brown',
            email: 'def_david@knights.edu',
            password: '121abc'
        });

        // create a new user object based on User model
        const newUserB = new Users({
            name: 'Not David Brown',
            email: 'not_david@knights.edu',
            password: '122abc'
        });

        // create a new user object based on User model
        const newUserC = new Users({
            name: 'Rick L',
            email: 'big_L@knights.edu',
            password: '123abc'
        });

        // call mongoDB save() function to save new User
        // call then() 'promise' which waits for save() to finish then fires off function
        newUserA.save().then(function() {
            //newUser.save().then(function(done) {
            assert(!newUserA.isNew); // test that it works properly using assert using mongoDB .isNew property (false if saved in database)
            //done(); // call done if test assertion is complete (done() from mocha)
        });

        // call mongoDB save() function to save new User
        // call then() 'promise' which waits for save() to finish then fires off function
        newUserB.save().then(function() {
            //newUser.save().then(function(done) {
            assert(!newUserB.isNew); // test that it works properly using assert using mongoDB .isNew property (false if saved in database)
            //done(); // call done if test assertion is complete (done() from mocha)
        });

        // call mongoDB save() function to save new User
        // call then() 'promise' which waits for save() to finish then fires off function
        newUserC.save().then(function() {
            //newUser.save().then(function(done) {
            assert(!newUserC.isNew); // test that it works properly using assert using mongoDB .isNew property (false if saved in database)
            done(); // call done if test assertion is complete (done() from mocha)
        });
    });

});