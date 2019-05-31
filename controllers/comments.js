var User = require('../models/user');
var Recipe = require('../models/recipe');
var Comment = require('../models/comment');

module.exports = {
    create,
    edit,
    update,
    delete: deleteComment,
};

function create(req, res) {

    var comment = new Comment;
    comment.rating = req.body.rated
    comment.commentBody = req.body.comment;
    comment.userId = req.user._id;
    comment.recipeId = req.params.id;
    comment.addedBy = req.user.name;

    Recipe.findById(req.params.id).exec(function (err, recipe) { 
        comment.addedTo = recipe.name;
        comment.save(function(err) {
            if (comment.rating) {
                Comment.find({ recipeId: recipe._id, deletedAt: null }).exec(function(err, comments) {
                    recipe.rating = calculateRating(comments)
                    recipe.ratingCount += 1
                    recipe.save(function(err) {
                        res.redirect(`/recipes/${req.params.id}`);
                    });
                });
            } else {
                res.redirect(`/recipes/${req.params.id}`);
            }
        });
    });
}

function edit(req, res) {
    var recipeId = Object.keys(req.query)[0];
    Comment.findById(req.params.id).exec(function (err, comment) {
        User.findById(req.user._id).exec(function (err, sessionUser) {
            res.render(`comments/edit`, { comment, sessionUser, recipeId });
        });
    });
}

function update(req, res) {
    var recipeId = req.query._recipeId;
    Comment.findById(req.params.id).exec(function (err, comment) {
        comment.commentBody = req.body.comment;
        comment.rating = req.body.rated;
        comment.save(function (err) {
            Recipe.findById(recipeId).exec(function(err, recipe) {
                if (comment.rating) {
                    Comment.find({ recipeId: recipe._id, deletedAt: null }).exec(function(err, comments) {
                        recipe.rating = calculateRating(comments)
                        recipe.ratingCount += 1
                        recipe.save(function(err) {
                            res.redirect(`/recipes/${recipeId}`);
                        });
                    });
                } else {
                    res.redirect(`/recipes/${recipeId}`);
                }
            });
        });
    });
}

function deleteComment(req, res) {
    Comment.findById(req.params.id).exec(function (err, comment) {
        comment.deletedAt = new Date();
        comment.save(function (err) {
            Recipe.findById(comment.recipeId).exec(function(err, recipe) {
                Comment.find({ recipeId: recipe._id, deletedAt: null }).exec(function(err, comments) {
                    recipe.rating = calculateRating(comments)
                    recipe.ratingCount -= 1
                    recipe.save(function(err) {
                        res.redirect(`/recipes/${comment.recipeId}`);
                    });
                });
            });
        });
    });
}

function calculateRating(comments) {
    var recipeAllRatings = [];
    var recipeAllRatingsSum = 0;
    comments.forEach(function(c) {
        if (c.rating) recipeAllRatings.push(c.rating)
    });

    for(var i = 0; i < recipeAllRatings.length; i++) {
        recipeAllRatingsSum += recipeAllRatings[i];
    }

    console.log(recipeAllRatingsSum / recipeAllRatings.length)
    return recipeAllRatingsSum / recipeAllRatings.length || 0;
}