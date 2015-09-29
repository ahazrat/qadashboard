var LocalStrategy = require('passport-local').Strategy;
var UserDetails = require('../models/users');
var bcrypt = require('bcrypt-nodejs');

module.exports = function (passport) {
    passport.use('signup', new LocalStrategy({
        passReqToCallback: true
    },
    function (req, username, password, done) {
        var findOrCreateUser = function () {
            UserDetails.findOne({'username': username}, function (err, user) {
                if (err) {
                    console.log('Error in sign up: ' + err);
                    return done(err);
                }
                if (user) {
                    console.log('User already exists with username: ' + username);
                } else {
                    var newUser = new UserDetails();
                    newUser.username = username;
                    newUser.password = createHash(password);
                    newUser.email = req.param('email');
                    newUser.save(function (err) {
                        if (err) {
                            console.log('Error in saving user: ' + user);
                        }
                        console.log('User registration successful');
                        return done(null, newUser);
                    });
                }
            });
        };
        process.nextTick(findOrCreateUser);
    }));
    var createHash = function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
    };
};