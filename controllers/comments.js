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

    Recipe.findById(req.params.id).exec(function(err, recipe) {
        recipe.rating 
        comment.addedTo = recipe.name;
        comment.save(function(err) {
            res.redirect(`/recipes/${req.params.id}`);
        });
    });
}

function edit(req, res) {
    var recipeId = Object.keys(req.query)[0];

    Comment.findById(req.params.id).exec(function(err, comment) {
        User.findById(req.user._id).exec(function(err, sessionUser) {
            res.render(`comments/edit`, { comment, sessionUser, recipeId });
        });
    });
}

function update(req, res) {
    var recipeId = req.query._recipeId;
    Comment.findById(req.params.id).exec(function(err, comment) {
        comment.commentBody = req.body.comment;
        comment.save(function(err) {
            res.redirect(`/recipes/${recipeId}`);
        });
    });
}

function deleteComment(req, res) {
    console.log(req.body)
    console.log('BODY ABOVE, PARAMS BELOW')
    console.log(req.params)
}