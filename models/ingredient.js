var mongoose = require('mongoose');

var ingredientSchema = new mongoose.Schema({
    item: String,
    quantity: String,
    preparation: String,
    dateDeleted: Date,
});

module.exports = mongoose.model('Ingredient', ingredientSchema);