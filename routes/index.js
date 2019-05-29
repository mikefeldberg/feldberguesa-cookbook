var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function(req, res, next) {
    res.render('index', { sessionUser: req.user });
});

router.get('/auth/google', passport.authenticate(
    'google',
    { scope: ['profile', 'email'] }
));

router.get('/oauth2callback', passport.authenticate(
    'google',
    {
        successRedirect: `back`,
        failureRedirect: '/'
    }
));

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;