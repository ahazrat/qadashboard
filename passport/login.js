var LocalStrategy = require('passport-local').Strategy;
var UserDetails = require('../models/users');
var bcrypt = require('bcrypt-nodejs');

module.exports = function (passport) {
    passport.use('login', new LocalStrategy({
        passReqToCallback: true
    },
    function (req, username, password, done) {
        UserDetails.findOne({'username': username}, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                console.log('User not found with username: ' + username);
                return done(null, false, req.flash('message', 'User not found'));
            }
            if (!isValidPassword(user, password)) {
                console.log('Invalid password');
                return done(null, false, req.flash('message', 'Invalid password'));
            }
            return done(null, user);
        });
    }));
    var isValidPassword = function (user, password) {
        return bcrypt.compareSync(password, user.password);
    };
};