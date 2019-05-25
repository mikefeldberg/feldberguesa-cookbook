var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/auth/google', passport.authenticate(
    'google',
    { scope: ['profile', 'email'] }
));

router.get('/oauth2callback', passport.authenticate(
    'google',
    {
        successRedirect: '/myaccount',
        failureRedirect: '/'
    }
));

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;