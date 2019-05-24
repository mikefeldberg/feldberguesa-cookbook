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
    res.render('recipes/index', {
        recipes: Recipe.getAll(),
        time: req.time
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
    // req.body.cooked = false;
    Recipe.create(req.body);
    res.redirect('/recipes');
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