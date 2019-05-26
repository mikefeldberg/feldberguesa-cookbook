var Recipe = require('../models/recipe');

module.exports = {
    index,
    show,
    new: newRecipe,
    create,
    edit,
    update,
    delete: deleteRecipe,
};

function index(req, res) {
    Recipe.find({}).exec(function (err, recipes) {
        res.render('recipes/index', { recipes });
    });
}

function show(req, res) {
    res.render('recipes/show', {
        recipe: Recipe.getOne(req.params.id),
        recipeNum: parseInt(req.params.id) + 1
    });
}

function newRecipe(req, res) {
    res.render('recipes/new');
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
    var skillLevel

    recipe.name = req.body.name;
    recipe.description = req.body.description;
    recipe.ingredients = ingredients;
    recipe.instructions = req.body.instruction;
    // recipe.skillLevel = req.body.skillLevel;
    recipe.timePrep = req.body.timePrep;
    recipe.timeWait = req.body.timeWait;
    recipe.timeCook = req.body.timeCook;
    recipe.timeTotal = parseInt(req.body.timePrep) + parseInt(req.body.timeWait) + parseInt(req.body.timeCook);
    recipe.servings = req.body.servings;
    recipe.imageUrl = req.body.imageUrl;

    console.log('RECIPE BELOW')
    console.log(recipe)
    console.log('RECIPE ABOVE')

    recipe.save(function (err) {
        // if (err) return res.render('recipes/new');
        res.redirect('/recipes');
    })
    // console.log('CREATE REQ BODY BELOW')
    // console.log(req.body)
    // console.log('CREATE REQ BODY ABOVE')
}

function edit(req, res) {
    res.render('recipes/edit', {
        recipe: Recipe.getOne(req.params.id),
        id: req.params.id
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