const User = require('../models/user');
const Recipe = require('../models/recipe');
const Favorite = require('../models/favorite');
const Comment = require('../models/comment');

module.exports = {
    index,
    show,
};

function index(req, res) {
    console.log(req);
    if (req.user) {
        User.find({}).exec(function (err, users) {
            User.findById(req.user._id).exec(function (err, sessionUser) {
                res.render('users/index', { users, sessionUser });
            });
        });
    } else {
        User.find({}).exec(function (err, users) {
            res.render('users/index', { users, sessionUser: null });
        });
    }
}

function show(req, res, next) {
    if (req.user) {
        User.findById(req.params.id).exec(function (err, user) {
            User.findById(req.user._id).exec(function (err, sessionUser) {
                Comment.find({ userId: req.user._id }).exec(function (err, comments) {
                    Recipe.find({ userId: req.user._id }).exec(function (err, recipes) {
                        Favorite.find({ userId: req.user._id }).exec(function (err, favorites) {
                            res.render('users/show', { comments, recipes, favorites, user, sessionUser });
                        });
                    });
                });
            });
        });
    } else {
        User.findById(req.params.id).exec(function (err, user) {
            Comment.find({ userId: req.params.id }).exec(function (err, comments) {
                Recipe.find({ userId: req.params.id }).exec(function (err, recipes) {
                    Favorite.find({ userId: req.params.id }).exec(function (err, favorites) {
                        res.render('users/show', { comments, recipes, favorites, user, sessionUser: null });
                    });
                });
            });
        });
    }
}