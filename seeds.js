require('./config/database');
var Recipe = require('./models/recipe');
var data = require('./data');

Recipe.create(data.recipes)