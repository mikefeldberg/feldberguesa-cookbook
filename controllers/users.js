const User = require('../models/user');
const Recipe = require('../models/recipe');
const Favorite = require('../models/favorite');
const Comment = require('../models/comment');

module.exports = {
    index,
    show,
    // userProfile,
};

function index(req, res) {
    User.find({}).exec(function (err, members) {
        User.findById(req.user._id).exec(function (err, user) {
            res.render('users/index', { members, user });
        });
    });
}

function show(req, res, next) {
    console.log(req);
    if (req.params.id == req.user._id) {
        User.findById(req.params.id).exec(function (err, member) {
            User.findById(req.user._id).exec(function (err, user) {
                Comment.find({ userId: req.user._id }).exec(function (err, comments) {
                    Recipe.find({ userId: req.user._id }).exec(function (err, recipes) {
                        Favorite.find({ userId: req.user._id }).exec(function (err, favorites) {
                            console.log(user)
                            res.render('users/show', { user, comments, recipes, favorites, member });
                        });
                    });
                });
            });
        });
    } else {
        User.findById(req.params.id).exec(function (err, member) {
            User.findById(req.user._id).exec(function (err, user) {
                Comment.find({ userId: req.params.id }).exec(function (err, comments) {
                    Recipe.find({ userId: req.params.id }).exec(function (err, recipes) {
                        Favorite.find({ userId: req.params.id }).exec(function (err, favorites) {
                            res.render('users/show', { user, comments, recipes, favorites, member });
                        });
                    });
                });
            });
        });
    }
}