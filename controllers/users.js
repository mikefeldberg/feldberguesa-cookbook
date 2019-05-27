const User = require('../models/user');
const Recipe = require('../models/recipe');
const Favorite = require('../models/favorite');
const Comment = require('../models/comment');

module.exports = {
    profile,
};

function profile(req, res, next) {
    User.findById(req.user._id).exec(function(err, user) {
        Comment.find({userId: req.user._id}).exec(function(err, comments) {
            Recipe.find({userId: req.user._id}).exec(function(err, recipes) {
                Favorite.find({userId: req.user._id}).exec(function(err, favorites) {
                    console.log(user)
                    res.render('user/profile', { user, comments, recipes, favorites });
                });
            });
        });
        
    });
}
