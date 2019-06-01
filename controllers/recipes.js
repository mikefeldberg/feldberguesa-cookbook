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
    upload,
    images,
};

function index(req, res) {
    User.find({}).exec(function (err, users) {
        Recipe.find({}).exec(function (err, recipes) {
            Favorite.find({}).exec(function (err, favorites) {
                res.render('recipes/index', { recipes, users, favorites, sessionUser: req.user });
            });
        });
    });
}

function show(req, res) {
    Recipe.findById(req.params.id).exec(function (err, recipe) {
        Comment.find({ recipeId: recipe._id, deletedAt: null }).exec(function (err, comments) {
            User.find({}).exec(function (err, users) {
                User.findById(recipe.userId).exec(function (err, recipeAuthor) {
                    Favorite.find({ recipeId: recipe._id, deletedAt: null }).exec(function (err, favorites) {

                        function getFormattedDate(unparsedDate) {
                            var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
                            var monthNumber = unparsedDate.getMonth();
                            var month = months[monthNumber];
                            var day = unparsedDate.getDate();
                            var year = unparsedDate.getFullYear();
                            var displayDate = month + " " + day + ", " + year
                            return displayDate;
                        }

                        var dateCreated = getFormattedDate(recipe.createdAt);
                        var dateUpdated = null;

                        if (recipe.updatedAt) {
                            var dateUpdated = getFormattedDate(recipe.updatedAt);
                        }

                        var favoriteCount = favorites.length;
                        var isFavorited = false;
                        if (req.user) {
                            Favorite.findOne({ userId: req.user._id, recipeId: req.params.id, deletedAt: null }, function (err, favorite) {
                                res.render('recipes/show', { recipe, users, recipeAuthor, dateCreated, dateUpdated, sessionUser: req.user, comments, favoriteCount, isFavorited: !!favorite, });
                            });
                        } else {
                            res.render('recipes/show', { recipe, users, recipeAuthor, dateCreated, dateUpdated, sessionUser: null, comments, favoriteCount, isFavorited, });
                        }
                    });
                });
            });
        });
    });
}

function newRecipe(req, res) {
    res.render('recipes/new', { sessionUser: req.user });
}

function create(req, res) {
    var recipe = new Recipe;

    var ingredientQty = req.body.qty;
    var ingredientName = req.body.ingredient;
    var ingredientPrep = req.body.preparation;
    var ingredients = [];

    if (ingredientQty.length > 1) {
        for (var i = 0; i < ingredientQty.length; i++) {
            var ingredient = {
                qty: ingredientQty[i],
                name: ingredientName[i],
                prep: ingredientPrep[i],
            };

            if (ingredient.qty) {
                ingredients.push(ingredient)
            };
        }

    } else {
        var ingredient = {
            qty: ingredientQty,
            name: ingredientName,
            prep: ingredientPrep,
        };

        if (ingredient.qty) {
            ingredients.push(ingredient)
        };
    }

    recipe.ingredients = ingredients;

    recipe.name = req.body.name;
    recipe.description = req.body.description;
    if (req.body.instructions.length > 1) {
        for (var i = 0; i < req.body.instructions.length; i++) {
            if (req.body.instructions[i]) { recipe.instructions.push(req.body.instructions[i]) };
        }
    } else {
        if (req.body.instructions) { recipe.instructions.push(req.body.instructions) };
    }
    recipe.skillLevel = req.body.skillLevel;
    recipe.timePrep = req.body.timePrep;
    recipe.timeWait = req.body.timeWait;
    recipe.timeCook = req.body.timeCook;
    recipe.timeTotal = parseInt(req.body.timePrep) + parseInt(req.body.timeWait) + parseInt(req.body.timeCook);
    recipe.servings = req.body.servings;
    recipe.imageUrl = req.body.imageUrl;
    recipe.addedBy = req.user.name;
    recipe.userId = req.user._id;

    recipe.save(function (err) {
        res.redirect('/recipes');
    });
}

function edit(req, res) {
    Recipe.findById(req.params.id).exec(function (err, recipe) {
        res.render('recipes/edit', { recipe, sessionUser: req.user });
    });
}

function update(req, res) {
    Recipe.findById(req.params.id).exec(function (err, recipe) {

        var ingredientQty = req.body.qty;
        var ingredientName = req.body.ingredient;
        var ingredientPrep = req.body.preparation;
        var ingredients = [];

        if (ingredientQty.length > 1) {
            for (var i = 0; i < ingredientQty.length; i++) {
                var ingredient = {
                    qty: ingredientQty[i],
                    name: ingredientName[i],
                    prep: ingredientPrep[i],
                };

                if (ingredient.qty) {
                    ingredients.push(ingredient)
                };
            }

        } else {
            var ingredient = {
                qty: ingredientQty,
                name: ingredientName,
                prep: ingredientPrep,
            };

            if (ingredient.qty) {
                ingredients.push(ingredient)
            };
        }

        recipe.name = req.body.name;
        recipe.description = req.body.description;
        recipe.ingredients = ingredients;

        recipe.instructions = []

        if (req.body.instructions.length > 1) {
            for (var i = 0; i < req.body.instructions.length; i++) {
                if (req.body.instructions[i]) { recipe.instructions.push(req.body.instructions[i]) };
            }
        } else {
            if (req.body.instructions) { recipe.instructions.push(req.body.instructions) };
        }

        recipe.skillLevel = req.body.skillLevel;
        recipe.timePrep = req.body.timePrep;
        recipe.timeWait = req.body.timeWait;
        recipe.timeCook = req.body.timeCook;
        recipe.timeTotal = parseInt(req.body.timePrep) + parseInt(req.body.timeWait) + parseInt(req.body.timeCook);
        recipe.servings = req.body.servings;
        recipe.imageUrl = req.body.imageUrl;

        recipe.save(function (err, recipe) {
            res.redirect(`/recipes/${req.params.id}`);
        });
    });
}

function deleteRecipe(req, res) {
    Recipe.findById(req.params.id).exec(function (err, recipe) {
        recipe.deletedAt = new Date();
        recipe.save(function (err) {
            res.redirect('/recipes');
        });
    });
}

function favorite(req, res) {
    Recipe.findById(req.params.id).exec(function (err, recipe) {
        Favorite.findOne({ userId: req.user._id, recipeId: req.params.id }, function (err, favorite) {
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
    Favorite.findOne({ userId: req.user._id, recipeId: req.params.id }, function (err, favorite) {
        favorite.deletedAt = new Date();
        favorite.save();
        res.redirect(`/recipes/${req.params.id}`);
    });
}

function upload(req, res, next) {
    res.render('recipes/upload', { user: req.user })
}

function images(req, res, next) {
    Recipe.findById(req.params.id, function (err, recipe) {
        res.render('recipes/images', { user: student });
    });
}