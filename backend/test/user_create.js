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
        const newUser = new Users({
            name: 'Dave Brown',
            email: 'ucf@knights.edu',
            password: '123abc'
        });

        // call mongoDB save() function to save new User
        // call then() 'promise' which waits for save() to finish then fires off function
        newUser.save().then(function() {
            //newUser.save().then(function(done) {
            assert(!newUser.isNew); // test that it works properly using assert using mongoDB .isNew property (false if saved in database)
            done(); // call done if test assertion is complete (done() from mocha)
        });

    });

});