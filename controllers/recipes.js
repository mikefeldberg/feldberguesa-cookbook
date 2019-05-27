var Recipe = require('../models/recipe');
var User = require('../models/user');
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
    unfavorite
};

function index(req, res) {
    Recipe.find({}).exec(function (err, recipes) {
        res.render('recipes/index', { recipes, user: req.user });
    });
}

function show(req, res) {
    Recipe.findById(req.params.id).exec(function (err, recipe) {
        User.findById(recipe.userId).exec(function (err, author) {
            var isFavorited = false;
            if (req.user) {
                Favorite.findOne({ userId: req.user._id, recipeId: req.params.id, deletedAt: null }, function (err, favorite) {
                    res.render('recipes/show', { recipe, user: req.user, isFavorited: !!favorite });
                });
            } else {
                res.render('recipes/show', { recipe, user: req.user, isFavorited });
            }  
        });
    });
}

function newRecipe(req, res) {
    res.render('recipes/new', { user: req.user });
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

    recipe.save(function (err) {
        res.redirect('/recipes');
    });
}

function edit(req, res) {
    Recipe.findById(req.params.id).exec(function (err, recipe) {
        res.render('recipes/edit', { recipe, user: req.user });
    });
}

function update(req, res) {
    //   req.body.cooked = req.body.cooked === 'on';
    Recipe.update(req.params.id, req.body);
    res.redirect('/recipes');
}

function deleteRecipe(req, res) {
    Recipe.deleteOne(req.params.id);
    res.redirect('/recipes');
}

function favorite(req, res) {
    console.log('in favorite')
    Favorite.findOne({userId: req.user._id, recipeId: req.params.id}, function(err, favorite) {
        console.log(favorite)
        console.log('FAVORITE ABOVE')
        if (favorite) {
            favorite.deletedAt = null;
        } else {
            var favorite = new Favorite({userId: req.user._id, recipeId: req.params.id});
            // favorite.userId = req.user._id;
            // favorite.recipeId = req.params.id;
        }
        favorite.save();
        res.redirect(`/recipes/${req.params.id}`);
    });
}

function unfavorite(req, res) {
    Favorite.findOne({userId: req.user._id, recipeId: req.params.id}, function(err, favorite) {
        favorite.deletedAt = new Date();
        favorite.save();
        res.redirect(`/recipes/${req.params.id}`);
    });
}


// function favorite(req, res) {
//     // console.log(req.user._id);
//     // console.log(req.params.id);
//     Favorite.findOne({userId: req.user._id, recipeId: req.params.id}, function(err, favorite) {
//         // console.log('FAVORITE BELOW')
//         // console.log(favorite)
//         // console.log('FAVORITE ABOVE')
//         // if (err) res.redirect(`/recipes/${req.params.id}`);
//         if (favorite) {
//             favorite.save();
//             res.redirect(`/recipes/${req.params.id}`);
//         } else {
//             var favorite = new Favorite;
//             favorite.userId = req.user._id;
//             favorite.recipeId = req.params.id;
//             favorite.save();
//             // console.log(favorite)
//             res.redirect(`/recipes/${req.params.id}`);
//         }
//     });
// }