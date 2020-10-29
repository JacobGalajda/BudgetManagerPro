const assert = require('assert');
const Users = require('../models/users');

// Describe our tests
describe('Update Users records', function() {

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

    // Update test - update one user in database
    it('Updates a user record by name to another name', function(done) {
        // find user document by name and update (luigi)
        Users.findOneAndUpdate({ name: 'Mario Luigi' }, { name: 'Luigi' }).then(function() {

            // check if this works by searching for User's unique _id
            Users.findOne({ _id: newUser._id }).then(function(result) {
                // if 
                assert(result.name === 'Luigi');
                done();
            });
        });
    });


});