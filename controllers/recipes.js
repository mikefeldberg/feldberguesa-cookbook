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
    favorite
};

function index(req, res) {
    Recipe.find({}).exec(function (err, recipes) {
        res.render('recipes/index', { recipes, user: req.user });
    });
}

function show(req, res) {
    Recipe.findById(req.params.id).exec(function (err, recipe) {
        User.findById(recipe.addedBy).exec(function (err, user) {
            // console.log(req.session.passport.user)
            res.render('recipes/show', { recipe, user: req.user});
        });
    });
}

function newRecipe(req, res) {
    res.render('recipes/new', {user: req.user});
}

function create(req, res) {
    var recipe = new Recipe;
    var ingredientQty = req.body.qty;
    var ingredientName = req.body.ingredient;
    var ingredientPrep = req.body.preparation;
    var ingredients = {};
    for (var i = 0; i < ingredientQty.length; i++) {
        var ingredient = [];
        ingredient.push(ingredientQty[i]);
        ingredient.push(ingredientName[i]);
        ingredient.push(ingredientPrep[i]);
        ingredients[i] = ingredient;
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

    recipe.save(function (err) {
        res.redirect('/recipes');
    });
}

function edit(req, res) {
    res.render('recipes/edit', {
        recipe: Recipe.getOne(req.params.id),
        id: req.params.id,
        // user: req.user,
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
    // console.log(req.user._id);
    // console.log(req.params.id);
    Favorite.findOne({userId: req.user._id, recipeId: req.params.id}, function(err, fav) {
        // console.log('FAVORITE BELOW')
        // console.log(fav)
        // console.log('FAVORITE ABOVE')
        // if (err) res.redirect(`/recipes/${req.params.id}`);
        if (fav) {
            fav.favorited == 'No' ? fav.favorited = 'Yes' : fav.favorited = 'No'
            fav.save();
            res.redirect(`/recipes/${req.params.id}`);
        } else {
            var fav = new Favorite;
            fav.userId = req.user._id;
            fav.recipeId = req.params.id;
            fav.favorited = 'Yes';
            fav.save();
            // console.log(fav)
            res.redirect(`/recipes/${req.params.id}`);
        }
    });
}