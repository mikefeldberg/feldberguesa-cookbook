const User = require('../models/user');
const Recipe = require('../models/recipe');
const Comment = require('../models/comment');
const Favorite = require('../models/favorite');

module.exports = {
    index,
    show,
};

function index(req, res) {
    if (req.user) {
        User.find({}).exec(function(err, users) {
            User.findById(req.user._id).exec(function(err, sessionUser) {
                res.render('users/index', { users, sessionUser });
            });
        });
    } else {
        User.find({}).exec(function(err, users) {
            res.render('users/index', { users, sessionUser: null });
        });
    }
}

function show(req, res, next) {
    if (req.user) {
        if (req.user._id == req.params.id) {
            User.findById(req.params.id).exec(function(err, user) {
                User.findById(req.user._id).exec(function(err, sessionUser) {
                    Comment.find({ userId: req.user._id }).exec(function(err, comments) {
                        Recipe.find({ userId: req.user._id }).exec(function(err, recipes) {
                            Favorite.find({ userId: req.user._id }).exec(function(err, favorites) {
                                res.render('users/show', { comments, recipes, favorites, user, sessionUser });
                            });
                        });
                    });
                });
            });
        } else {
            User.findById(req.params.id).exec(function(err, user) {
                User.findById(req.user._id).exec(function(err, sessionUser) {
                    Comment.find({ userId: req.params.id }).exec(function(err, comments) {
                        Recipe.find({ userId: req.params.id }).exec(function(err, recipes) {
                            Favorite.find({ userId: req.params.id }).exec(function(err, favorites) {
                                res.render('users/show', { comments, recipes, favorites, user, sessionUser });
                            });
                        });
                    });
                });
            });
        }
    } else {
        User.findById(req.params.id).exec(function(err, user) {
            Comment.find({ userId: req.params.id }).exec(function(err, comments) {
                Recipe.find({ userId: req.params.id }).exec(function(err, recipes) {
                    Favorite.find({ userId: req.params.id }).exec(function(err, favorites) {
                        res.render('users/show', { comments, recipes, favorites, user, sessionUser: null });
                    });
                });
            });
        });
    }
}

// function show(req, res, next) {
//     console.log(req)
//     var user, sessionUser, comments, recipes, favorites;
//     if (req.user) {
//         if (req.user._id == req.params.id) {
//             Promise.resolve().then(function() {
//                 return User.findById(req.params.id);
//             }).then(function(dbUser) {
//                 user = dbUser;
//                 return User.findById(req.user._id);
//             }).then(function(dbSessionUser) {
//                 sessionUser = dbSessionUser;
//                 return Comment.find({ userId: req.user._id });
//             }).then(function(dbComments) {
//                 comments = dbComments;
//                 return Recipe.find({ userId: req.user._id });
//             }).then(function(dbRecipes) {
//                 recipes = dbRecipes;
//                 return Favorite.find({ userId: req.user._id });
//             }).then(function(dbFavorites) {
//                 favorites = dbFavorites;
//             }).then(function() {
//                 res.render('users/show', { comments, recipes, favorites, user, sessionUser });
//                 // process.exit();
//             });
//         } else {
//             Promise.resolve().then(function() {
//                 return User.findById(req.params.id);
//             }).then(function(dbUser) {
//                 user = dbUser;
//                 return User.findById(req.user._id);
//             }).then(function(dbSessionUser) {
//                 sessionUser = dbSessionUser;
//                 return Comment.find({ userId: req.params.id });
//             }).then(function(dbComments) {
//                 comments = dbComments;
//                 return Recipe.find({ userId: req.params.id });
//             }).then(function(dbRecipes) {
//                 recipes = dbRecipes;
//                 return Favorite.find({ userId: req.params.id });
//             }).then(function(dbFavorites) {
//                 favorites = dbFavorites;
//             }).then(function() {
//                 res.render('users/show', { comments, recipes, favorites, user, sessionUser });
//                 // process.exit();
//             });
//         }
//     } else {
//         Promise.resolve().then(function() {
//             return User.findById(req.params.id);
//         }).then(function(dbUser) {
//             user = dbUser;
//             return Comment.find({ userId: req.params.id });
//         }).then(function(dbComments) {
//             comments = dbComments;
//             return Recipe.find({ userId: req.params.id });
//         }).then(function(dbRecipes) {
//             recipes = dbRecipes;
//             return Favorite.find({ userId: req.params.id });
//         }).then(function(dbFavorites) {
//             favorites = dbFavorites;
//         }).then(function() {
//             res.render('users/show', { comments, recipes, favorites, user, sessionUser: null });
//             // process.exit();
//         });
//     }
// }