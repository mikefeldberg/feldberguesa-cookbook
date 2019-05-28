var User = require('../models/user');
var Recipe = require('../models/recipe');
var Comment = require('../models/comment');
var Favorite = require('../models/favorite');

module.exports = {
    index,
    show,
    new: newRecipe,
    create,
    edit,
    update,
    delete: deleteRecipe,
    favorite,
    unfavorite,
};

function index(req, res) {
    Recipe.find({}).exec(function(err, recipes) {
        res.render('recipes/index', { recipes, sessionUser: req.user });
    });
}

function show(req, res) {
    // console.log('SHOW REQ')
    // console.log(req)
    Recipe.findById(req.params.id).exec(function(err, recipe) {
        Comment.find({ recipeId: recipe._id, deletedAt: null }).exec(function(err, comments) {
            User.findById(recipe.userId).exec(function(err, author) {
                Favorite.find({ recipeId: recipe._id, deletedAt: null }).exec(function(err, favorites) {
                    var recipeRatingNew
                    var recipeAllRatings = [];
                    var recipeAllRatingsSum = 0;
                    var recipeRatingsCount = 0;

                    comments.forEach(function(c) {
                        if (c.rating) recipeAllRatings.push(c.rating)
                    });

                    for(var i = 0; i < recipeAllRatings.length; i++) {
                        recipeAllRatingsSum += recipeAllRatings[i];
                    }
                    recipeRatingNew = recipeAllRatingsSum / recipeAllRatings.length;

                    recipe.rating = recipeRatingNew
                    recipe.save();
                    
                    var favoriteCount = favorites.length;
                    var isFavorited = false;
                    if (req.user) {
                        Favorite.findOne({ userId: req.user._id, recipeId: req.params.id, deletedAt: null }, function(err, favorite) {
                            res.render('recipes/show', { recipe, sessionUser: req.user, comments, isFavorited: !!favorite, favoriteCount });
                        });
                    } else {
                        res.render('recipes/show', { recipe, sessionUser: req.user, comments, isFavorited, favoriteCount });
                    }
                });
            });
        });
    });
}

function newRecipe(req, res) {
    res.render('recipes/new', { sessionUser: req.user });
}

function newTest(req, res) {
    res.render('recipes/newTest', { sessionUser: req.user });
}

function create(req, res) {
    var recipe = new Recipe;
    var ingredientQty = req.body.qty;
    var ingredientName = req.body.ingredient;
    var ingredientPrep = req.body.preparation;
    var ingredients = [];
    for (var i = 0; i < ingredientQty.length; i++) {
        var ingredient = [];
        ingredient.push(ingredientQty[i]);
        ingredient.push(ingredientName[i]);
        ingredient.push(ingredientPrep[i]);
        ingredients.push(ingredient);
    }

    recipe.name = req.body.name;
    recipe.description = req.body.description;
    recipe.ingredients = ingredients;
    recipe.instructions = req.body.instruction;
    recipe.skillLevel = req.body.skillLevel;
    recipe.timePrep = req.body.timePrep;
    recipe.timeWait = req.body.timeWait;
    recipe.timeCook = req.body.timeCook;
    recipe.timeTotal = parseInt(req.body.timePrep) + parseInt(req.body.timeWait) + parseInt(req.body.timeCook);
    recipe.servings = req.body.servings;
    recipe.imageUrl = req.body.imageUrl;
    recipe.addedBy = req.user.name;
    recipe.userId = req.user._id;

    recipe.save(function(err) {
        res.redirect('/recipes');
    });
}

function edit(req, res) {
    Recipe.findById(req.params.id).exec(function(err, recipe) {
        res.render('recipes/edit', { recipe, sessionUser: req.user });
    });
}

function update(req, res) {
    Recipe.findById(req.params.id).exec(function(err, recipe) {
        var ingredientQty = req.body.qty;
        var ingredientName = req.body.ingredient;
        var ingredientPrep = req.body.preparation;
        var ingredients = [];
        for (var i = 0; i < ingredientQty.length; i++) {
            var ingredient = [];
            ingredient.push(ingredientQty[i]);
            ingredient.push(ingredientName[i]);
            ingredient.push(ingredientPrep[i]);
            ingredients.push(ingredient);
        }

        recipe.name = req.body.name;
        recipe.description = req.body.description;
        recipe.ingredients = ingredients;
        recipe.instructions = req.body.instruction;
        recipe.skillLevel = req.body.skillLevel;
        recipe.timePrep = req.body.timePrep;
        recipe.timeWait = req.body.timeWait;
        recipe.timeCook = req.body.timeCook;
        recipe.timeTotal = parseInt(req.body.timePrep) + parseInt(req.body.timeWait) + parseInt(req.body.timeCook);
        recipe.servings = req.body.servings;
        recipe.imageUrl = req.body.imageUrl;

        recipe.save(function(err, recipe) {
            res.redirect(`/recipes/${req.params.id}`);
        });
    });
}

function deleteRecipe(req, res) {
    Recipe.findById(req.params.id).exec(function(err, recipe) {
        recipe.deletedAt = new Date();
        recipe.save(function(err) {
            res.redirect('/recipes');
        });
    });
}

function favorite(req, res) {
    // console.log('in fav')
    // console.log('userid')
    // console.log(req.user._id)
    // console.log('recipeid')
    // console.log(req.params.id)
    Recipe.findById(req.params.id).exec(function(err, recipe) {
        Favorite.findOne({ userId: req.user._id, recipeId: req.params.id }, function(err, favorite) {
            if (favorite) {
                favorite.deletedAt = null;
            } else {
                var favorite = new Favorite({ userId: req.user._id, recipeId: req.params.id, addedBy: req.user.name, addedTo: recipe.name });
            }
            favorite.save();
            res.redirect(`/recipes/${req.params.id}`);
        });
    });
}

function unfavorite(req, res) {
    // console.log('in unfav')
    // console.log('userid')
    // console.log(req.user._id)
    // console.log('recipeid')
    // console.log(req.params.id)
    Favorite.findOne({ userId: req.user._id, recipeId: req.params.id }, function(err, favorite) {
        // console.log('favorite')
        // console.log(favorite)
        favorite.deletedAt = new Date();
        favorite.save();
        res.redirect(`/recipes/${req.params.id}`);
    });
}

function addComment(req, res) {
    var comment = new Comment;
    comment.commentBody = req.body.comment;
    comment.userId = req.user._id;
    comment.recipeId = req.params.id;
    comment.addedBy = req.user.name;


    comment.save(function(err) {
        res.redirect(`/recipes/${req.params.id}`);
    });
}