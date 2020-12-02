const assert = require('assert');
const Users = require('../models/users');

// Describe our tests
describe('Deleting Users records', function() {

    // declare newUser outside beforeEach() so we can use the returned _id to find by newUser._id
    var newUser;

    // add a User to the db before each tests which contains the string you are searching for
    // must create this new user because our connection test clears the collection before running tests
    beforeEach(function(done) {
        // create new user 
        // mongoose returns mongoDB unique _id to newUser
        newUser = new Users({
            name: 'Mario Luigi'
        });
        // save new user
        newUser.save().then(function() {
            done();
        })
    });

    // Delete test - delete first user found by name
    it('Deletes a record from the database first user found by name', function(done) {
        Users.findOneAndRemove({ name: 'Mario Luigi' }).then(function() {
            // check if this works by attempting to find deleted user
            Users.findOne({ name: 'Mario Luigi' }).then(function(result) {
                // if null result is returned, this has been deleted and null record found
                assert(result === null);
                done();
            });
        });
    });


});