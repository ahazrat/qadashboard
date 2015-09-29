var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
};

module.exports = function (passport) {
    
    /* GET login */
    router.get('/', function(req, res, next) {
      res.render('index', {
          title: 'Express',
          message: req.flash('message')
      });
    });
    
    /* POST login */
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/home',
        failureRedirect: '/',
        failureFlash: true
    }));

    /* GET signup */
    router.get('/signup', function (req, res) {
        res.render('signup', {
            message: req.flash('message')
        });
    });
    
    /* POST signup */
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/home',
        failureRedirect: '/signup',
        failureFlash: true
    }));
    
    /* GET home */
    router.get('/home', isAuthenticated, function (req, res) {
        res.render('home', {
            user: req.user
        });
    });
    
    /* GET logout */
    router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
    
    router.get('/loginSuccess', function (req, res, next) {
        res.send('Successfully authenticated.');
    });
    router.get('/loginFailure', function (req, res, next) {
        res.send('Failed to authenticate.');
    });

    return router;
    
};