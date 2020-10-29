const assert = require('assert');
const Users = require('../models/users');

// Describe our tests
describe('Search records', function() {

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

    // Search test - find one record by name
    // NOTE: Users.find({}) returns ALL results
    it('Finds one (first located) User record from the database by name', function(done) {
        // asynchronous -- so when 'findOne()' returns 'result', then function(result) fires
        Users.findOne({ name: 'Mario Luigi' }).then(function(result) {
            // test returns true if result.name attribute is equal to one we are looking for
            // in other words, 
            // if assert(expected result) == True, pass test
            // else assert(expected result) == False, fail test
            assert(result.name === 'Mario Luigi');
            done();
        });

    });

    // Search test - find one record by ID
    it('Finds specific User record from the database by _id', function(done) {
        // asynchronous -- so when 'findOne()' returns 'result', then function(result) fires
        Users.findOne({ _id: newUser._id }).then(function(result) {
            // _id field is an object with a wrapper within MongoDB, have to use toString() so mongoose can interpret
            assert(result._id.toString() === newUser._id.toString()); // 
            done();
        });

    });
});